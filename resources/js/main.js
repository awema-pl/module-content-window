import contentWindow from '../vue/content-window.vue'
import config from './config'

const STACK = '__awema_plugins_stack__'

const awemaPlugin = {

    install() {

        let _config = Object.assign({}, config, {
            eventBus: {
                $on: AWEMA.on,
                $off: AWEMA.off,
                $emit: AWEMA.emit
            },
            ...AWEMA_CONFIG.contentWindow
        })

        contentWindow._config = _config

        Vue.component('content-window', contentWindow)

        AWEMA._watchedNames.push('content-window')
    }
}

if ('AWEMA' in window) {
    AWEMA.use(awemaPlugin)
} else {
    window[STACK] = window[STACK] || []
    window[STACK].push(awemaPlugin)
}
