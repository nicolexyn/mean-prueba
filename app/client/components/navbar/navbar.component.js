'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Hoteles',
    state: 'main'
  }, {
    title: 'Vuelos',
    state: 'main'
  }, {
    title: 'Vuelo + Hotel',
    state: 'main'
  }, {
    title: 'Paquetes',
    state: 'main'
  }, {
    title: 'Disney',
    state: 'main'
  }, {
    title: 'Escapadas',
    state: 'main'
  }, {
    title: 'Seguros',
    state: 'main'
  }, {
    title: 'Autos',
    state: 'main'
  }, {
    title: 'Cruceros',
    state: 'main'
  }, {
    title: 'OFERTAS',
    state: 'main'
  }, {
    title: 'Más <i class="fa fa-angle-down" aria-hidden="true"></i>',
    state: 'main'
  }];
  isCollapsed = true;

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
