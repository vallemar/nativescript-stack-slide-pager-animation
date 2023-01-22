import {createApp, registerElement} from 'nativescript-vue';
import Home from './components/Home.vue';
import { ImageCacheIt } from '@triniwiz/nativescript-image-cache-it';
registerElement("Pager",() => require("@nativescript-community/ui-pager").Pager);
registerElement("PagerItem",() => require("@nativescript-community/ui-pager").PagerItem);
registerElement("ImageCacheIt",() => require("@triniwiz/nativescript-image-cache-it").ImageCacheIt);

ImageCacheIt.enableAutoMM();

createApp(Home).start();
