import modalWindow from '../vue/modal-window.vue'
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
            ...AWEMA_CONFIG.modalWindow
        })

        modalWindow._config = _config

        Vue.component('modal-window', modalWindow)

        AWEMA._watchedNames.push('modal-window')
    }
}

if ('AWEMA' in window) {
    AWEMA.use(awemaPlugin)
} else {
    window[STACK] = window[STACK] || []
    window[STACK].push(awemaPlugin)
}
