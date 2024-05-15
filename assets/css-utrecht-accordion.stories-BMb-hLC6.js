import{j as s}from"./jsx-runtime-Nms4Y4qS.js";import{A as o}from"./index-CuQnZ4ih.js";import"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./extends-CCbyfPlC.js";const p=`# Accordion

The accordion component is a container that can be collapsed and expanded. It is used to hide and show content.
`,b=({expanded:c,label:l,body:m})=>s.jsx(o,{sections:[{expanded:c,label:l,body:m}]}),v={title:"CSS Component/Accordion",id:"css-utrecht-accordion",component:o,args:{label:"",body:"",expandedAccordion:!1},argTypes:{label:{name:"label",type:{name:"string",required:!0},table:{defaultValue:{summary:""},category:"API"}},body:{name:"body",type:{name:"string",required:!0},table:{defaultValue:{summary:""},category:"API"}},expandedAccordion:{name:"expandedAccordion",type:{name:"boolean",required:!1},table:{defaultValue:{summary:!1},category:"API"}}},tags:["autodocs"],parameters:{design:{type:"figma",url:"https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=1261%3A4784&t=lu24fBlSHdl7JcKT-1"},docs:{description:{component:p}}},render:b},e={args:{label:"Lorem ipsum",body:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.`,expandedAccordion:!0}},g=[{label:"Lorem ipsum 1",body:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.`,expandedAccordion:!0},{label:"Lorem ipsum 2",body:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.`,expandedAccordion:!1},{label:"Lorem ipsum 3",body:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.`,expandedAccordion:!1}],i={render:()=>s.jsx(o,{sections:g})};var a,t,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  // @ts-ignore
  args: {
    label: 'Lorem ipsum',
    body: \`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.\`,
    expandedAccordion: true
  }
}`,...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};var n,u,d;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <AccordionProvider sections={accordionData} />
}`,...(d=(u=i.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const h=["Default","Multiple"];export{e as Default,i as Multiple,h as __namedExportsOrder,v as default};
