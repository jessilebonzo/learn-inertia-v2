import '../css/app.css';
import './bootstrap';
import "vue-toastification/dist/index.css";

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import Toast from 'vue-toastification';
import { notifications } from './Plugins/notifications';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const options = {
    position: "top-right",            
    timeout: 5000,                   
    closeOnClick: true,              
    pauseOnFocusLoss: true,          
    pauseOnHover: true,              
    draggable: true,                 
    draggablePercent: 0.6,           
    showCloseButtonOnHover: true,    
    hideProgressBar: true,           
    closeButton: true,            
    icon: true,              
    rtl: false,        
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(Toast, options)
            .use(notifications)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
