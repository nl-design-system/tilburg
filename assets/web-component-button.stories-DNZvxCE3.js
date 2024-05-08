import{j as N}from"./jsx-runtime-Nms4Y4qS.js";import{R as C,r as T}from"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";const w=`<!-- @license CC0-1.0 -->

# Example Button component
`,L=t=>t.toLowerCase().split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(""),g=t=>t.replace(/([A-Z])/g,e=>`-${e[0].toLowerCase()}`),j=(t,e,o={})=>{if(t instanceof Element){const n=B(t.classList,e,o);n!==""&&(t.className=n),Object.keys(e).forEach(s=>{if(!(s==="children"||s==="style"||s==="ref"||s==="class"||s==="className"||s==="forwardedRef"))if(s.indexOf("on")===0&&s[2]===s[2].toUpperCase()){const c=s.substring(2),r=c[0].toLowerCase()+c.substring(1);x(r)||O(t,r,e[s])}else t[s]=e[s],typeof e[s]==="string"&&t.setAttribute(g(s),e[s])})}},B=(t,e,o)=>{const n=e.className||e.class,s=o.className||o.class,c=h(t),r=h(n?n.split(" "):[]),l=h(s?s.split(" "):[]),p=[];return c.forEach(a=>{r.has(a)?(p.push(a),r.delete(a)):l.has(a)||p.push(a)}),r.forEach(a=>p.push(a)),p.join(" ")},D=t=>{switch(t){case"doubleclick":return"dblclick"}return t};/**
 * Checks if an event is supported in the current execution environment.
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */const x=t=>{if(typeof document>"u")return!0;{const e="on"+D(t);let o=e in document;if(!o){const n=document.createElement("div");n.setAttribute(e,"return;"),o=typeof n[e]=="function"}return o}},O=(t,e,o)=>{const n=t.__events||(t.__events={}),s=n[e];s&&t.removeEventListener(e,s),t.addEventListener(e,n[e]=function(r){o&&o.call(this,r)})},h=t=>{const e=new Map;return t.forEach(o=>e.set(o,o)),e},_=(t,e)=>{typeof t=="function"?t(e):t!=null&&(t.current=e)},U=(...t)=>e=>{t.forEach(o=>{_(o,e)})},k=(t,e)=>{const o=(n,s)=>C.createElement(t,{...n,forwardedRef:s});return o.displayName=e,C.forwardRef(o)},A=(t,e,o,n)=>{const s=L(t),c=class extends C.Component{constructor(r){super(r),this.setComponentElRef=l=>{this.componentEl=l}}componentDidMount(){this.componentDidUpdate(this.props)}componentDidUpdate(r){j(this.componentEl,this.props,r)}render(){const{children:r,forwardedRef:l,style:p,className:a,ref:F,...E}=this.props,v={...Object.keys(E).reduce((d,i)=>{const m=E[i];if(i.indexOf("on")===0&&i[2]===i[2].toUpperCase()){const u=i.substring(2).toLowerCase();typeof document<"u"&&x(u)&&(d[i]=m)}else{const u=typeof m;(u==="string"||u==="boolean"||u==="number")&&(d[g(i)]=m)}return d},{}),ref:U(l,this.setComponentElRef),style:p};return T.createElement(t,v,r)}static get displayName(){return s}};return k(c,s)},P=A("tilburg-button"),M=({children:t})=>N.jsx(P,{children:t}),Z={title:"Web Component/Button",id:"web-component-button",component:M,argTypes:{children:{name:"Content",description:"Button text",type:{name:"string",required:!0},defaultValue:""}},args:{children:"Opslaan en verder"},tags:["autodocs"],parameters:{docs:{description:{component:w}}}},f={name:"Example button"};var y,b,R;f.parameters={...f.parameters,docs:{...(y=f.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Example button'
}`,...(R=(b=f.parameters)==null?void 0:b.docs)==null?void 0:R.source}}};const $=["Default"];export{f as Default,$ as __namedExportsOrder,Z as default};
