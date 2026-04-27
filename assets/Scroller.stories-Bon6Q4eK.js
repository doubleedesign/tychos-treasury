import{n as e}from"./chunk-zsgVPwQN.js";import{n as t,t as n}from"./Scroller-CpRlFo0c.js";function r(e=6){let t=[],n=[`I'm a gym member. I try to go four times a week, but I've missed the last twelve hundred times.`,`If you want to receive emails about my upcoming shows, please give me money so I can buy a computer.`,`I'm not great at the advice. Can I interest you in a sarcastic comment?`,`Just to be clear, comedy with the plates will not be well-received.`,`The cushions are the essence of the chair!`,`Look at me! I'm Chandler! Could I *be* wearing any more clothes?`],r=[`#eee`,`#e8ffcc`,`#e8f0ff`,`#fff0e8`];for(let i=1;i<=e;i++){let e=document.createElement(`div`);e.innerHTML=n[Math.floor(Math.random()*n.length)],e.style.setProperty(`padding`,`1rem`),e.style.setProperty(`background`,r[Math.floor(Math.random()*r.length)]),e.style.setProperty(`box-sizing`,`border-box`),e.style.setProperty(`width`,`200px`),t.push(e)}return t}var i,a,o,s,c,l;e((()=>{t(),i={title:`Atoms/Scroller`,component:n,tags:[`autodocs`],args:{showAdjacent:!0,infinite:!0},argTypes:{items:{control:{type:`object`,disable:!0},description:`The items to be scrolled. Can be an array of strings, HTMLElements, or VNodes. Alternatively, more complex content can be passed in as slot content.`,table:{type:{summary:`string[] | HTMLElement[] | VNode[]`}}},orientation:{control:{type:`select`},options:[`vertical`,`horizontal`]}},parameters:{docs:{subtitle:`A foundational component to provide core layout and functionality for scrolling content such as carousels. Keeps all content in the DOM while providing visual scrolling and methods for moving between items.`,description:{component:`Note: The consuming component must call the methods for moving between items; this component does not automatically scroll by itself.`}}}},a={tags:[`!dev`],args:{orientation:`vertical`,items:[`Mercury`,`Venus`,`Earth`,`Mars`,`Jupiter`,`Saturn`,`Uranus`,`Neptune`]}},o={tags:[`!autodocs`],args:{orientation:`vertical`,items:[`Mercury`,`Venus`,`Earth`,`Mars`,`Jupiter`,`Saturn`,`Uranus`,`Neptune`]},parameters:{controls:{exclude:[`items`,`orientation`]}}},s={tags:[`!autodocs`],args:{orientation:`vertical`,items:r()},parameters:{controls:{exclude:[`items`,`orientation`]}}},c={tags:[`!autodocs`],args:{orientation:`horizontal`,items:r()},parameters:{controls:{exclude:[`items`,`orientation`]}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    orientation: 'vertical',
    items: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  args: {
    orientation: 'vertical',
    items: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
  },
  parameters: {
    controls: {
      exclude: ['items', 'orientation']
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  args: {
    orientation: 'vertical',
    items: generateDemoNodes()
  },
  parameters: {
    controls: {
      exclude: ['items', 'orientation']
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  args: {
    orientation: 'horizontal',
    items: generateDemoNodes()
  },
  parameters: {
    controls: {
      exclude: ['items', 'orientation']
    }
  }
}`,...c.parameters?.docs?.source}}},l=[`Primary`,`Basic_Vertical_Strings`,`Basic_Vertical_Nodes`,`Basic_Horizontal_Nodes`]}))();export{c as Basic_Horizontal_Nodes,s as Basic_Vertical_Nodes,o as Basic_Vertical_Strings,a as Primary,l as __namedExportsOrder,i as default};