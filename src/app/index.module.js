/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { DocumentsController } from './documents/documents.controller';
import { TicketController } from './ticket/ticket.controller';
import { TicketDetailController } from './ticketDetail/ticketDetail.controller';
import { UserController } from './user/user.controller';
import { UserDetailController } from './userDetail/userDetail.controller';
import { ClientController } from './client/client.controller';
import { ClientDetailController } from './clientDetail/clientDetail.controller';
import { SettingsController } from './settings/settings.controller';
import { CommunicationController } from './communication/communication.controller';
import { NewPostController } from './newPost/newPost.controller';
import { PostInfoController } from './postInfo/postInfo.controller';
import { CheckFavorite } from './components/checkFavorite/checkFavorite.filter';

import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { FooterDirective } from '../app/components/footer/footer.directive';
import { MenuDocumentsDirective } from '../app/components/menuDocuments/menuDocuments.directive';
import { TypeClientDirective } from '../app/components/typeClient/typeClient.directive';
import { DynamicTextArea } from '../app/components/dynamicTextArea/dynamicTextArea.directive';
// import { CommunicationDirective } from '../app/communication/communication.directive.js';

import { MenuService } from '../app/components/menuService/menuService.service';
import { CheckAuthService } from '../app/components/checkAuth/checkAuth.service';
import { TicketSupportService } from '../app/components/ticketSupport/ticketSupport.service';

angular.module('ticketMirusDesk', ["textAngular", 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource',
  'ui.router', 'ngMaterial', 'toastr', 'lfNgMdFileInput', 'ui.mask','mgcrea.ngStrap','monospaced.elastic',
  '720kb.datepicker', 'tmh.dynamicLocale', 'ngStorage', 'naif.base64', 'environment', 'base64'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('AuthController', AuthController)
  .controller('DocumentsController', DocumentsController)
  .controller('TicketController', TicketController)
  .controller('TicketDetailController', TicketDetailController)
  .controller('UserController', UserController)
  .controller('UserDetailController', UserDetailController)
  .controller('ClientController', ClientController)
  .controller('ClientDetailController', ClientDetailController)
  .controller('SettingsController', SettingsController)
  .controller('CommunicationController', CommunicationController)
  .controller('NewPostController', NewPostController)
  .controller('PostInfoController', PostInfoController)

  .directive('acmeNavbar', NavbarDirective)
  .directive('mFooter', FooterDirective)
  .directive('mMenuDocuments', MenuDocumentsDirective)
  .directive('mTypeClient', TypeClientDirective)
  .directive('dynamicTextArea', DynamicTextArea)
  // .directive('communication', CommunicationDirective)
  .filter("CheckFavorite", CheckFavorite)

  .service('MenuService', MenuService)
  .service('CheckAuthService', CheckAuthService)
  .service('TicketSupportService', TicketSupportService);

