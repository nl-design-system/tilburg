const __vite__fileDeps=["./css-breadcrumb-nav.stories-CPqSPsXX.js","./jsx-runtime-Nms4Y4qS.js","./index-BwDkhjyp.js","./_commonjsHelpers-BosuxZz1.js","./index-CZef-QcA.js","./objectDestructuringEmpty-CFs8GuKT.js","./extends-CCbyfPlC.js","./css-counter-badge.stories-CCPUjEmv.js","./css-utrecht-accordion.stories-DJ4F01bl.js","./css-utrecht-button.stories-kJBmyKj0.js","./css-utrecht-heading.stories-nao-n_Sy.js","./css-utrecht-link.stories-CeSXpepL.js","./css-utrecht-paragraph.stories-DBTXQ-dH.js","./css-utrecht-skip-link.stories-DpoTzXb8.js","./index.esm-By25N4f4.js","./css-utrecht-status-badge.stories-Dr6R4Z-p.js","./css-utrecht-table.stories-UJIk1X7B.js","./css-utrecht-unordered-list.stories-Di0rXAjT.js","./introduction-CkfwVmOx.js","./index-DlpNa54Y.js","./chunk-HLWAVYOI-D4siQJBY.js","./react-18-CzKcEif8.js","./index-ChwMrSJI.js","./license-icxA-5rn.js","./notice-CLQAeyXT.js","./entry-preview-DXHkI4nR.js","./entry-preview-docs-Qr-9bxgA.js","./preview-BiFXY1Yx.js","./preview-CjEF4lnM.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import"../sb-preview/runtime.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&u(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const f="modulepreload",R=function(_,s){return new URL(_,s).href},p={},t=function(s,c,u){let e=Promise.resolve();if(c&&c.length>0){const r=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),E=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));e=Promise.all(c.map(i=>{if(i=R(i,u),i in p)return;p[i]=!0;const a=i.endsWith(".css"),O=a?'[rel="stylesheet"]':"";if(!!u)for(let m=r.length-1;m>=0;m--){const l=r[m];if(l.href===i&&(!a||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${O}`))return;const n=document.createElement("link");if(n.rel=a?"stylesheet":f,a||(n.as="script",n.crossOrigin=""),n.href=i,E&&n.setAttribute("nonce",E),document.head.appendChild(n),a)return new Promise((m,l)=>{n.addEventListener("load",m),n.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${i}`)))})}))}return e.then(()=>s()).catch(r=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r})},{createBrowserChannel:P}=__STORYBOOK_MODULE_CHANNELS__,{addons:h}=__STORYBOOK_MODULE_PREVIEW_API__,d=P({page:"preview"});h.setChannel(d);window.__STORYBOOK_ADDONS_CHANNEL__=d;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=d);const T={"./src/css-breadcrumb-nav.stories.tsx":async()=>t(()=>import("./css-breadcrumb-nav.stories-CPqSPsXX.js"),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url),"./src/css-counter-badge.stories.tsx":async()=>t(()=>import("./css-counter-badge.stories-CCPUjEmv.js"),__vite__mapDeps([7,4,5,2,3,1,6]),import.meta.url),"./src/css-utrecht-accordion.stories.tsx":async()=>t(()=>import("./css-utrecht-accordion.stories-DJ4F01bl.js"),__vite__mapDeps([8,1,2,3,4,5,6]),import.meta.url),"./src/css-utrecht-button.stories.tsx":async()=>t(()=>import("./css-utrecht-button.stories-kJBmyKj0.js"),__vite__mapDeps([9,4,5,2,3,1,6]),import.meta.url),"./src/css-utrecht-heading.stories.tsx":async()=>t(()=>import("./css-utrecht-heading.stories-nao-n_Sy.js"),__vite__mapDeps([10,4,5,2,3,1,6]),import.meta.url),"./src/css-utrecht-link.stories.tsx":async()=>t(()=>import("./css-utrecht-link.stories-CeSXpepL.js"),__vite__mapDeps([11,1,2,3,4,5,6]),import.meta.url),"./src/css-utrecht-paragraph.stories.tsx":async()=>t(()=>import("./css-utrecht-paragraph.stories-DBTXQ-dH.js"),__vite__mapDeps([12,4,5,2,3,1,6]),import.meta.url),"./src/css-utrecht-skip-link.stories.tsx":async()=>t(()=>import("./css-utrecht-skip-link.stories-DpoTzXb8.js"),__vite__mapDeps([13,1,2,3,14,5,6]),import.meta.url),"./src/css-utrecht-status-badge.stories.tsx":async()=>t(()=>import("./css-utrecht-status-badge.stories-Dr6R4Z-p.js"),__vite__mapDeps([15,4,5,2,3,1,6]),import.meta.url),"./src/css-utrecht-table.stories.tsx":async()=>t(()=>import("./css-utrecht-table.stories-UJIk1X7B.js"),__vite__mapDeps([16,1,2,3,14,5,6,4]),import.meta.url),"./src/css-utrecht-unordered-list.stories.tsx":async()=>t(()=>import("./css-utrecht-unordered-list.stories-Di0rXAjT.js"),__vite__mapDeps([17,1,2,3,4,5,6]),import.meta.url),"./src/documentation/introduction.mdx":async()=>t(()=>import("./introduction-CkfwVmOx.js"),__vite__mapDeps([18,1,2,3,19,20,21,6,22]),import.meta.url),"./src/documentation/license.mdx":async()=>t(()=>import("./license-icxA-5rn.js"),__vite__mapDeps([23,1,2,3,19,20,21,6,22]),import.meta.url),"./src/documentation/notice.mdx":async()=>t(()=>import("./notice-CLQAeyXT.js"),__vite__mapDeps([24,1,2,3,19,20,21,6,22]),import.meta.url)};async function L(_){return T[_]()}const{composeConfigs:v,PreviewWeb:y,ClientApi:V}=__STORYBOOK_MODULE_PREVIEW_API__,A=async()=>{const _=await Promise.all([t(()=>import("./entry-preview-DXHkI4nR.js"),__vite__mapDeps([25,2,3,21]),import.meta.url),t(()=>import("./entry-preview-docs-Qr-9bxgA.js"),__vite__mapDeps([26,22,3,2]),import.meta.url),t(()=>import("./preview-BWQhjJe5.js"),[],import.meta.url),t(()=>import("./preview-QTDJpEUI.js"),[],import.meta.url),t(()=>import("./preview-B4GcaC1c.js"),[],import.meta.url),t(()=>import("./preview-BiFXY1Yx.js").then(s=>s.p),__vite__mapDeps([27,1,2,3,20,21,6,22,4,5,28]),import.meta.url)]);return v(_)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new y(L,A);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};