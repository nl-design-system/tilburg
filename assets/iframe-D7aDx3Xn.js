const __vite__fileDeps=["./css-utrecht-button.stories-DjLCMoq5.js","./index-C2iBp4UQ.js","./index-BwDkhjyp.js","./_commonjsHelpers-BosuxZz1.js","./jsx-runtime-Nms4Y4qS.js","./extends-CCbyfPlC.js","./css-utrecht-heading.stories-BF2vGNeI.js","./introduction-mqcMNVMx.js","./index-DlpNa54Y.js","./chunk-HLWAVYOI-Bv_l7a2W.js","./react-18-CzKcEif8.js","./index-ChwMrSJI.js","./license-CLFznLvg.js","./notice-CBNqEttL.js","./react-button.stories-jC2AD7iF.js","./react-button-SLPz3CQC.css","./web-component-button.stories-DNZvxCE3.js","./entry-preview-DXHkI4nR.js","./entry-preview-docs-Qr-9bxgA.js","./preview-BkLDx-gx.js","./preview-BHF6wA9j.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import"../sb-preview/runtime.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&u(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const f="modulepreload",R=function(_,n){return new URL(_,n).href},E={},o=function(n,c,u){let e=Promise.resolve();if(c&&c.length>0){const t=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),O=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));e=Promise.all(c.map(i=>{if(i=R(i,u),i in E)return;E[i]=!0;const l=i.endsWith(".css"),p=l?'[rel="stylesheet"]':"";if(!!u)for(let a=t.length-1;a>=0;a--){const m=t[a];if(m.href===i&&(!l||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${p}`))return;const s=document.createElement("link");if(s.rel=l?"stylesheet":f,l||(s.as="script",s.crossOrigin=""),s.href=i,O&&s.setAttribute("nonce",O),document.head.appendChild(s),l)return new Promise((a,m)=>{s.addEventListener("load",a),s.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${i}`)))})}))}return e.then(()=>n()).catch(t=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t})},{createBrowserChannel:P}=__STORYBOOK_MODULE_CHANNELS__,{addons:h}=__STORYBOOK_MODULE_PREVIEW_API__,d=P({page:"preview"});h.setChannel(d);window.__STORYBOOK_ADDONS_CHANNEL__=d;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=d);const w={"./src/css-utrecht-button.stories.tsx":async()=>o(()=>import("./css-utrecht-button.stories-DjLCMoq5.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),"./src/css-utrecht-heading.stories.tsx":async()=>o(()=>import("./css-utrecht-heading.stories-BF2vGNeI.js"),__vite__mapDeps([6,1,2,3,4,5]),import.meta.url),"./src/documentation/introduction.mdx":async()=>o(()=>import("./introduction-mqcMNVMx.js"),__vite__mapDeps([7,4,2,3,8,9,10,5,11]),import.meta.url),"./src/documentation/license.mdx":async()=>o(()=>import("./license-CLFznLvg.js"),__vite__mapDeps([12,4,2,3,8,9,10,5,11]),import.meta.url),"./src/documentation/notice.mdx":async()=>o(()=>import("./notice-CBNqEttL.js"),__vite__mapDeps([13,4,2,3,8,9,10,5,11]),import.meta.url),"./src/react-button.stories.tsx":async()=>o(()=>import("./react-button.stories-jC2AD7iF.js"),__vite__mapDeps([14,4,2,3,15]),import.meta.url),"./src/web-component-button.stories.tsx":async()=>o(()=>import("./web-component-button.stories-DNZvxCE3.js"),__vite__mapDeps([16,4,2,3]),import.meta.url)};async function T(_){return w[_]()}const{composeConfigs:L,PreviewWeb:y,ClientApi:I}=__STORYBOOK_MODULE_PREVIEW_API__,v=async()=>{const _=await Promise.all([o(()=>import("./entry-preview-DXHkI4nR.js"),__vite__mapDeps([17,2,3,10]),import.meta.url),o(()=>import("./entry-preview-docs-Qr-9bxgA.js"),__vite__mapDeps([18,11,3,2]),import.meta.url),o(()=>import("./preview-jJfo9EHL.js"),[],import.meta.url),o(()=>import("./preview-PaWV5_xe.js"),[],import.meta.url),o(()=>import("./preview-B4GcaC1c.js"),[],import.meta.url),o(()=>import("./preview-BkLDx-gx.js").then(n=>n.p),__vite__mapDeps([19,4,2,3,20]),import.meta.url)]);return L(_)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new y(T,v);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{o as _};
