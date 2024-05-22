import{j as d}from"./jsx-runtime-Nms4Y4qS.js";import{S as k}from"./index.esm-C9dBL2Ur.js";import"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./objectDestructuringEmpty-CFs8GuKT.js";import"./extends-CCbyfPlC.js";function f(e){var n,s,i="";if(typeof e=="string"||typeof e=="number")i+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(s=f(e[n]))&&(i&&(i+=" "),i+=s)}else for(s in e)e[s]&&(i&&(i+=" "),i+=s);return i}function h(){for(var e,n,s=0,i="",o=arguments.length;s<o;s++)(e=arguments[s])&&(n=f(e))&&(i&&(i+=" "),i+=n);return i}const g=`# Skip link

An accessibility component. It is a link that allows users to skip to the main content of a page. This is useful for users of screen readers, who can skip over the navigation and other elements that are repeated on every page.
`,b=({focus:e,visibility:n,visibleOnFocus:s,...i})=>d.jsx(k,{className:h({"utrecht-skip-link--focus":e,"utrecht-skip-link--visible-on-focus":s,"utrecht-skip-link--hidden":n==="hidden","utrecht-skip-link--visible":n==="visible"}),...i}),O={title:"CSS Component/Skip link",id:"css-skip-link",component:b,argTypes:{},args:{},tags:["autodocs"],parameters:{design:{type:"figma",url:"https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=2217-10122&t=iKkbTeLsUISfA7KG-0"},docs:{description:{component:g}}}},t={args:{href:"#main",focus:!0,children:"Skip to main content",visibility:"visible"}},r={args:{href:"#main",focus:!0,children:"Skip to main content",visibleOnFocus:!0},name:"Visible on focus"};var a,c,p;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    href: '#main',
    focus: true,
    children: 'Skip to main content',
    visibility: 'visible'
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,m,l;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    href: '#main',
    focus: true,
    children: 'Skip to main content',
    visibleOnFocus: true
  },
  name: 'Visible on focus'
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const A=["Default","VisibleOnFocus"];export{t as Default,r as VisibleOnFocus,A as __namedExportsOrder,O as default};
