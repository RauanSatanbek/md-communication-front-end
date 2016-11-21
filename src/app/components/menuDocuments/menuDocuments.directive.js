export function MenuDocumentsDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/menuDocuments/menuDocuments.html',
    controller: MenuDocumentsController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class MenuDocumentsController {
  constructor (MenuService, $state) {
    'ngInject';

    var self = this;
    self.$state = $state;
    self.menuObject = MenuService.menuObject;
    self.menuItems = MenuService.menuItems;
    self.state = 'ticket';

    self.setState = (state)=>{
      self.state = state;
      $state.go(state);
    }





  }
}
