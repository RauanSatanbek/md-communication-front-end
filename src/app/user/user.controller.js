export class UserController{
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



    this.getUsers = ()=>{
      let userId = this.$localStorage.user._id;
      $http({
        url : envService.read('apiUrl')+"api/user?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {
        console.log('getUsers response');
        console.log(response);

        vm.users = response.data.users;

      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };


    this.getUsers();
  }


}
