// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'material-design-icons/iconfont/material-icons.css'
// import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#ED1A3A',
                // secondary: '#4d4848',
                secondary: '#000000',
                third: '#4d4948',
                grayBg:"#F8F8F9",
                black: "#000000",
                white: "#ffffff",
                grey: "#eee9ea"
            },
            dark:{
                primary: '#4d4848',
                secondary: '#4d4848',
                third: '#4d4948',
                grayBg:"#121212",
                black: "#ffffff",
                white: "#363636",
                grey: "#eee9ea"
            }
        },
    },
    icons: {
        iconfont: 'md' || 'fa',
    },
});

