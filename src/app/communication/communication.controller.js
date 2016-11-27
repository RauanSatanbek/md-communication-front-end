export class CommunicationController{
  constructor ($http, $scope, $cookieStore){
    'ngInject';

    /* ------------------------------------------------------------------------------------------
    * Создаем массив месяцы
    * берем активный месяц и дату
    */
      var months = ['январья', 'февралья', 'марта', 'апрелья', 'майа', 'июнья', 'июлья', 'августа', 'сентябрья', 'октябрья', 'ноябрья', 'декабрья'];
      var date = new Date();
      var month = months[date.getMonth()];
      /* ------------------------------------------------------------------------------------------
      * date format
      * dateFormat1 = 17 ноябрья 2016
      * dateFormat2 = 14 ноябрья 2016 в 12:30:19
      */

          $scope.dateFormat1 = "dd " + month + " yyyy";
          $scope.dateFormat2 = $scope.dateFormat1 + " в " + "HH:mm:ss";
          $scope.date = Date.now();

      /* ------------------------------------------------------------------------------------------
      * создаем массив otdel и sotrudniki для Получатели
      */
          $scope.otdel = [{name:'Accounting Department'}, {name:'Front Office'}, {name:'IT Department'}, {name:'Marketing Machine'}, {name:'Материальный стол'}, {name:'Удаленные бухгалтера'}];
          $scope.sotrudniki = [{name: ' SMM Специалист'}, {name: ' Архитектор'}, {name: ' Бухгалтер Postnet24'}, {name: ' Бухгалтер зарплатного стола'}, {name: ' Бухгалтер материального стола'}, {name: ' Бухгалтер расчетного стола'}, {name: ' Бухгалтер-стажер'}, {name: ' Бухгалтер ТОО Экипаж'}, {name: ' Директор'}, {name: ' Маркетолог-стажер'}, {name: ' Налоговый аудитор'}, {name: ' Ответственный бухгалтер'}, {name: ' Помощник HR менеджера'}, {name: ' Помощник бухгалтера материального стола'}, {name: ' Помощник бухгалтера расчетного стола'}, {name: ' Помощник главного бухгалтера'}, {name: ' Специалист по контекстной рекламе'}, {name: ' Старший программист'}];

      /* ------------------------------------------------------------------------------------------
      * создаем основные переменные
      */   
          $scope.url = "http://localhost:8082";
          $scope.posts = "";
          $scope.postError = "";
          $scope.postTema = ""; 
          $scope.postText = "";
          $scope.postId = "";
      /* ------------------------------------------------------------------------------------------
      * get user
      * гетим инфомацию о нашем юзере  
      */  
          $scope.userName = "";
          $scope.userId = "5838074c51053c185c396176";
          $scope.userAvatar = "";
          $scope.userInfoForComment = [];
          $scope.getUser = function(userId, type) {
              $http.get($scope.url + "/api/user/" + userId)
                  .success(function(result) {
                      if(parseInt(type) == 1){
                        $cookieStore.put("userName", result.name);
                        $cookieStore.put("userId", result._id);
                        $cookieStore.put("userAvatar", result.avatar);
                        $scope.userName = result.name;
                        $scope.userId = result._id;
                        $scope.userAvatar = result.avatar;
                      }
                      else {
                          $scope.userInfoForComment = result;
                      }
                  })
                  .error(function(result) {
                      console.log("error getUserName");
                  });
          }
          $scope.getUser($scope.userId, 1);
      /* ------------------------------------------------------------------------------------------
      * get Posts - Фильтрация
      * вызываем фунцию getPosts
      * getPosts - Возвращает все посты для выбранный - Мои = 1 || Общие = 2 || Все = 3- 
      */
          $scope.filterVar = 1;
          $scope.filter = function(filter) {
              var userIdFilter = $scope.userId;
              switch(filter) {
                  case "my":
                      userIdFilter += ":" + 1;
                      $scope.filterVar = 1;
                      break;
                  case "common":
                      userIdFilter += ":" + 2;
                      $scope.filterVar = 2;
                      break; 
                  case "all":
                      userIdFilter += ":" + 3;
                      $scope.filterVar = 3;
                      break;
                  case "favorite":
                      userIdFilter += ":" + 4;
                      $scope.filterVar = 4;
                      break;
              }
              $http.get($scope.url + "/api/posts/" + userIdFilter)
                  .success(function(result) {
                      result.reverse();
                      $scope.posts = result;
                      console.log(result);
                  })
                  .error(function(result) {
                      console.log(result);
                  });
          }
          $scope.filter("my");
      /* ------------------------------------------------------------------------------------------
      * selectTema
      * Устонавлеваем  cookieStore.put("postId", postId) для выбранного пост
      */
         $scope.selectTema = function(postId){$cookieStore.put("postId", postId); };


     /* ------------------------------------------------------------------------------------------
      * adToFavorite
      * Добавить посты в избранное
      */
        $scope.adToFavorite = function(postId) {
          console.log(postId);
          $http.post($scope.url + "/api/posts/addToFavourites", {postId: postId, userId: $scope.userId})
            .success(function(result) {
              var filterStr = "my";
              switch($scope.filterVar) {
                case 1:
                  filterStr = "my";
                  break;
                case 2:
                  filterStr = "common";
                  break;
                case 3:
                  filterStr = "all";
                  break;

              }
              $scope.filter(filterStr);
            })
            .error(function(error) {
              console.log(error);
            });
        };
//    app.directive("tr", function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             element.click(function(){
//                 $(".lists tr").css("backgroundColor", "#fff");
//                 $(this).css("backgroundColor", "#f5e6a3");
//             });
//             element.mouseenter(function() {
//                 if(("rgb(245, 230, 163)" != $(this).css("backgroundColor")) && ("rgb(248, 238, 192)" != $(this).css("backgroundColor"))) $(this).css("backgroundColor", "#f5f5f5");
//                 else $(this).css("backgroundColor", "#f5e6a3");
//             });
//             element.mouseleave(function() {
//                 if(("rgb(245, 230, 163)" != $(this).css("backgroundColor")) && ("rgb(248, 238, 192)" != $(this).css("backgroundColor"))) $(this).css("backgroundColor", "#fff");
//                 else $(this).css("backgroundColor", "#f8eec0");
//             });
//         }
//     }
// });


// app.directive("selectTema", function() {
//     return {
//         link: function(scope, element, attrs) {
//             element.click(function(){
//                 scope.getPost($(this).get(0).id);
//             });
//         }
//     }
// });
  }
}