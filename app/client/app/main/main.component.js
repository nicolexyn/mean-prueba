import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import { MainService } from './main.service';

export class MainController {
  listHotels = [];
  newHotel = '';

  /*@ngInject*/
  constructor(MainService) {
    this.MainService = MainService;
  }

  $onInit() {
    this.MainService.getHotelList()
      .then(response => {
        this.listHotels = response.data;
      });
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
