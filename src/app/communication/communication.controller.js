export class CommunicationController{
  constructor ($http, $scope){
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
                $scope.userName = "";
                $scope.userId = "582022bd000bb408b0498b0a";
                $scope.userAvatar = "";
                $scope.userInfoForComment = [];
                $scope.getUser = function(userId, type) {
                    $http.get($scope.url + "/api/user/" + userId)
                        .success(function(result) {
                            if(parseInt(type) == 1){
                                console.log(result);
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
            /* ------------------------------------------------------------------------------------------
            * get all users
            * гетим всех юзеров для - Получатели  
            */
                $scope.allUsers = {};
                $http.get($scope.url + "/api/user")
                    .success(function(result) {
                        $scope.allUsers = result;
                        for(var i = 0; i < result.length; i++) {
                            console.log(result[i]._id);
                        }
                    })
                    .error(function(result) {
                        console.log(result);
                    });

                $scope.getUser($scope.userId, 1);
            // set text and tema of post
                $scope.getPostTema = "";
                $scope.getPostText = "";
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
                    console.log($(".addComment text-angular .ta-text .ta-bind").html());
                    var commentText = $(".addComment text-angular .ta-text .ta-bind").html();
                    if(!commentText || commentText == "введите ваше комментарий" || commentText == "<p><br></p>"){
                        $scope.commentError = "Заполните поле корректно";
                    } 
                    else if (!$scope.postId){
                        $scope.commentError = "Error post not found";
                    } else {
                        $scope.commentError = "";
                        $http.post($scope.url + "/api/comment", {userName: $scope.userName, userId: $scope.userId, postId: $scope.postId, text: commentText})
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
            * get Posts - Фильтрация
            * вызываем фунцию getPosts
            * getPosts - Возвращает все посты для выбранный - Мои = 1 || Общие = 2 || Все = 3- 
            */
                $scope.filterVar = 1;
                $scope.filter = function(filter) {
                    var userIdFilter = $scope.userId;
                    switch(filter) {
                        case "my":
                            console.log("my");
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
                    }
                    $http.get($scope.url + "/api/posts/" + userIdFilter)
                        .success(function(result) {
                            result.reverse();
                            console.log(result);
                            $scope.posts = result;
                        })
                        .error(function(result) {
                            console.log(result);
                        });
                }
                $scope.filter("my");
                            console.log("my");
            /* ------------------------------------------------------------------------------------------
            * get Post
            * Возвращаем выбранный пост
            */
                $scope.getPost = function(postId) {
                    $http.post($scope.url + "/api/post/" + postId)
                        .success(function(result) {
                            console.log(result);
                            $scope.getPostTema = result.tema;
                            $scope.getPostText = result.text;
                            $scope.postId = result._id;
                            $("#postText").html(result.text);
                
                        })
                        .error(function(result) {
                            console.log("error");
                        });
            /* ------------------------------------------------------------------------------------------
            * get comment
            * Возвращаем все комменты для выбранного поста
            */
                        $http.post($scope.url + "/api/comment/" + postId)
                            .success(function(result) {
                                console.log(result);
                                $scope.comments = result;

                            })
                            .error(function(result) {console.log("error");});
                }

           /* ------------------------------------------------------------------------------------------
            * addPost
            * Добавляем новый пост 
            * добавляем всем Получателям id поста
            */
                $scope.addPost = function() {
                    console.log($(".ta-bind").html());
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
                        console.log(userIds);
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
            $scope.selectTema = function(postId){
                $scope.getPost(postId);
            }
            /* ------------------------------------------------------------------------------------------
            * Добавляем в массив selectedUers выбранные юзеры для Получатели 
            */
                $scope.selectedUers = [];
                $scope.addUserToSelected = function(userId) {
                    $http.get($scope.url + "/api/user/" + userId)
                        .success(function(result) {
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



