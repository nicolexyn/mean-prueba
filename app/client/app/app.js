'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngAnimate from 'angular-animate';
import 'angular-ui-carousel/dist/ui-carousel.min';
import 'angularjs-slider/dist/rzslider.min';
import 'angular-i18n/angular-locale_es-ar';

import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import hotel from './components/hotel/hotel.component';
import filters from './components/filters/filters.component';

import './app.less';

angular.module('appApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, ngAnimate, navbar, footer,
  main, constants, util, hotel, filters, 'ui.carousel', 'rzModule'
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['appApp'], {
      strictDi: true
    });
  });
