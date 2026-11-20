import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { createLocalServer,root } from './local-server.mjs';
import { openBrowser } from './browser.mjs';

const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'js/vonnix-config.js'),'utf8'),context,{timeout:1000});
const C=context.window.VONNIX_CONFIG,anchor=Date.parse(C.promotion.cycleAnchor),duration=10800000;
const server=createLocalServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const results={checks:[],viewports:[],errors:[],httpErrors:[]};
const check=(name,condition)=>{results.checks.push({name,passed:!!condition});assert.ok(condition,name);};
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let browser;
try{
 check('Configuração de ciclos de três horas',C.promotion.mode==='loop'&&C.promotion.durationSeconds===10800&&Number.isFinite(anchor));
 const image=C.assets['IMG-17'];const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
 check('Banner idêntico ao novo arquivo fornecido',hash(image.path)===hash('Oferta Black Friday com Armazenamento Inteligente.png'));
 browser=await openBrowser();const {page}=browser;
 page.on('Runtime.exceptionThrown',event=>results.errors.push(event.exceptionDetails.exception?.description||event.exceptionDetails.text));
 page.on('Network.responseReceived',event=>{if(event.response.status>=400)results.httpErrors.push({status:event.response.status,url:event.response.url});});
 const {identifier}=await page.send('Page.addScriptToEvaluateOnNewDocument',{source:`window.__qaCountdownTime=Number(new URLSearchParams(location.search).get('qa-now'))||${anchor};Date.now=()=>window.__qaCountdownTime;`});
 async function loaded(){for(let i=0;i<100;i++){try{if(await page.evaluate(`document.readyState==='complete'&&document.querySelector('#countdown2')?.textContent.length>0`))return;}catch{}await wait(40);}throw Error('Cronômetro não carregou.');}
 await page.send('Page.navigate',{url:origin+'/index.html?qa-now='+anchor});await loaded();
 check('Ciclo começa em 03:00:00',await page.evaluate(`document.querySelector('#countdown2').textContent==='03:00:00'`));
 for(const [offset,clock,label]of [[duration-1000,'00:00:01','Último segundo do ciclo'],[duration,'03:00:00','Reinício automático ao completar três horas'],[duration+1000,'02:59:59','Contagem continua após o reinício'],[duration*4+3661000,'01:58:59','Ciclos sucessivos sem acumular desvio']]){
  await page.evaluate(`window.__qaCountdownTime=${anchor+offset}`);await wait(1050);
  check(label,await page.evaluate(`document.querySelector('#countdown2').textContent===${JSON.stringify(clock)}`));
 }
 check('Dígitos e contador principal sincronizados',await page.evaluate(`document.querySelector('#countdown').textContent===document.querySelector('#countdown2').textContent&&[...document.querySelectorAll('[data-offer-digit]')].map(el=>el.textContent).join(':')===document.querySelector('#countdown2').textContent`));
 check('Legenda identifica contagem em ciclos',await page.evaluate(`document.querySelector('.black-live-clock p').textContent.includes('CONTAGEM REGRESSIVA')&&!document.querySelector('.black-live-clock p').textContent.includes('EXPIRA')`));
 await page.send('Page.navigate',{url:origin+'/index.html?qa-now='+(anchor+duration*4+3661000)});await loaded();
 const before=await page.evaluate(`document.querySelector('#countdown2').textContent`);
 await page.send('Page.reload');await loaded();
 check('Recarregar mantém a fase do ciclo',await page.evaluate(`document.querySelector('#countdown2').textContent===${JSON.stringify(before)}`));
 check('Não utiliza cookies nem armazenamento do visitante',await page.evaluate(`document.cookie===''&&localStorage.length===0&&sessionStorage.length===0`));
 for(const width of [320,360,390,430,768,1024,1440,1920]){
  await page.send('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:false});
  await page.evaluate(`document.querySelector('#oferta img').loading='eager';document.querySelector('#oferta').scrollIntoView();window.scrollBy(0,-80)`);
  await page.evaluate(`document.querySelector('#oferta img').decode()`);
  const layout=await page.evaluate(`(()=>{const art=document.querySelector('.black-offer-art').getBoundingClientRect();const parts=[document.querySelector('.black-live-clock p'),...document.querySelectorAll('.black-clock-digits b,.black-clock-digits small')].map(el=>el.getBoundingClientRect());return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,clockInReservedSpace:parts.every(part=>part.top>=art.top+art.height*.68&&part.bottom<=art.top+art.height*.805)}})()`);
  results.viewports.push(layout);check('Cronômetro dentro da faixa e sem rolagem horizontal '+width,layout.clockInReservedSpace&&layout.scrollWidth<=width);
 }
 await page.send('Page.removeScriptToEvaluateOnNewDocument',{identifier});
 await page.send('Page.navigate',{url:origin+'/index.html'});await loaded();await page.evaluate('document.fonts.ready.then(()=>true)');
 for(const width of [390,548]){
  await page.send('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:false});
  await page.evaluate(`document.querySelector('#oferta img').loading='eager';document.querySelector('#oferta').scrollIntoView();window.scrollBy(0,-80)`);await page.evaluate(`document.querySelector('#oferta img').decode()`);await wait(100);
  const clip=await page.evaluate(`(()=>{const rect=document.querySelector('#oferta').getBoundingClientRect();return{x:rect.left,y:rect.top+scrollY,width:rect.width,height:rect.height,scale:1}})()`);
  const screenshot=await page.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});
  fs.writeFileSync(path.join(root,'.rebranding/banner-cronometro-'+width+'.png'),Buffer.from(screenshot.data,'base64'));
 }
 check('Sem exceções JavaScript',results.errors.length===0);check('Sem erros HTTP',results.httpErrors.length===0);results.success=true;
}catch(error){results.success=false;results.failure=error.stack;console.error(error.stack);process.exitCode=1;}
finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));fs.writeFileSync(path.join(root,'.rebranding/testes-cronometro.json'),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify({success:results.success,checks:results.checks.length,viewports:results.viewports,errors:results.errors,httpErrors:results.httpErrors},null,2));}
