import{n as e}from"./chunk-zsgVPwQN.js";import{C as t,E as n,S as r,b as i,c as a,f as o,i as s,l as c,o as l,p as u,r as d,s as f,t as p,x as m,y as h}from"./vue.esm-bundler-DEOKI-zd.js";import{n as g,t as _}from"./Scroller-CpRlFo0c.js";import{n as v,t as y}from"./_plugin-vue_export-helper-CQdVtL_j.js";import{n as b,t as x}from"./ProjectCard-C5XEYgoU.js";function S(e,t){return h(),c(`svg`,w,[...t[0]||=[l(`path`,{d:`M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z`},null,-1)]])}var C,w,T,E=e((()=>{p(),v(),C={},w={xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`},T=y(C,[[`render`,S]]),C.__docgenInfo=Object.assign({displayName:C.name??C.__name},{displayName:`ArrowLeft`,description:``,tags:{},sourceFiles:[`/home/runner/work/tychos-treasury/tychos-treasury/src/icons/ArrowLeft.vue`]})}));function D(e,t){return h(),c(`svg`,k,[...t[0]||=[l(`path`,{d:`M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z`},null,-1)]])}var O,k,A,j=e((()=>{p(),v(),O={},k={xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`},A=y(O,[[`render`,D]]),O.__docgenInfo=Object.assign({displayName:O.name??O.__name},{displayName:`ArrowRight`,description:``,tags:{},sourceFiles:[`/home/runner/work/tychos-treasury/tychos-treasury/src/icons/ArrowRight.vue`]})})),M,N,P,F=e((()=>{E(),j(),p(),g(),M=u({components:{Scroller:_,ArrowLeft:T,ArrowRight:A},props:{colorTheme:{type:String,default:`accent`}},data(){return{items:[]}},computed:{themeColor(){return`var(--color-${this.$props.colorTheme})`}},mounted(){this.items=t().default?.()??[]},unmounted(){this.items=[]},methods:{prev(){this.$refs.scrollerRef.movePrev()},next(){this.$refs.scrollerRef.moveNext()}}}),N=()=>{d(e=>({v7e8f0a9d:e.themeColor}))},P=M.setup,M.setup=P?(e,t)=>(N(),P(e,t)):N})),I=e((()=>{}));function L(e,t,u,d,p,g){let _=m(`Scroller`),v=m(`ArrowLeft`),y=m(`ArrowRight`);return e.items.length>1?(h(),c(`div`,R,[l(`div`,z,[o(_,{ref:`scrollerRef`,"show-adjacent":!1,orientation:`horizontal`},{default:n(()=>[(h(!0),c(s,null,i(e.items,(e,t)=>(h(),c(`div`,{key:t,class:`carousel__items__node`},[(h(),f(r(e)))]))),128))]),_:1},512)]),l(`div`,B,[l(`button`,{"aria-label":`Previous item`,class:`carousel__nav__button carousel__nav__button--prev`,onClick:t[0]||=(...t)=>e.prev&&e.prev(...t)},[o(v)]),l(`button`,{"aria-label":`Next item`,class:`carousel__nav__button carousel__nav__button--next`,onClick:t[1]||=(...t)=>e.next&&e.next(...t)},[o(y)])])])):a(``,!0)}var R,z,B,V,H=e((()=>{F(),F(),p(),I(),v(),R={key:0,class:`carousel`},z={class:`carousel__items`},B={class:`carousel__nav`},V=y(M,[[`render`,L],[`__scopeId`,`data-v-43091259`]]),M.__docgenInfo=Object.assign({displayName:M.name??M.__name},{exportName:`default`,displayName:`Carousel`,description:``,tags:{},props:[{name:`colorTheme`,type:{name:`ThemeColor`},defaultValue:{func:!1,value:`'accent'`}}],sourceFiles:[`/home/runner/work/tychos-treasury/tychos-treasury/src/components/Carousel/Carousel.vue`]})})),U,W=e((()=>{U=[`primary`,`secondary`,`accent`,`light`,`dark`],[...U]})),G,K,q,J;e((()=>{H(),W(),b(),G={title:`Components/Carousel`,component:V,tags:[`autodocs`],args:{colorTheme:`accent`},argTypes:{colorTheme:{control:{type:`select`},options:U,description:`The colour theme to use for styling. Set the value of your theme colours in your global CSS.`}}},K={tags:[`!autodocs`],render:e=>({components:{Carousel:V},setup(){return{args:e}},template:`
            <Carousel v-bind="args">
                <div class="test-class-name"><p>Okay, well, who identified this restaurant's tone as "pretentious-comma-garlicky"?</p></div>
                <div><p>We might still have some money if your father hadn't thought it was a good idea to sell ice over the internet.</p></div>
                <div><p>Oh God. Can open. Worms everywhere!</p></div>
            </Carousel>
            `}),parameters:{docs:{source:{type:`code`,language:`jsx`,code:`
                <template>
                    <Carousel colorTheme="accent">
                        <ProjectCard title="Project 1" description="Description for project 1" />
                        <ProjectCard title="Project 2" description="Description for project 2" />
                        <ProjectCard title="Project 3" description="Description for project 3" />
                        <ProjectCard title="Project 4" description="Description for project 4" />
                        <ProjectCard title="Project 5" description="Description for project 5" />
                        <ProjectCard title="Project 6" description="Description for project 6" />
                    </Carousel>
                </template>
            `}}}},q={render:e=>({components:{Carousel:V,ProjectCard:x},setup(){return{args:e}},template:`
            <Carousel v-bind="args">
                <ProjectCard title="Project 1" description="Description for project 1" />
                <ProjectCard title="Project 2" description="Description for project 2" />
                <ProjectCard title="Project 3" description="Description for project 3" />
                <ProjectCard title="Project 4" description="Description for project 4" />
                <ProjectCard title="Project 5" description="Description for project 5" />
                <ProjectCard title="Project 6" description="Description for project 6" />
            </Carousel>
            `})},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  render: args => ({
    components: {
      Carousel
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <Carousel v-bind="args">
                <div class="test-class-name"><p>Okay, well, who identified this restaurant's tone as "pretentious-comma-garlicky"?</p></div>
                <div><p>We might still have some money if your father hadn't thought it was a good idea to sell ice over the internet.</p></div>
                <div><p>Oh God. Can open. Worms everywhere!</p></div>
            </Carousel>
            \`
  }),
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'jsx',
        code: \`
                <template>
                    <Carousel colorTheme="accent">
                        <ProjectCard title="Project 1" description="Description for project 1" />
                        <ProjectCard title="Project 2" description="Description for project 2" />
                        <ProjectCard title="Project 3" description="Description for project 3" />
                        <ProjectCard title="Project 4" description="Description for project 4" />
                        <ProjectCard title="Project 5" description="Description for project 5" />
                        <ProjectCard title="Project 6" description="Description for project 6" />
                    </Carousel>
                </template>
            \`
      }
    }
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Carousel,
      ProjectCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <Carousel v-bind="args">
                <ProjectCard title="Project 1" description="Description for project 1" />
                <ProjectCard title="Project 2" description="Description for project 2" />
                <ProjectCard title="Project 3" description="Description for project 3" />
                <ProjectCard title="Project 4" description="Description for project 4" />
                <ProjectCard title="Project 5" description="Description for project 5" />
                <ProjectCard title="Project 6" description="Description for project 6" />
            </Carousel>
            \`
  })
}`,...q.parameters?.docs?.source}}},J=[`Basic_HTML`,`WithComponents`]}))();export{K as Basic_HTML,q as WithComponents,J as __namedExportsOrder,G as default};