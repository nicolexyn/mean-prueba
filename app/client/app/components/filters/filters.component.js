'use strict';
import angular from 'angular';
import template from './filters.html';

export class filtersComponent {
  /*@ngInject*/
  constructor($filter) {
    this.$filter = $filter;
  }

  $onInit() {
    var self = this;
    this.translate = function(value) {
      return `$${self.$filter('number')(value)}`;
    };
  }

  filter(item, type) {
    if(type) {
      if(type != 'all_STAR') {
        // seteo all_star en false
        item.values[0].selected = false;

        // verifico si no hay seleccionada ninguna estrella que no sea all_stars
        let isAllFalse = true;
        item.values.map(e => {
          if(e.selected){
            isAllFalse = false;
          }
        });
        if(isAllFalse) {
          item.values[0].selected = true;
        }
      } else {
        item.values.map(e => {
          e.selected = false;
        });
        item.values[0].selected = true;
      }
    }

    // devuelvo el filtro de estrellas para filtrar en el componente padre el listado
    this.onFilter({
      $event: item
    });
  }

  cleanSearch(filter) {
    filter.filterNameHotel = '';
    this.filter(filter);
  }

  getStars(num) {
    return new Array(parseInt(num));
  }
}

export default angular.module('appApp.filters', [])
  .component('filters', {
    template,
    bindings: {
      filters: '<',
      onFilter: '&'
    },
    controller: filtersComponent
  })
  .name;
