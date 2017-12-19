
window.Event = new class{
    constructor() {
        this.vue =new Vue();
    }
    fire(event,data = null){
        this.vue.$emit(event,data);
    }

    listen(event,callback){
        this.vue.$on(event,callback);
    }
}

//Applied Development Check
Vue.config.devtools = true;
//Model Component
let modelC = Vue.component('model',{

   template:`<div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <slot></slot>
            </div>
        </div>
        <button class="modal-close is-large" @click="$emit('close')" aria-label="close"></button>
    </div>`
});

let  tabsC = Vue.component('tabs',{
    template:`<div><div class="tabs"><ul><li v-for="tab in tabs" :class="{ 'is-active' : tab.isActive }"><a :href="tab.href" @click="selectedTab(tab)">{{ tab.name }}</a></li></ul></div><div class="tab-detail"><slot></slot></div></div>`,
    data(){
        return {
            tabs:[]
        }
    },
    created(){
        this.tabs = this.$children
    },
    methods:{
        selectedTab(selectedTab){
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name==selectedTab.name)
            } )
        }
    }
});
let  couponC = Vue.component('coupon',{
    template:'<input @blur="showCouponApplied" />',
    methods: {
        showCouponApplied() {

            Event.fire('applied');
        }
    }
});
let  tabC = Vue.component('tab',{
   template:'<div v-show="isActive"><slot></slot></div>',
    props:{
       name:true,
       selected:{default: false}
    },
    data(){
        return{
            isActive : false,

        }
    },
    computed:{
        href(){

            return '#'+this.name.toLowerCase().replace(/ /g,'-');
        }
    }

    ,
    mounted(){
        this.isActive = this.selected
    }

});

new Vue({
    el:'#root',
    data:{
        showModel:false,
        showCoupon: false
    },
    created(){
        Event.listen('applied',() => alert('Handle'))
        Event.listen('applied',() => this.showCouponApplied())
    },
    methods: {
        showCouponApplied() {

            return this.showCoupon = true;
        }
    },
    components:{
        'model':modelC,
        'tabs':tabsC,
        'tab':tabC,
        'coupon':couponC,
    }

});