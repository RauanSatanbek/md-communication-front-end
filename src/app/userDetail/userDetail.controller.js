export class UserDetailController{
  constructor(CheckAuthService, $http,toastr, $localStorage, $state,
              envService, $stateParams, TicketSupportService ){
    'ngInject';
    this.$http = $http;
    this.toastr = toastr;
    this.$localStorage = $localStorage;
    this.$state = $state;
    this.$stateParams = $stateParams;
    var vm = this;
    vm.logout = CheckAuthService.logout;


    this.getUserDetail = ()=>{
      let userId = this.$localStorage.user._id;
      let id = this.$stateParams.id;
      console.log(id);
      $http({
        url : envService.read('apiUrl')+"api/user/"+id+"/?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {

        vm.user = response.data.user;

        vm.getKeyWord();


      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.getKeyWord = ()=>{
      let userId = this.$localStorage.user._id;
      let id = this.$stateParams.id;
      console.log(id);
      $http({
        url : envService.read('apiUrl')+"api/keyword/"+id+"/?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {

        vm.keywords = response.data.keywords;


      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };


    this.saveUser = (user, id2)=>{
      let userId = this.$localStorage.user._id;
      let id = this.$stateParams.id;
      console.log(id);
      let method = ((id2 =='new')?"PUT":"POST");
      let url = (id2=='new')? "api/user/?userId="+userId:"api/user/"+id+"/?userId="+userId;

      $http({
        url : envService.read('apiUrl')+url,
        method : method,
        data : {
          name : user.name,
          idToEnter : user.idToEnter,
          telephone : user.telephone,
          email : user.email
        }
      }).then(function successCallback(response) {

        $state.go('user');

      }, function errorCallback(response) {
        toastr.error('Ошибка сохранения', 'Ошибка!');
      });
    };


    this.addKeyWord = (word)=>{
      let userId = this.$localStorage.user._id;
      let id = this.$stateParams.id;

      $http({
        url : envService.read('apiUrl')+"api/keyword?userId="+userId,
        method : "PUT",
        data : {
          word  : word,
          user : id
        }
      }).then(function successCallback(response) {
        console.log(response);
        vm.keywords.push(response.data.keyword);
        vm.newWord = '';

      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.removeKeyWord = (_id)=>{
      let userId = this.$localStorage.user._id;
      let id = this.$stateParams.id;

      $http({
        url : envService.read('apiUrl')+"api/keyword/"+_id+"?userId="+userId,
        method : "DELETE"
      }).then(function successCallback(response) {
        console.log(response);


        vm.getKeyWord();

      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };

    this.getUserDetail();
  }


}
