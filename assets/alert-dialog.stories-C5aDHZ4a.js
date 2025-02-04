import{j as e}from"./jsx-runtime-BlAj40OV.js";import{H as k,d as l,P as u}from"./index-G8Tt6w1S.js";import{R as B,r as d}from"./index-Cs7sjTYM.js";/* empty css              */import{c as j}from"./clsx-B-dksMZM.js";import"./objectDestructuringEmpty-kEsbOJzC.js";import"./extends-CF3RwP-h.js";import"./_commonjsHelpers-BosuxZz1.js";const M=()=>e.jsx("svg",{"aria-hidden":"true",width:"14",height:"14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M.293.293a1 1 0 0 1 1.414 0L7 5.586 12.293.293a1 1 0 1 1 1.414 1.414L8.414 7l5.293 5.293a1 1 0 0 1-1.414 1.414L7 8.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L5.586 7 .293 1.707a1 1 0 0 1 0-1.414Z",fill:"currentColor"})}),i=B.forwardRef(({id:a,title:t,children:r,customFooter:n},o)=>{const[C,p]=d.useState(!1),m=()=>{var s;p(!1),(s=o==null?void 0:o.current)==null||s.close()},R=s=>{var h;s.target===o.current&&(p(!1),(h=o==null?void 0:o.current)==null||h.close())},y=j("tilburg-modal",C&&"open");return e.jsxs("dialog",{id:a,className:y,ref:o,onClick:R,children:[e.jsxs("div",{className:"tilburg-modal__header",children:[e.jsx(k,{level:2,children:t}),e.jsxs("button",{className:"tilburg-modal__close-button",onClick:m,children:[e.jsx(M,{}),"Close"]})]}),e.jsx("div",{className:"tilburg-modal__content",children:r}),n||e.jsx("div",{className:"tilburg-modal__footer",children:e.jsx(l,{appearance:"primary-action-button",onClick:m,children:"Close"})})]})});i.displayName="AlertDialog";i.__docgenInfo={description:"",methods:[],displayName:"AlertDialog"};const N={title:"React/Alert Dialog",component:i,parameters:{layout:"centered",docs:{description:{component:`
# Alert Dialog

An Alert Dialog component following the NL Design System guidelines. It allows users to focus on one task or piece of information by popping up and blocking the page content until the modal task is completed or until the user dismisses the action.

## When to use an Alert Dialog

- To display important information that requires user confirmation
- To present choices that cannot be undone
- To warn users about critical actions
- For short and non-frequent tasks that require immediate attention

## Guidelines

- Use dialogs sparingly because they interrupt the user's workflow
- Use a dialog for short and non-frequent tasks. Consider using the main flow for regular tasks
- Keep content concise and focused on a single task or piece of information
- Ensure the dialog title clearly describes its purpose
- Use action-oriented button labels that describe the action being taken

## Accessibility

- The dialog blocks interaction with the page content when open
- Focus is trapped inside the dialog when open
- The dialog can be closed using the Escape key
- All interactive elements are keyboard accessible
- The dialog has a clear visual hierarchy
- The close button is always available in the header
- ARIA attributes are properly set for screen readers
        `}},bugs:"https://github.com/nl-design-system/tilburg/labels/component%2Falert-dialog",design:{type:"figma",url:"https://www.figma.com/file/6RXnW5Zc1qBXlmD8YAm8lJ/Open-Tilburg?type=design&node-id=1-2&mode=design&t=YPa5Qd7RBECXALYg-0"}},argTypes:{title:{control:"text",description:"The title of the dialog"},children:{control:"text",description:"The content of the dialog"},customFooter:{control:"boolean",description:"Optional footer with custom buttons"}},tags:["autodocs"]},c={name:"Default",args:{title:"Example Alert Dialog",children:e.jsxs(e.Fragment,{children:[e.jsxs(u,{children:[e.jsx("strong",{children:"Agreement"}),e.jsx("br",{}),"A formal agreement or arrangement between two or more parties."]}),e.jsxs(u,{children:[e.jsx("strong",{children:"Policy Document"}),e.jsx("br",{}),"Document used to establish policies or guidelines."]})]})},parameters:{docs:{source:{language:"tsx",code:`
import { AlertDialog, Button } from '@tilburg/component-library-react';

function MyComponent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <Button onClick={openDialog}>Open Dialog</Button>
      <AlertDialog
        ref={dialogRef}
        title="Example Alert Dialog"
      >
        <Paragraph>
          <strong>Agreement</strong><br />
          A formal agreement or arrangement between two or more parties.
        </Paragraph>
        <Paragraph>
          <strong>Policy Document</strong><br />
          Document used to establish policies or guidelines.
        </Paragraph>
      </AlertDialog>
    </>
  );
}`}}},render:a=>{const t=d.useRef(null),r=()=>{var n;(n=t.current)==null||n.showModal()};return e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:r,children:"Open Dialog"}),e.jsx(i,{...a,ref:t})]})}},g={name:"With Custom Footer",args:{title:"Alert Dialog with Custom Footer",children:e.jsx(u,{children:"This alert dialog has a custom footer with multiple buttons."})},parameters:{docs:{source:{language:"tsx",code:`
import { AlertDialog, Button } from '@tilburg/component-library-react';

function MyComponent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <Button onClick={openDialog}>Open Dialog</Button>
      <AlertDialog
        ref={dialogRef}
        title="Alert Dialog with Custom Footer"
        customFooter={
          <div className="tilburg-modal__footer">
            <Button appearance="subtle-button" onClick={closeDialog}>
              Cancel
            </Button>
            <Button appearance="primary-action-button" onClick={closeDialog}>
              Save
            </Button>
          </div>
        }
      >
        <Paragraph>
          This alert dialog has a custom footer with multiple buttons.
        </Paragraph>
      </AlertDialog>
    </>
  );
}`}}},render:a=>{const t=d.useRef(null),r=()=>{var o;(o=t.current)==null||o.showModal()},n=()=>{var o;(o=t.current)==null||o.close()};return e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:r,children:"Open Dialog"}),e.jsx(i,{...a,ref:t,customFooter:e.jsxs("div",{className:"tilburg-modal__footer",children:[e.jsx(l,{appearance:"subtle-button",onClick:n,children:"Cancel"}),e.jsx(l,{appearance:"primary-action-button",onClick:n,children:"Save"})]})})]})}};var f,b,D;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    title: 'Example Alert Dialog',
    children: <>
        <Paragraph>
          <strong>Agreement</strong>
          <br />A formal agreement or arrangement between two or more parties.
        </Paragraph>
        <Paragraph>
          <strong>Policy Document</strong>
          <br />
          Document used to establish policies or guidelines.
        </Paragraph>
      </>
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: \`
import { AlertDialog, Button } from '@tilburg/component-library-react';

function MyComponent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <Button onClick={openDialog}>Open Dialog</Button>
      <AlertDialog
        ref={dialogRef}
        title="Example Alert Dialog"
      >
        <Paragraph>
          <strong>Agreement</strong><br />
          A formal agreement or arrangement between two or more parties.
        </Paragraph>
        <Paragraph>
          <strong>Policy Document</strong><br />
          Document used to establish policies or guidelines.
        </Paragraph>
      </AlertDialog>
    </>
  );
}\`
      }
    }
  },
  render: args => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openModal = () => {
      dialogRef.current?.showModal();
    };
    return <>
        <Button onClick={openModal}>Open Dialog</Button>
        <AlertDialog {...args} ref={dialogRef} />
      </>;
  }
}`,...(D=(b=c.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};var A,w,x;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'With Custom Footer',
  args: {
    title: 'Alert Dialog with Custom Footer',
    children: <Paragraph>This alert dialog has a custom footer with multiple buttons.</Paragraph>
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: \`
import { AlertDialog, Button } from '@tilburg/component-library-react';

function MyComponent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <Button onClick={openDialog}>Open Dialog</Button>
      <AlertDialog
        ref={dialogRef}
        title="Alert Dialog with Custom Footer"
        customFooter={
          <div className="tilburg-modal__footer">
            <Button appearance="subtle-button" onClick={closeDialog}>
              Cancel
            </Button>
            <Button appearance="primary-action-button" onClick={closeDialog}>
              Save
            </Button>
          </div>
        }
      >
        <Paragraph>
          This alert dialog has a custom footer with multiple buttons.
        </Paragraph>
      </AlertDialog>
    </>
  );
}\`
      }
    }
  },
  render: args => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openModal = () => {
      dialogRef.current?.showModal();
    };
    const closeModal = () => {
      dialogRef.current?.close();
    };
    return <>
        <Button onClick={openModal}>Open Dialog</Button>
        <AlertDialog {...args} ref={dialogRef} customFooter={<div className="tilburg-modal__footer">
              <Button appearance="subtle-button" onClick={closeModal}>
                Cancel
              </Button>
              <Button appearance="primary-action-button" onClick={closeModal}>
                Save
              </Button>
            </div>} />
      </>;
  }
}`,...(x=(w=g.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};const S=["Default","WithCustomFooter"];export{c as Default,g as WithCustomFooter,S as __namedExportsOrder,N as default};
