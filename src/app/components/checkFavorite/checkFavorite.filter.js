export function CheckFavorite(){
    'ngInject';
    var userId = "5838074c51053c185c396176";
    return function(favorite){
        if(favorite.favorite.indexOf(favorite.userId) != -1) {
        	return "fa fa-star star fa-star-o-active";
        } else {
        	return "fa fa-star-o star";
        }
 	}
}