export class MainService {
    constructor($http) {
        'ngInject';
        this.$http = $http;
    }
    getHotelList() {
        return this.$http.get('/api/hotels').then(response => response.data);
    }
}
