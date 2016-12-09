export class PostInfoController{
  constructor ($http, $scope, $cookieStore, envService){
    'ngInject';
        /* ------------------------------------------------------------------------------------------
        * Создаем массив месяцы
        * берем активный месяц и дату
        */
            var months = ['январья', 'февралья', 'марта', 'апрелья', 'майа', 'июнья', 'июлья', 'августа', 'сентябрья', 'октябрья', 'ноябрья', 'декабрья'];
            var date = new Date();
            var month = months[date.getMonth()];
            /* ---------------------------------------------------------------------------------------
            * date format
            * dateFormat1 = 17 ноябрья 2016
            * dateFormat2 = 14 ноябрья 2016 в 12:30:19
            */
                $scope.dateFormat1 = "dd " + month + " yyyy";
                $scope.dateFormat2 = $scope.dateFormat1 + " в " + "HH:mm:ss";
                $scope.date = Date.now();
            /* ------------------------------------------------------------------------------------------
            * создаем основные переменные
            */   
                var url = envService.read('apiUrl');
                $scope.posts = "";
                $scope.postError = "";
                $scope.postTema = ""; 
                $scope.postText = "";
                $scope.postId = $cookieStore.get("postId");
            /* ------------------------------------------------------------------------------------------
            * get user
            * гетим инфомацию о нашем юзере  
            */  
                var USER = $cookieStore.get("user");
                $scope.userName = USER.name;
                $scope.userId = USER._id;
                $scope.userAvatar = "";
            // set text and tema of post
                $scope.getPostTheme = "";
                $scope.getPostText = "";
                // $("#postText").html($scope.getPostText);
            // get comment
                $scope.comments = [];
            /* ------------------------------------------------------------------------------------------
            * addComment
            * Добавляем новый комментарий для выбранного поста
            * Возвращаем все комменты для выбранного поста
            */
                $scope.commentText = "";
                $scope.commentError = "";
                $scope.addComment = function() {
                    console.log(456);
                    var commentText = $(".addComment text-angular .ta-text .ta-bind").html();
                    if(!commentText || commentText == "введите ваше комментарий" || commentText == "<p><br></p>"){
                        $scope.commentError = "Заполните поле корректно";
                    } 
                    else if (!$scope.postId){
                        $scope.commentError = "Error post not found";
                    } else {
                        $scope.commentError = "";
                        $http.post(url + "api/comment", {userName: $scope.userName, userId: $scope.userId, postId: $scope.postId, text: commentText})
                            .success(function(result) {
                                $(".ta-bind").html("");
                                $scope.comments = result;
                            })
                            .error(function(result) {
                                console.log(result);
                            });
                    }
                }
            /* ------------------------------------------------------------------------------------------
            * get Post
            * Возвращаем выбранный пост
            */
                $scope.getPost = function(postId) {
                    $http.post(url + "api/post/" + postId)
                        .success(function(result) {
                            $scope.getPostTheme = result.theme;
                            $scope.getPostText = result.text;
                            $("#postText").html($scope.getPostText);
                            $scope.postId = result._id;
                
                        })
                        .error(function(result) {
                            console.log("error");
                        });
            /* ------------------------------------------------------------------------------------------
            * get comment
            * Возвращаем все комменты для выбранного поста
            */
                    $http.post(url + "api/comment/" + postId)
                        .success(function(result) {
                            $scope.comments = result;
                            console.log(result[0].creator[0]);
                        })
                        .error(function(result) {console.log("error");});
                }
            $scope.getPost($scope.postId);
  }
}



