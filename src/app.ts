import {createApp, registerElement} from 'nativescript-vue';
import Home from './components/Home.vue';

registerElement("Pager",() => require("@nativescript-community/ui-pager").Pager);
registerElement("PagerItem",() => require("@nativescript-community/ui-pager").PagerItem);

createApp(Home).start();
