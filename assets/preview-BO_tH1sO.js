const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-CFRXHY34-BP9LuAyb.js","./chunk-NUUEMKO5-5OoIQz4d.js","./iframe-CxRO4VhW.js","./index-Cs7sjTYM.js","./_commonjsHelpers-BosuxZz1.js","./jsx-runtime-BlAj40OV.js","./index-DJFdew98.js","./extends-CF3RwP-h.js","./index-BLrIWWQf.js","./react-18-B3HRjLEH.js"])))=>i.map(i=>d[i]);
import{_ as a}from"./iframe-CxRO4VhW.js";import"../sb-preview/runtime.js";const{global:s}=__STORYBOOK_MODULE_GLOBAL__;var _=Object.entries(s.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),d={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-CFRXHY34-BP9LuAyb.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]),import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>_[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{d as parameters};
