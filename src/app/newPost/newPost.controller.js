export class NewPostController{
  constructor($scope, $http, $cookieStore){
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
          $scope.whoSee = "sda";
      /* ------------------------------------------------------------------------------------------
      * get user
      * гетим инфомацию о нашем юзере  
      */  
          $scope.userName = $cookieStore.get("userName");
          $scope.userId = $cookieStore.get("userId");;
          $scope.userAvatar = $cookieStore.get("userAvatar");

	     /* ------------------------------------------------------------------------------------------
	    * get all users
	    * гетим всех юзеров для - Получатели  
	    */
	        $scope.allUsers = {};
	        $http.get($scope.url + "/api/user/select" + $scope.userId)
	            .success(function(result) {
	                $scope.allUsers = result;
	            })
	            .error(function(result) {
	                console.log(result);
	            });

	        
	           
	     /* ------------------------------------------------------------------------------------------
	      * addPost
	      * Добавляем новый пост 
	      * добавляем всем Получателям id поста
	      */
	          $scope.addPost = function() {
	              var userIds = [];
	              $scope.postText = $(".ta-bind").html();
	              console.log($scope.postTema, $scope.postText);
	              if(!$scope.postText || $scope.postText == "<p><br></p>" || !$scope.postTema || !$scope.whoSee) {
	                  $scope.postError = "Заполните поле корректно";
	              } else if($scope.selectedUers.length == 0){
	                  console.log($scope.selectedUers);
	                  $scope.postError = "Выберите получателей";
	              } else {
	                  $scope.postError = "";
	                  for(var i = 0; i < $scope.selectedUers.length; i++) {
	                      userIds.push($scope.selectedUers[i]._id);
	                  }
	                  // var obj = {tema: $scope.postTema, text: $scope.postText, userId: $scope.userId, filter: $scope.filterVar, userName: $scope.userName, userIds: userIds};
	                  $http.post($scope.url + "/api/post", {tema: $scope.postTema, text: $scope.postText, userId: $scope.userId, filter: $scope.filterVar, userName: $scope.userName, userIds: userIds})
	                      .success(function(result) {
	                          result.reverse();
	                          $(".ta-bind").html("");
	                          $scope.postTema = "";
	                          $scope.postText = "";
	                          $scope.posts = result;
	                      })
	                      .error(function(result) {
	                          console.log("Error");
	                      });
	              }
	          }
	     
	      /* ------------------------------------------------------------------------------------------
	      * Добавляем в массив selectedUers выбранные юзеры для Получатели 
	      */
	          $scope.selectedUers = [];
	          $scope.addUserToSelected = function(userId) {
	              $http.get($scope.url + "/api/user/" + userId)
	                  .success(function(result) {
	                      console.log(result);
	                      var bool = false;
	                      for(var i = 0; i < $scope.selectedUers.length; i++){
	                          if(result._id == $scope.selectedUers[i]._id) {
	                              bool = true;
	                              break;
	                          } 
	                      }
	                      if(!bool) $scope.selectedUers.push(result);
	                      console.log($scope.selectedUers);
	                  })
	                  .error(function(result) {
	                      console.log(result);
	                  });
	          }
	      /* ------------------------------------------------------------------------------------------
	      * Удаляем из массива selectedUers выбранные юзеры для Получатели 
	      */
	          $scope.deleteUser = function(userId) {
	              console.log(userId);
	              for(var i = 0; i < $scope.selectedUers.length; i++){
	                  if(userId == $scope.selectedUers[i]._id) {
	                      $scope.selectedUers.splice(i, 1)
	                      console.log($scope.selectedUers);
	                      break;
	                  } 
	              } 
	          }
  }
}
