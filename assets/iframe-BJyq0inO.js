const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./css-ams-pagination.stories-BYCgwCWr.js","./clsx-BspRNC6E.js","./slicedToArray-CZk-kZYI.js","./jsx-runtime-BlAj40OV.js","./index-Cs7sjTYM.js","./_commonjsHelpers-BosuxZz1.js","./css-ams-pagination-95Nazttf.css","./css-breadcrumb-nav.stories-BQRoHBr2.js","./index-C5cqLfhp.js","./objectDestructuringEmpty-B6xfWM80.js","./extends-CF3RwP-h.js","./css-counter-badge.stories-xSylUTnC.js","./css-utrecht-accordion.stories-BxWSLOnp.js","./css-utrecht-button.stories-FUMHfw7d.js","./css-utrecht-data-list.stories-BvximUrk.js","./index.esm-Ccu_-M9k.js","./css-utrecht-form-field.stories-CyhNdvxP.js","./css-utrecht-heading.stories-qQtZ-tGa.js","./css-utrecht-link.stories-X_w29_T-.js","./css-utrecht-ordered-list.stories-BsnNzI3f.js","./css-utrecht-paragraph.stories-Drd_dDKu.js","./css-utrecht-skip-link.stories-CS8_uYJJ.js","./css-utrecht-status-badge.stories-CrIpzdyz.js","./css-utrecht-table.stories-DpoILt8H.js","./css-utrecht-unordered-list.stories-DEU_H7pK.js","./introduction-v7GTc5VK.js","./index-BI1Biiay.js","./chunk-HLWAVYOI-stLMO_SB.js","./react-18-D9dwDG6f.js","./index-DSgSp0X8.js","./license-C5QaTkqX.js","./notice-CWdCTuju.js","./entry-preview-D0UJ6Vh3.js","./entry-preview-docs-DzJt4V2x.js","./preview-DRn-vd7c.js","./preview-CIN6-U1P.css"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const R="modulepreload",f=function(o,i){return new URL(o,i).href},p={},t=function(i,c,a){let e=Promise.resolve();if(c&&c.length>0){const r=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),E=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));e=Promise.all(c.map(_=>{if(_=f(_,a),_ in p)return;p[_]=!0;const u=_.endsWith(".css"),O=u?'[rel="stylesheet"]':"";if(!!a)for(let m=r.length-1;m>=0;m--){const l=r[m];if(l.href===_&&(!u||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${_}"]${O}`))return;const n=document.createElement("link");if(n.rel=u?"stylesheet":R,u||(n.as="script",n.crossOrigin=""),n.href=_,E&&n.setAttribute("nonce",E),document.head.appendChild(n),u)return new Promise((m,l)=>{n.addEventListener("load",m),n.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${_}`)))})}))}return e.then(()=>i()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})},{createBrowserChannel:T}=__STORYBOOK_MODULE_CHANNELS__,{addons:L}=__STORYBOOK_MODULE_PREVIEW_API__,d=T({page:"preview"});L.setChannel(d);window.__STORYBOOK_ADDONS_CHANNEL__=d;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=d);const P={"./src/css-ams-pagination.stories.tsx":async()=>t(()=>import("./css-ams-pagination.stories-BYCgwCWr.js"),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url),"./src/css-breadcrumb-nav.stories.tsx":async()=>t(()=>import("./css-breadcrumb-nav.stories-BQRoHBr2.js"),__vite__mapDeps([7,3,4,5,8,2,1,9,10]),import.meta.url),"./src/css-counter-badge.stories.tsx":async()=>t(()=>import("./css-counter-badge.stories-xSylUTnC.js"),__vite__mapDeps([11,8,2,1,4,5,3,9,10]),import.meta.url),"./src/css-utrecht-accordion.stories.tsx":async()=>t(()=>import("./css-utrecht-accordion.stories-BxWSLOnp.js"),__vite__mapDeps([12,3,4,5,8,2,1,9,10]),import.meta.url),"./src/css-utrecht-button.stories.tsx":async()=>t(()=>import("./css-utrecht-button.stories-FUMHfw7d.js"),__vite__mapDeps([13,8,2,1,4,5,3,9,10]),import.meta.url),"./src/css-utrecht-data-list.stories.tsx":async()=>t(()=>import("./css-utrecht-data-list.stories-BvximUrk.js"),__vite__mapDeps([14,3,4,5,15,1,9,10]),import.meta.url),"./src/css-utrecht-form-field.stories.tsx":async()=>t(()=>import("./css-utrecht-form-field.stories-CyhNdvxP.js"),__vite__mapDeps([16,3,4,5,8,2,1,9,10]),import.meta.url),"./src/css-utrecht-heading.stories.tsx":async()=>t(()=>import("./css-utrecht-heading.stories-qQtZ-tGa.js"),__vite__mapDeps([17,8,2,1,4,5,3,9,10]),import.meta.url),"./src/css-utrecht-link.stories.tsx":async()=>t(()=>import("./css-utrecht-link.stories-X_w29_T-.js"),__vite__mapDeps([18,3,4,5,8,2,1,9,10]),import.meta.url),"./src/css-utrecht-ordered-list.stories.tsx":async()=>t(()=>import("./css-utrecht-ordered-list.stories-BsnNzI3f.js"),__vite__mapDeps([19,3,4,5,8,2,1,9,10]),import.meta.url),"./src/css-utrecht-paragraph.stories.tsx":async()=>t(()=>import("./css-utrecht-paragraph.stories-Drd_dDKu.js"),__vite__mapDeps([20,8,2,1,4,5,3,9,10]),import.meta.url),"./src/css-utrecht-skip-link.stories.tsx":async()=>t(()=>import("./css-utrecht-skip-link.stories-CS8_uYJJ.js"),__vite__mapDeps([21,3,4,5,15,1,9,10]),import.meta.url),"./src/css-utrecht-status-badge.stories.tsx":async()=>t(()=>import("./css-utrecht-status-badge.stories-CrIpzdyz.js"),__vite__mapDeps([22,8,2,1,4,5,3,9,10]),import.meta.url),"./src/css-utrecht-table.stories.tsx":async()=>t(()=>import("./css-utrecht-table.stories-DpoILt8H.js"),__vite__mapDeps([23,3,4,5,15,1,9,10,8,2]),import.meta.url),"./src/css-utrecht-unordered-list.stories.tsx":async()=>t(()=>import("./css-utrecht-unordered-list.stories-DEU_H7pK.js"),__vite__mapDeps([24,3,4,5,8,2,1,9,10]),import.meta.url),"./src/documentation/introduction.mdx":async()=>t(()=>import("./introduction-v7GTc5VK.js"),__vite__mapDeps([25,3,4,5,26,27,28,10,29]),import.meta.url),"./src/documentation/license.mdx":async()=>t(()=>import("./license-C5QaTkqX.js"),__vite__mapDeps([30,3,4,5,26,27,28,10,29]),import.meta.url),"./src/documentation/notice.mdx":async()=>t(()=>import("./notice-CWdCTuju.js"),__vite__mapDeps([31,3,4,5,26,27,28,10,29]),import.meta.url)};async function y(o){return P[o]()}const{composeConfigs:h,PreviewWeb:v,ClientApi:D}=__STORYBOOK_MODULE_PREVIEW_API__,I=async(o=[])=>{const i=await Promise.all([o.at(0)??t(()=>import("./entry-preview-D0UJ6Vh3.js"),__vite__mapDeps([32,4,5,28]),import.meta.url),o.at(1)??t(()=>import("./entry-preview-docs-DzJt4V2x.js"),__vite__mapDeps([33,29,5,4]),import.meta.url),o.at(2)??t(()=>import("./preview-MifSRUD2.js"),[],import.meta.url),o.at(3)??t(()=>import("./preview-BdBc1smZ.js"),[],import.meta.url),o.at(4)??t(()=>import("./preview-BnWGZYux.js"),[],import.meta.url),o.at(5)??t(()=>import("./preview-DRn-vd7c.js").then(c=>c.p),__vite__mapDeps([34,3,4,5,27,28,10,29,8,2,1,9,35]),import.meta.url)]);return h(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new v(y,I);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
