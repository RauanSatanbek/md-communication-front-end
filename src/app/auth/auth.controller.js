export class AuthController {
  constructor ($http, $state, $q, toastr, $localStorage, envService, $cookieStore) {
    'ngInject';

    var self = this;
    self.backGroundStyle = ()=>{
      return {
        'background-selling':$state.includes('selling'),
        'background-supply':$state.includes('supply'),
        'background-staff':$state.includes('staff'),
        'background-payments':$state.includes('payments'),
        'background-other':$state.includes('other')
      }
    };
    console.log('auth controller');

    // $http({
    //   url : envService.read('apiUrl')+"api/signup",
    //   method : "POST",
    //   data : {
    //     email : 'ticketmirusdesk@gmail.com',
    //     name : 'John Silver',
    //     password : '1',
    //     idToEnter: '25AU17',
    //     telephone: '+77017217306',
    //     role: 1
    //   }
    // }).then(function successCallback(response) {
    //
    //   console.error(response);
    //   console.log(response);
    // }, function errorCallback(response) {
    //   console.log(response);
    // });

    $localStorage.user = [];
    self.auth = ()=>{
    console.log(self.idToEnter,self.password, self.option);
      // login
      $http({
        url : envService.read('apiUrl')+"api/login",
        method : "POST",
        data : {
          idToEnter : self.idToEnter + ")" + self.option,
          password : self.password
        }
      }).then(function successCallback(response) {
        console.log(response);

        $localStorage.user = response.data;
        $cookieStore.put("user", response.data);
        console.log($localStorage.user);
        $state.go('communication');
      }, function errorCallback(response) {
        console.log(response);
        console.log('open toastr');
        toastr.error('Ошибка авторизации', 'Ошибка!');
      });
    };
    console.log(self);
    console.log('auth controller');

  }


}
