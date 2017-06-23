'use strict';
import angular from 'angular';
import template from './hotel.html';

export class hotelComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
    this.carousel = {
      myInterval: 5000,
      noWrapSlides: true,
      active: 0
    };
  }

  getStars(num) {
    return new Array(num);
  }
}

export default angular.module('appApp.hotel', [])
  .component('hotel', {
    template,
    bindings: { hotel: '<' },
    controller: hotelComponent
  })
  .name;
