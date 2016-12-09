export class NewPostController{
	constructor($scope, $http, $cookieStore, envService){
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
            var url = envService.read('apiUrl');
			$scope.posts = "";
			$scope.postError = "";
			$scope.postTema = ""; 
			$scope.postText = "";
			$scope.postId = "";
			$scope.whoSee = "sad";
		/* ------------------------------------------------------------------------------------------
		* get user
		* гетим инфомацию о нашем юзере  
		*/  
			var USER = $cookieStore.get("user");
			$scope.userName = USER.name;
			$scope.userId = USER._id;
			$scope.userAvatar = "";
		/* ------------------------------------------------------------------------------------------
		* get all users
		* гетим всех юзеров для - Получатели  
		*/
			$scope.allUsers = {};
			$http.get(url + "api/user/select/" + $scope.userId)
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
				
				if(!$scope.postText || $scope.postText == "<p><br></p>" || !$scope.postTema || !$scope.whoSee) {
					$scope.postError = "Заполните поле корректно";
				} else if($scope.selectedUers.length == 0){
					$scope.postError = "Выберите получателей";
				} else {
					$scope.postError = "";
					for(var i = 0; i < $scope.selectedUers.length; i++) {
						userIds.push($scope.selectedUers[i]._id);
					}
					$http.post(url + "api/post", {theme: $scope.postTema, text: $scope.postText, userId: $scope.userId, filter: $scope.filterVar, userName: $scope.userName, userIds: userIds})
						.success(function(result) {
							$scope.postTema = "";
							$scope.postText = "";
							$scope.selectedUers = [];
							$(".ta-bind").html("");
							console.log(result);
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
				$http.get(url + "api/user/" + userId)
					.success(function(result) {
						addUsersToSelected(result);
					})
					.error(function(result) {
						console.log(result);
					});
			}
			// выбрать всех юзеров
			$scope.addAllUsersToSelected = function(userId) {
				for(var i = 0; i < $scope.allUsers.length; i++) {
					addUsersToSelected($scope.allUsers[i]);
				}
			}
			// выбрать всех клиентов
			$scope.addAllClientsToSelected = function(userId) {
				$http.get(url + "api/client")
					.success(function(result) {
						for(var i = 0; i < result.length; i++) {
							addUsersToSelected(result[i]);
						}
					})
					.error(function(result) {
						console.log(result);
					});
			}
			// добавть выбранных юзеров, клинтов в массив
			function addUsersToSelected(result) {
				var bool = false;
				for(var i = 0; i < $scope.selectedUers.length; i++){
					if(result._id == $scope.selectedUers[i]._id) {
						bool = true;
						break;
					} 
				}
				if(!bool) $scope.selectedUers.push(result);
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
