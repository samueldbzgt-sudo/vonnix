import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { createLocalServer, root } from './local-server.mjs';
import { openBrowser } from './browser.mjs';

const results = { date: new Intl.DateTimeFormat('pt-BR',{ timeZone:'America/Sao_Paulo',dateStyle:'short',timeStyle:'medium' }).format(new Date()), checks: [], viewports: [], pages: [], errors: [], httpErrors: [], externalRequests: [] };
const baseline=JSON.parse(fs.readFileSync(path.join(root,'.rebranding/antes.json'),'utf8'));
const configContext={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'js/vonnix-config.js'),'utf8'),configContext,{timeout:1000});
const config=configContext.window.VONNIX_CONFIG;
const pendingImages=Object.values(config.assets).filter(item=>item.active&&item.needsReplacement&&(item.path===item.originalPath||item.approved!==true)).length;
function check(name, condition, detail) { results.checks.push({name,passed:!!condition,...(detail?{detail}:{})}); assert.ok(condition,name+(detail?' — '+JSON.stringify(detail):'')); }
const wait = ms => new Promise(resolve=>setTimeout(resolve,ms));
const server=createLocalServer();
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
let browser;
try {
  browser=await openBrowser(); const {page}=browser;
  page.on('Runtime.exceptionThrown', e=>results.errors.push(e.exceptionDetails.exception?.description||e.exceptionDetails.text));
  page.on('Network.responseReceived', e=>{if(e.response.status>=400)results.httpErrors.push({url:e.response.url,status:e.response.status});});
  page.on('Network.requestWillBeSent', e=>{if(/^https?:/.test(e.request.url)&&new URL(e.request.url).origin!==origin)results.externalRequests.push(e.request.url);});
  await page.send('Page.navigate',{url:origin+'/index.html'}); await wait(500);
  await page.evaluate('document.fonts.ready.then(()=>true)');
  check('Fonte Plus Jakarta Sans carregada localmente',await page.evaluate(`[...document.fonts].some(font=>font.family.includes('Plus Jakarta Sans')&&font.status==='loaded')&&document.fonts.check('800 22px "Plus Jakarta Sans"','Organização e avaliações')`));
  check('Título VONNIX',await page.evaluate(`document.title==='Kit de Sacos a Vácuo com Bomba | VONNIX'`));
  check('13 seções na ordem original',await page.evaluate(`JSON.stringify([...document.querySelectorAll('main > section')].map(s=>s.id))===${JSON.stringify(JSON.stringify(baseline.sections.map(s=>(s.attributes.match(/id="([^"]+)"/)||[])[1]||'')))}`));
  check('Oferta inicial preservada',await page.evaluate(`document.querySelector('[data-kit="kit15"]').getAttribute('aria-pressed')==='true'&&document.querySelector('#stickyPor').textContent.includes('96,83')`));
  const expected=[['kit30','154,90','30 sacos a vácuo','10 pequenos + 10 médios + 10 grandes','2 bombas','36,25'],['kit45','174,90','45 sacos a vácuo','15 pequenos + 15 médios + 15 grandes','3 bombas','40,93'],['kit15','96,83','15 sacos a vácuo','5 pequenos + 5 médios + 5 grandes','1 bomba','22,66']];
  for(const [key,price,quantity,sizes,pumps,installment] of expected){
    await page.evaluate(`document.querySelector('[data-kit="${key}"]').click()`);
    const state=await page.evaluate(`({price:document.querySelector('#precoBox').textContent,offer:document.querySelector('#precoOferta').textContent,sticky:document.querySelector('#stickyBar').textContent,specs:document.querySelector('#specsBox').textContent,selected:document.querySelectorAll('[data-kit][aria-pressed="true"]').length})`);
    check('Seleção e preços sincronizados '+key,state.price.includes(price)&&state.offer.includes(price)&&state.sticky.includes(price)&&state.price.includes(installment)&&state.specs.includes(quantity)&&state.specs.includes(sizes)&&state.specs.includes(pumps)&&state.selected===1,state);
  }
  check('Galeria sem duplicação',await page.evaluate(`document.querySelectorAll('#thumbs > button').length===15&&document.querySelectorAll('#dots > button').length===15`));
  check('Artes de detalhes na ordem configurada',await page.evaluate(`JSON.stringify([...document.querySelectorAll('#infoBox > img')].map(img=>img.getAttribute('src')))===${JSON.stringify(JSON.stringify(config.product.infograficos.map(id=>config.assets[id].path)))}`));
  check('Banner usa a arte configurada',await page.evaluate(`document.querySelector('#oferta .black-offer-art > img').getAttribute('src')===${JSON.stringify(config.assets['IMG-17'].path)}`));
  const first=await page.evaluate(`document.querySelector('#mainImg img').getAttribute('src')`);
  await page.evaluate(`document.querySelector('[data-gal="next"]').click()`);
  check('Galeria próxima imagem',await page.evaluate(`document.querySelector('#mainImg img').getAttribute('src')!==${JSON.stringify(first)}`));
  await page.evaluate(`document.querySelector('[data-gal="prev"]').click()`);
  check('Galeria imagem anterior',await page.evaluate(`document.querySelector('#mainImg img').getAttribute('src')===${JSON.stringify(first)}`));
  await page.evaluate(`document.querySelector('#dots button:nth-child(4)').click()`);
  check('Indicadores clicáveis',await page.evaluate(`document.querySelector('#mainImg img').getAttribute('data-asset')==='IMG-04'`));
  await page.evaluate(`document.querySelector('#thumbs button:nth-child(2)').click()`);
  check('Miniaturas clicáveis',await page.evaluate(`document.querySelector('#mainImg img').getAttribute('data-asset')==='IMG-02'`));
  await page.evaluate(`document.querySelector('#mainImg').focus()`);
  await page.send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight'});
  check('Galeria pelo teclado',await page.evaluate(`document.querySelector('#mainImg img').getAttribute('data-asset')==='IMG-03'`));
  await page.evaluate(`document.querySelector('#thumbs button').click()`);
  const summary=await page.evaluate(`(()=>{const e=document.querySelector('#faqBox summary').getBoundingClientRect();return{x:e.x+20,y:e.y+10}})()`);
  await page.evaluate(`document.querySelector('#faqBox summary').click()`);
  check('FAQ abre',await page.evaluate(`document.querySelector('#faqBox details').open`));
  await page.evaluate(`document.querySelector('#faqBox summary').click()`);
  check('FAQ fecha',await page.evaluate(`!document.querySelector('#faqBox details').open`));
  await page.evaluate(`document.querySelector('#menuBtn').click()`);
  check('Menu abre e recebe foco',await page.evaluate(`!document.querySelector('#drawer').classList.contains('hidden')&&document.querySelector('#drawer').contains(document.activeElement)&&document.querySelector('main').inert`));
  await page.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
  check('Menu fecha com Escape e devolve foco',await page.evaluate(`document.querySelector('#drawer').classList.contains('hidden')&&document.activeElement.id==='menuBtn'&&!document.querySelector('main').inert`));
  check('Botões habilitados com checkout configurado',await page.evaluate(`[...document.querySelectorAll('.buy')].every(button=>!button.disabled)`));
  check('Compras bloqueadas se o checkout do kit não estiver configurado',await page.evaluate(`(async()=>{const C=window.VONNIX_CONFIG,previous=C.checkout.urls.kit15,before=location.href;try{C.checkout.urls.kit15='';const result=await window.iniciarCheckout();return result.blocked&&location.href===before&&[...document.querySelectorAll('.buy')].every(button=>button.disabled)}finally{C.checkout.urls.kit15=previous;document.querySelector('[data-kit="kit15"]').click()}})()`));
  await page.evaluate(`document.querySelector('#checkoutStatus').textContent=''`);
  check('Avaliações restauradas com fotos e resumo',await page.evaluate(`document.querySelectorAll('#depoimentosBox article').length===${config.socialProof.testimonials.length}&&document.querySelectorAll('#avaliacoesTrack img').length===${config.socialProof.photos.length}&&!document.querySelector('.product-rating-row').hidden&&!document.querySelector('#reviewsSummary').hidden&&document.querySelector('#reviewsSummary').textContent.includes('2.347')`));
  check('Identificação dos selos preservada',await page.evaluate(`[...document.querySelectorAll('.review-verification')].every(el=>el.textContent.includes('na origem'))`));
  check('Cronômetros sincronizados em ciclos de 3 horas',await page.evaluate(`!document.querySelector('#offerCountdown').hidden&&!document.querySelector('.black-live-clock').hidden&&document.querySelector('#countdown').textContent===document.querySelector('#countdown2').textContent&&document.querySelector('.black-live-clock p').textContent.includes('CONTAGEM REGRESSIVA')`));
  check('Sem cookies ou armazenamento de rastreamento',await page.evaluate(`document.cookie===''&&localStorage.length===0&&sessionStorage.length===0`));
  check('Canonical não inferida e noindex ativo',await page.evaluate(`!document.querySelector('link[rel="canonical"]')&&document.querySelector('meta[name="robots"]').content==='noindex, nofollow'`));
  check('Logos oficiais nas três posições',await page.evaluate(`document.querySelector('header [data-brand-logo]').src.includes('logo%20preta.png')&&document.querySelector('#drawer [data-brand-logo]').src.includes('logo%20branca.png')&&document.querySelector('footer [data-brand-logo]').src.includes('logo%20branca.png')`));
  check('Paleta e contraste do CTA',await page.evaluate(`(()=>{const b=document.querySelector('.buy'),s=getComputedStyle(b);return s.backgroundColor==='rgb(245, 106, 0)'&&s.color==='rgb(21, 21, 21)'})()`));
  check('Rodapé preto',await page.evaluate(`getComputedStyle(document.querySelector('footer')).backgroundColor==='rgb(21, 21, 21)'`));
  for(const width of [320,360,390,430,768,1024,1440,1920]){
    await page.send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
    await page.evaluate('window.scrollTo(0,0)'); await wait(70);
    const layout=await page.evaluate(`({width:innerWidth,availableWidth:document.documentElement.clientWidth,documentWidth:document.documentElement.scrollWidth,mainWidth:document.querySelector('main').getBoundingClientRect().width,bodyWidth:document.body.scrollWidth,overlaps:[...document.querySelectorAll('.kit-option')].some((el,i,a)=>i>0&&el.getBoundingClientRect().left<a[i-1].getBoundingClientRect().right),offenders:[...document.querySelectorAll('main *,footer *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left < -1)&&!e.closest('#thumbs,#dots,#avaliacoesTrack')}).map(e=>({tag:e.tagName,cls:e.className})).slice(0,4)})`);
    results.viewports.push(layout);
    check('Layout sem rolagem horizontal '+width,layout.documentWidth<=width&&layout.bodyWidth<=width&&!layout.overlaps,layout);
    check('Largura original preservada '+width,Math.abs(layout.mainWidth-Math.min(layout.availableWidth,480))<1);
    await page.evaluate(`document.querySelector('#menuBtn').click()`);
    check('Menu cabe em '+width,await page.evaluate(`document.querySelector('.drawer-panel').getBoundingClientRect().right<=innerWidth`));
    await page.evaluate(`document.querySelector('#drawer [data-close]').click()`);
    if(width===390||width===1440){await page.evaluate('document.activeElement?.blur()');await page.screenshot(path.join(root,'.rebranding/depois-'+width+'.png'));}
  }
  await page.evaluate('window.scrollTo(0,800)'); await wait(100);
  check('Barra fixa aparece ao rolar',await page.evaluate(`!document.querySelector('#stickyBar').classList.contains('translate-y-full')`));
  await page.send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:false});
  const pageHeight=await page.evaluate('document.documentElement.scrollHeight');
  for(let y=0;y<pageHeight;y+=750){await page.evaluate('window.scrollTo(0,'+y+')');await wait(35);}
  await page.evaluate(`[...document.images].forEach(img=>{img.loading='eager'});Promise.all([...document.images].map(img=>img.decode().catch(()=>{})))`);
  check('Todas as imagens da página carregadas',await page.evaluate(`[...document.images].every(img=>img.complete&&img.naturalWidth>0)`));
  await page.screenshot(path.join(root,'.rebranding/depois-rodape.png'));
  await page.evaluate('window.scrollTo(0,0)');await wait(80);
  await page.screenshot(path.join(root,'.rebranding/depois-completa.png'),true);
  await page.evaluate(`document.querySelector('#menuBtn').click()`);
  await page.screenshot(path.join(root,'.rebranding/depois-menu.png'));
  await page.evaluate(`document.querySelector('#drawer [data-close]').click()`);
  await page.send('Emulation.setDeviceMetricsOverride',{width:548,height:900,deviceScaleFactor:1,mobile:false});
  await page.evaluate('document.activeElement?.blur()');
  const titleClip=await page.evaluate(`(()=>{const section=document.querySelector('#comprar').getBoundingClientRect(),price=document.querySelector('#precoBox').getBoundingClientRect();return{x:section.left,y:section.top+scrollY,width:section.width,height:price.top-section.top,scale:1}})()`);
  const titleCapture=await page.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:titleClip});
  fs.writeFileSync(path.join(root,'.rebranding/fonte-titulo.png'),Buffer.from(titleCapture.data,'base64'));
  await page.evaluate(`document.querySelector('#avaliacoes').scrollIntoView();window.scrollBy(0,-70)`);await wait(100);
  await page.evaluate(`Promise.all([...document.querySelectorAll('#avaliacoes img')].map(img=>img.decode().catch(()=>{})))`);
  const reviewClip=await page.evaluate(`(()=>{const section=document.querySelector('#avaliacoes').getBoundingClientRect();return{x:section.left,y:section.top+scrollY,width:section.width,height:Math.min(section.height,650),scale:1}})()`);
  const reviewCapture=await page.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:reviewClip});
  fs.writeFileSync(path.join(root,'.rebranding/avaliacoes-restauradas.png'),Buffer.from(reviewCapture.data,'base64'));
  const localLinks=await page.evaluate(`[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>!h.startsWith('http')&&!h.startsWith('mailto:')&&!h.startsWith('#')))]`);
  for(const href of localLinks){const response=await fetch(new URL(href,origin));check('Link local '+href,response.status===200);}
  const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html')&&!['index.html','revisao-imagens.html'].includes(f));
  for(const file of pages){
    await page.send('Page.navigate',{url:origin+'/'+file});await wait(100);
    const state=await page.evaluate(`({title:document.title,heading:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,mainText:document.querySelector('main').textContent})`);
    check('Página institucional '+file,state.title.endsWith(' | VONNIX')&&!!state.heading&&!state.overflow,state);
    results.pages.push({file,title:state.title});
    if(!['quem-somos.html','rastreio.html'].includes(file))check('Texto oficial local '+file,await page.evaluate(`document.querySelector('#policyContent').textContent.length>250&&document.querySelector('#policyContent a').href.startsWith('https://vonnix.store/policies/')`));
  }
  await page.send('Page.navigate',{url:origin+'/revisao-imagens.html'});await wait(150);
  check('Catálogo interno com as 33 imagens',await page.evaluate(`document.querySelectorAll('#imageCatalog figure').length===33`));
  await page.evaluate(`document.querySelector('#imageFilter').value='pending';document.querySelector('#imageFilter').dispatchEvent(new Event('change'))`);
  check('Catálogo identifica '+pendingImages+' artes pendentes',await page.evaluate(`document.querySelectorAll('#imageCatalog figure').length===${pendingImages}`));
  await page.send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
  check('Catálogo sem rolagem horizontal em 320px',await page.evaluate(`document.documentElement.scrollWidth<=innerWidth`));
  // Os originais das artes, fotos, bandeiras e logos devem continuar byte a byte iguais.
  const unchanged=baseline.files.filter(item=>item.file.startsWith('images/')||item.file.startsWith('logo '));
  for(const item of unchanged){const actual=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,item.file))).digest('hex');check('Arquivo de imagem preservado '+item.file,actual===item.sha256);}
  check('Sem exceções JavaScript',results.errors.length===0,results.errors);
  check('Sem respostas HTTP 404/erro',results.httpErrors.length===0,results.httpErrors);
  check('Sem requisições para terceiros',results.externalRequests.length===0,results.externalRequests);
  results.success=true;
} catch(error){results.success=false;results.failure=error.stack;console.error(error.stack);process.exitCode=1;}
finally{if(browser)await browser.close();server.close();fs.mkdirSync(path.join(root,'.rebranding'),{recursive:true});fs.writeFileSync(path.join(root,'.rebranding/testes.json'),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify({success:results.success,checks:results.checks.length,viewports:results.viewports,pages:results.pages,errors:results.errors,httpErrors:results.httpErrors,externalRequests:results.externalRequests},null,2));}
