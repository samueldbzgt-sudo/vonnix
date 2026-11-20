import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createLocalServer,root } from './local-server.mjs';
import { openBrowser } from './browser.mjs';

const expected={
 kit15:'https://seguro.vonnix.store/api/public/shopify?product=51024891084997&store=41507',
 kit30:'https://seguro.vonnix.store/api/public/shopify?product=51024891117765&store=41507',
 kit45:'https://seguro.vonnix.store/api/public/shopify?product=51024891150533&store=41507'
};
const server=createLocalServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const result={checks:[],redirects:[],externalRequestsBlocked:[],errors:[]};
const check=(name,condition)=>{result.checks.push({name,passed:!!condition});assert.ok(condition,name);};
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let browser;
try{
 async function until(condition){for(let i=0;i<100;i++){try{if(await condition())return;}catch{}await wait(40);}throw Error('Tempo de verificação excedido.');}
 for(const [key,url]of Object.entries(expected)){
  browser=await openBrowser();const {page}=browser;
  // openBrowser bloqueia toda requisição externa antes do envio à rede.
  page.on('Fetch.requestPaused',event=>{if(event.request.url.startsWith('https://seguro.vonnix.store/'))result.externalRequestsBlocked.push(event.request.url);});
  page.on('Page.frameRequestedNavigation',event=>{if(event.url.startsWith('https://seguro.vonnix.store/'))result.redirects.push(event.url);});
  page.on('Runtime.exceptionThrown',event=>result.errors.push(event.exceptionDetails.exception?.description||event.exceptionDetails.text));
  await page.send('Page.navigate',{url:origin+'/index.html'});
  await until(()=>page.evaluate(`typeof window.iniciarCheckout==='function'&&document.querySelector('[data-kit="${key}"]')!==null`));
  await page.evaluate(`document.querySelector('[data-kit="${key}"]').click()`);
  check('Todos os botões habilitados para '+key,await page.evaluate(`[...document.querySelectorAll('.buy')].every(button=>!button.disabled&&button.getAttribute('aria-disabled')==='false')`));
  check('Kit selecionado preservado '+key,await page.evaluate(`document.querySelector('[data-kit="${key}"]').getAttribute('aria-pressed')==='true'`));
  check('URL fornecida preservada '+key,await page.evaluate(`window.VONNIX_CONFIG.checkout.urls[${JSON.stringify(key)}]===${JSON.stringify(url)}`));
  await page.evaluate(`document.querySelectorAll('.buy,[data-kit]').forEach(button=>{button.disabled=true});window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}))`);
  check('Retorno à página libera os controles '+key,await page.evaluate(`[...document.querySelectorAll('.buy,[data-kit]')].every(button=>!button.disabled)`));
  const selector=key==='kit45'?'#stickyBar .buy':key==='kit30'?'[data-cta2]':'[data-cta1]';
  if(key==='kit45')await page.evaluate('window.scrollTo(0,800)');
  try{await page.evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);}catch{}
  await until(()=>Promise.resolve(result.externalRequestsBlocked.includes(url)));
  check('Botão direciona ao checkout correspondente '+key,result.externalRequestsBlocked.includes(url));
  await browser.close();browser=null;
 }
 check('Somente os três destinos autorizados foram tentados',result.externalRequestsBlocked.every(url=>Object.values(expected).includes(url))&&new Set(result.externalRequestsBlocked).size===3);
 check('Sem erros JavaScript',result.errors.length===0);
 result.success=true;
}catch(error){result.success=false;result.failure=error.stack;console.error(error.stack);process.exitCode=1;}
finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));fs.writeFileSync(path.join(root,'.rebranding/testes-checkouts.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({success:result.success,checks:result.checks.length,externalRequestsBlocked:result.externalRequestsBlocked,errors:result.errors},null,2));}
