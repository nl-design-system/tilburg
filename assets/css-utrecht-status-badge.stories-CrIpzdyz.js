import{j as h}from"./index-C5cqLfhp.js";import"./slicedToArray-CZk-kZYI.js";import"./clsx-BspRNC6E.js";import"./index-Cs7sjTYM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./jsx-runtime-BlAj40OV.js";import"./objectDestructuringEmpty-B6xfWM80.js";import"./extends-CF3RwP-h.js";const w=`# Status badge

The status badge component.
`;/* @license CC0-1.0 */const y={title:"CSS Component/Status badge",id:"css-utrecht-status-badge",component:h,argTypes:{children:{description:"Text content",control:"text"},status:{control:{type:"select"},description:"Status",options:["danger","success","warning"]}},args:{status:"neutral",children:""},tags:["autodocs"],parameters:{design:{type:"figma",url:"https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=1354-6672&t=iKkbTeLsUISfA7KG-0"},docs:{description:{component:w}}}},r={args:{status:"neutral",children:"normaal"}},e={args:{status:"success",children:"success"},name:"Success"},s={args:{status:"warning",children:"warning"},name:"Warning"},a={args:{status:"error",children:"error"},name:"Error"};var t,n,o;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    status: 'neutral',
    children: 'normaal'
  }
}`,...(o=(n=r.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var c,i,u;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    status: 'success',
    children: 'success'
  },
  name: 'Success'
}`,...(u=(i=e.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var m,d,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    status: 'warning',
    children: 'warning'
  },
  name: 'Warning'
}`,...(p=(d=s.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,l,S;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    status: 'error',
    children: 'error'
  },
  name: 'Error'
}`,...(S=(l=a.parameters)==null?void 0:l.docs)==null?void 0:S.source}}};const D=["Default","Success","Warning","Error"];export{r as Default,a as Error,e as Success,s as Warning,D as __namedExportsOrder,y as default};
