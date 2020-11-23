import contentWindow from '../vue/content-window.vue'
import config from './config'
import routerUtils from '@awema-pl/utilities/resources/vue/router-utils'

export function install(Vue, options) {

    // check if already installed
    if ( this.installed ) return
    this.installed = true

    // apply utils
    contentWindow.mixins = contentWindow.mixins || []
    contentWindow.mixins.push(routerUtils)

    // merge configs
    let _config = { ...config, ...options }

    // create Event Bus
    if ( ! _config.eventBus ) {
        let eventBus = new Vue({
            methods: {
                open(name) {
                    name && this.$emit(`modal::${name}:open`)
                },
                close(name) {
                    name && this.$emit(`modal::${name}:close`)
                }
            }
        })
        _config.eventBus = eventBus
        Vue.prototype.$modals = eventBus
    }

    contentWindow._config = _config

    Vue.component('content-window', contentWindow)
}


const plugin = {
    install
}


// auto install
let GlobalVue = null
let GlobalVueRouter = null

if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
    GlobalVueRouter = window.VueRouter
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
    GlobalVueRouter = global.VueRouter
}

if ( GlobalVue && GlobalVueRouter ) {
    GlobalVue.use(plugin);
}


contentWindow.install = install

export default contentWindow;
