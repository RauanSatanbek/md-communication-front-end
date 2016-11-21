export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      templateUrl: 'app/main/main.html'
    })
    .state('auth', {
      url: '/',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'vm',
      data: {
        'noLogin': true
      }
    })
    .state('documents', {
      url: '/documents',
      templateUrl: 'app/documents/documents.html',
      controller: 'DocumentsController',
      controllerAs: 'vm',
      parent : 'home'
    })
    .state('ticket', {
      url: '/ticket',
      templateUrl: 'app/ticket/ticket.html',
      controller: 'TicketController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('ticketDetail', {
      url: '/ticket/:id',
      templateUrl: 'app/ticketDetail/ticketDetail.html',
      controller: 'TicketDetailController',
      controllerAs: 'vm',
      parent : 'documents'
    })

    .state('user', {
      url: '/user',
      templateUrl: 'app/user/user.html',
      controller: 'UserController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('userDetail', {
      url: '/user/:id',
      templateUrl: 'app/userDetail/userDetail.html',
      controller: 'UserDetailController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('client', {
      url: '/client',
      templateUrl: 'app/client/client.html',
      controller: 'ClientController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('clientDetail', {
      url: '/client/:id',
      templateUrl: 'app/clientDetail/clientDetail.html',
      controller: 'ClientDetailController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      parent : 'documents'
    })
    .state('communication', {
      url: '/communication',
      templateUrl: 'app/communication/communication.html',
      controller: 'CommunicationController',
      controllerAs: 'vm',
      parent : 'documents'
    });

  $urlRouterProvider.otherwise('/documents/communication');
}
