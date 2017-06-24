import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import { MainService } from './main.service';

export class MainController {
  listHotels = [];
  newHotel = '';
  objectFilter = {};
  sortingValue = '';
  sorting = '';

  /*@ngInject*/
  constructor(MainService) {
    this.MainService = MainService;
  }

  $onInit() {
    this.sortingValue = 'recommended';
    this.sorting = this.sortingValue;
    this.objectFilter = {
      price: {
        min: 0,
        max: 9999
      },
      stars: ''
    };
    
    this.MainService.getHotelList()
      .then(response => {
        this.listHotels = response.hotels;
        this.filters = response.filters;
      });

    this.customFilter = hotel => {
      return ((hotel.rate.price.per_night > this.objectFilter.price.min && hotel.rate.price.per_night < this.objectFilter.price.max) && (this.objectFilter.stars === '' || this.objectFilter.stars.indexOf(hotel.stars) > -1));
    }
  }

  // Arma el objeto con el cual se filtra el listado objectFilter {name, price_range, stars}
  filterList(event) {
    switch (event.type) {
      case 'NAME':
        this.objectFilter.name = event.filterNameHotel;
        break;
      case 'PRICE_RANGE':
        this.objectFilter.price = { min: event.minValue, max: event.maxValue };
        break;
      case 'STAR':
        if (event.values[0].selected) {
          this.objectFilter.stars = '';
        } else {
          let starsFilter = '';
          event.values.map(e => {
            if (e.selected) {
              starsFilter += e.code;
            }
          });
          this.objectFilter.stars = starsFilter;
        }
        break;
    }
  }

  applyChange() {
    let sort = this.sorting.split('-');

    if(sort[0] === 'price') {
        if(sort[1] === 'ASC'){
            this.sortingValue = 'rate.price.per_night'
        } else {
            this.sortingValue = '-rate.price.per_night'
        }
    } else {
        this.sortingValue = `${sort[1] === 'DESC' ? '-' : ''}${sort[0]}`;
    }
  }
}

export default angular.module('appApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .service('MainService', MainService)
  .name;
