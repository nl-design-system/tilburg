import{j as e}from"./jsx-runtime-X2b_N9AH.js";import{F as y,e as s,f as S,T as f,g as k,P as O,C as j,S as C,h as r}from"./index-DNhXC9Gy.js";import"./index-uCp2LrAq.js";import"./_commonjsHelpers-BosuxZz1.js";import"./objectDestructuringEmpty-CC3XR7Mu.js";import"./extends-CF3RwP-h.js";const v=`# Form field

Form fields are used to collect user input. They are used in forms, where the user is required to fill in data.
`,U={title:"CSS Component/Forms",id:"css-utrecht-form-field",component:y,argTypes:{children:{name:"Content",type:{name:"string",required:!0},defaultValue:""}},args:{children:""},tags:["autodocs"],parameters:{bugs:"https://github.com/nl-design-system/rotterdam/labels/component%2Fbreadcrumb-nav",design:{type:"figma",url:"https://www.figma.com/file/ZWSC4gCrOXRUR9UX3aoZ8x/?node-id=501-18760"},docs:{description:{component:v}}}},t={name:"Form Field",args:{type:"text",children:[e.jsx(s,{children:"Label"},"label"),e.jsx(S,{children:"Description"},"description"),e.jsx(f,{},"textbox")]},parameters:{design:{type:"figma",url:"https://www.figma.com/file/ZWSC4gCrOXRUR9UX3aoZ8x/Gemeente-Rotterdam-Design-System?type=design&node-id=507-20062&mode=design&t=yvzUSkFQYQmWSHsQ-4"}}},o={name:"Form Field with error",args:{type:"text",children:[e.jsx(s,{children:"Label"},"label"),e.jsx(S,{children:"Description"},"description"),e.jsx(k,{children:"Error message"},"error"),e.jsx(f,{},"textbox")]}},n={name:"Checkbox",args:{type:"checkbox",children:[e.jsx(O,{className:"utrecht-form-field__label utrecht-form-field__label--checkbox",children:e.jsxs(s,{type:"checkbox",children:[e.jsx(j,{className:"utrecht-form-field__input",name:"consent",value:"consent"},"checkbox"),"Label"]},"label")})]}},a={name:"Select",args:{type:"select",children:[e.jsxs(C,{children:[e.jsx(r,{disabled:!0,value:"",children:"Select an option"}),e.jsx(r,{value:"1",children:"Option #1"}),e.jsx(r,{value:"2",children:"Option #2"}),e.jsx(r,{value:"3",children:"Option #3"}),e.jsx(r,{value:"4",children:"Option #4"})]})]}};var i,l,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'Form Field',
  args: {
    type: 'text',
    children: [<FormLabel key="label">Label</FormLabel>, <FormFieldDescription key="description">Description</FormFieldDescription>, <Textbox key="textbox" />]
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ZWSC4gCrOXRUR9UX3aoZ8x/Gemeente-Rotterdam-Design-System?type=design&node-id=507-20062&mode=design&t=yvzUSkFQYQmWSHsQ-4'
    }
  }
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var m,d,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'Form Field with error',
  args: {
    type: 'text',
    children: [<FormLabel key="label">Label</FormLabel>, <FormFieldDescription key="description">Description</FormFieldDescription>, <FormFieldErrorMessage key="error">Error message</FormFieldErrorMessage>, <Textbox key="textbox" />]
  }
}`,...(p=(d=o.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var h,u,x;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Checkbox',
  args: {
    type: 'checkbox',
    children: [<Paragraph className="utrecht-form-field__label utrecht-form-field__label--checkbox">
        <FormLabel key="label" type="checkbox">
          <Checkbox className="utrecht-form-field__input" key="checkbox" name="consent" value="consent" />
          Label
        </FormLabel>
      </Paragraph>]
  }
}`,...(x=(u=n.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var b,g,F;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Select',
  args: {
    type: 'select',
    children: [<Select>
        <SelectOption disabled value="">
          Select an option
        </SelectOption>
        <SelectOption value="1">Option #1</SelectOption>
        <SelectOption value="2">Option #2</SelectOption>
        <SelectOption value="3">Option #3</SelectOption>
        <SelectOption value="4">Option #4</SelectOption>
      </Select>]
  }
}`,...(F=(g=a.parameters)==null?void 0:g.docs)==null?void 0:F.source}}};const Q=["Default","Error","CheckboxField","SelectField"];export{n as CheckboxField,t as Default,o as Error,a as SelectField,Q as __namedExportsOrder,U as default};
