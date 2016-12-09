export class CommunicationController{
    constructor ($http, $scope, $cookieStore, envService, $localStorage){
        'ngInject';
        /* ------------------------------------------------------------------------------------------
        * Создаем массив месяцы
        * берем активный месяц и дату
        */
            console.log($cookieStore.get("user"), "------------------------------------------------");
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
            var url = envService.read('apiUrl');
            console.log(url);
            $scope.posts = "";
            $scope.postError = "";
            $scope.postTema = ""; 
            $scope.postText = "";
            $scope.postId = "";
        /* ------------------------------------------------------------------------------------------
        * get user
        * гетим инфомацию о нашем юзере  
        */  
            var USER = $cookieStore.get("user");
            $scope.userName = USER.name;
            $scope.userId = USER._id;
            $scope.userAvatar = "";
            
            $scope.userInfoForComment = [];
            $scope.getUser = function(userId, type) {
                $http.get(url + "api/user/" + userId)
                .success(function(result) {
                    if(parseInt(type) == 1){
                        $cookieStore.put("userName", result.name);
                        $cookieStore.put("userId", result._id);
                        $cookieStore.put("userAvatar", result.avatar);
                        $scope.userName = result.name;
                        $scope.userId = result._id;
                        $scope.userAvatar = result.avatar;
                    } else {
                        $scope.userInfoForComment = result;
                    }
                })
                .error(function(result) {
                    console.log("error getUserName");
                });
            }
            // $scope.getUser($scope.userId, 1);
        /* ------------------------------------------------------------------------------------------
        * get Posts - Фильтрация
        * вызываем фунцию getPosts
        * getPosts - Возвращает все посты для выбранный - Мои = 1 || Общие = 2 || Все = 3- 
        */
            $scope.filterVar = 1;
            $scope.filter = function(filter) {
                var userIdFilter = $scope.userId;
                switch(filter) {
                    // my
                    case 1:
                        userIdFilter += ":" + 1;
                        $scope.filterVar = 1;
                        break;
                    // withMe
                    case 2:
                        userIdFilter += ":" + 2;
                        $scope.filterVar = 2;
                        break; 
                    // all
                    case 3:
                        userIdFilter += ":" + 3;
                        $scope.filterVar = 3;
                        break;
                    // favorite
                    case 4:
                        userIdFilter += ":" + 4;
                        $scope.filterVar = 4;
                        break;
                }
                $http.get(url + "api/posts/" + userIdFilter)
                    .success(function(result) {
                        result.reverse();
                        $scope.posts = result;
                        console.log(result);
                    })
                    .error(function(result) {
                        console.log(result);
                    });
            }
            $scope.filter(1);
        /* ------------------------------------------------------------------------------------------
        * selectTheme
        * Устонавлеваем  cookieStore.put("postId", postId) для выбранного пост
        */
            $scope.selectTema = function(postId){$cookieStore.put("postId", postId); };

        /* ------------------------------------------------------------------------------------------
        * adToFavorite
        * Добавить посты в избранное
        */
            $scope.adToFavorite = function(postId) {
            console.log(postId);
            $http.post(url + "api/posts/addToFavourites", {postId: postId, userId: $scope.userId})
                .success(function(result) {
                    $scope.filter($scope.filterVar);
                })
                .error(function(error) {
                    console.log(error);
                });
            }
        /* ------------------------------------------------------------------------------------------
        * addToListDelete
        * Добавить посты в список удаляемых постов
        */
            var listDelete = [];
            $scope.addToListDelete = function(postId) {
                if(listDelete.includes(postId)) {
                    // listDelete.pull(postId);
                    listDelete.splice(listDelete.indexOf(postId, 1));
                } else {
                    listDelete.push(postId);
                }
                console.log(listDelete);
            }
        /* ------------------------------------------------------------------------------------------
        * deletePosts
        * Удаляем чеканные посты
        */
            $scope.deletePosts = function() {
                $http.post(url + "api/posts/delete", {listDelete: listDelete, userId: $scope.userId})
                    .success(function(result) {
                        console.log(result);
                        $scope.filter($scope.filterVar);
                    })
                    .error(function(result) {
                        console.log(result);
                    });
            }
  }
}