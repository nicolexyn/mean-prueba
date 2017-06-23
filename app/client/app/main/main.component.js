import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import { MainService } from './main.service';

export class MainController {
  listHotels = [];
  newHotel = '';
  objectFilter = {};

  /*@ngInject*/
  constructor(MainService) {
    this.MainService = MainService;
    this.objectFilter = {
      price: {
        min: 0,
        max: 9999
      },
      stars: ''
    };
  }

  $onInit() {
    this.MainService.getHotelList()
      .then(response => {
        this.listHotels = response.hotels;
        this.filters = response.filters;

        this.fixFilters();
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
      if(event.values[0].selected) {
        this.objectFilter.stars = '';
      } else {
        let starsFilter = '';
        event.values.map(e => {
          if(e.selected) {
            starsFilter += e.code;
          }
        });
        this.objectFilter.stars = starsFilter;
      }
      break;
    }
  }

  /* Fix del mock de filtros obtenido de produccion (EVITAR VER ESTE CODIGO) */
  fixFilters() {
    let countStars = [0, 0, 0, 0, 0, 0];
    let minPrice = this.listHotels[0].rate.price.per_night;
    let maxPrice = this.listHotels[0].rate.price.per_night;

    this.listHotels.map(e => {
      if(e.stars != 'all_STAR')
        countStars[e.stars] = (countStars[e.stars] + 1) || 0;
      if(e.rate.price.per_night < minPrice)
        minPrice = e.rate.price.per_night;
      if(e.rate.price.per_night > maxPrice)
        maxPrice = e.rate.price.per_night;
    });

    this.filters[1].from = minPrice;
    this.filters[1].to = maxPrice;

    this.filters[2].values[5].count = countStars[1];
    this.filters[2].values[4].count = countStars[2];
    this.filters[2].values[3].count = countStars[3];
    this.filters[2].values[2].count = countStars[4];
    this.filters[2].values[1].count = countStars[5];
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
