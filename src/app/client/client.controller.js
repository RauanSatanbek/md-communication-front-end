export class ClientController{
  constructor(CheckAuthService, $http,toastr, $localStorage, $state, envService, TicketSupportService){
    'ngInject';
    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    this.TicketSupportService = TicketSupportService;
    var vm = this;
    vm.logout = CheckAuthService.logout;

    // this.starUser = TicketSupportService.starUser;
    this.selector = 'my';



    this.getClients = ()=>{
      let userId = this.$localStorage.user._id;
      $http({
        url : envService.read('apiUrl')+"api/client?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {
        console.log('getUsers response');
        console.log(response);

        vm.clients = response.data.clients;

      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };


    this.getClients();
  }


}
