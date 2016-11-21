export class ClientDetailController{
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

    this.prefixes = [
      {value: 'ТОО', label: '<span class="m-selected-span">ТОО</span>'},
      {value: 'ИП', label: '<span class="m-selected-span">ИП</span>'},
      {value: 'АО', label: '<span class="m-selected-span">АО</span>'},
      {value: 'КХ', label: '<span class="m-selected-span">КХ</span>'}
    ];
    if (this.$stateParams.id=='new'){
      this.client = {};
      this.client.statusCompany = this.prefixes[0].value;
    }

    this.getClientDetail = ()=>{
      let userId = this.$localStorage.user._id;
      let id = this.$stateParams.id;
      console.log(id);
      $http({
        url : envService.read('apiUrl')+"api/client/"+id+"/?userId="+userId,
        method : "GET"
      }).then(function successCallback(response) {

        vm.client = response.data.client;



      }, function errorCallback(response) {
        console.log('Ошибка запроса');
      });
    };


    this.saveClient = (client, id2)=>{
      let userId = this.$localStorage.user._id;
      let id = this.$stateParams.id;
      let method = ((id2 =='new')?"PUT":"POST");
      let url = (id2=='new')? "api/client/?userId="+userId:"api/client/"+id+"/?userId="+userId;


      $http({
        url : envService.read('apiUrl')+url,
        method : method,
        data : {
          name : client.name,
          idToEnter : client.idToEnter,
          telephone : client.telephone,
          email : client.email,
          statusCompany : client.statusCompany,
          nameCompany : client.nameCompany,
          representative : client.representative
        }
      }).then(function successCallback(response) {

        $state.go('client');

      }, function errorCallback(response) {
        toastr.error('Ошибка сохранения', 'Ошибка!');
      });
    };

    this.getClientDetail();
  }


}
