/**
 * Angular Material still lacks some components. This project aims to bring those missing components.
 * directive-library build:01-20-2016
 * Last update: Added support for easy notifications
**/

(function($angular) {
var directiveLibraryModule = angular.module('directivelibrary',[]); //'uiMicrokernel',

/*
_____  ___  _____ __ __  __  ____     ____   ___  _____      __ _____  ___  _____ _____ 
||_// ||=||  ||   || ||\\|| (( ___    ||=)  ||=|| ||_//     ((   ||   ||=|| ||_//  ||   
|| \\ || ||  ||   || || \||  \\_||    ||_)) || || || \\    \_))  ||   || || || \\  || 
*/
directiveLibraryModule.directive('starRating', function () {
		return {
			scope: {
				rating: '=',
				colour: '=',
				maxRating: '@',
				readOnly: '@',
				click: "&",
				mouseHover: "&",
				mouseLeave: "&"
			},
			template:
				"<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer; font-size:1.5em' ng-repeat='idx in maxRatings track by $index'> \
						<md-icon style='color:white;height:20px;width:20px;outline:0' md-svg-src='{{((hoverValue + _rating) <= $index) && \"img/directive_library/ic_star_outline_24px.svg\" || \"img/directive_library/ic_star_24px.svg\"}}'\
						ng-Click='isolatedClick($index + 1)'\
						ng-mouseenter='isolatedMouseHover($index + 1)'\
						ng-mouseleave='isolatedMouseLeave($index + 1)'></md-icon>\
				</div>",
			compile: function (element, attrs) {
				if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
					attrs.maxRating = '5';
				};
			},
			controller: function ($scope) {
				$scope.maxRatings = [];

				for (var i = 1; i <= $scope.maxRating; i++) {
					$scope.maxRatings.push({});
				};

				$scope._rating = $scope.rating;

				$scope.isolatedClick = function (param) {
					if ($scope.readOnly == 'true') return;

					$scope.rating = $scope._rating = param;
					$scope.hoverValue = 0;
					$scope.click({ param: param });
				};

				$scope.isolatedMouseHover = function (param) {
					if ($scope.readOnly == 'true') return;

					$scope._rating = 0;
					$scope.hoverValue = param;
					$scope.mouseHover({ param: param });
				};

				$scope.isolatedMouseLeave = function (param) {
					if ($scope.readOnly == 'true') return;

					$scope._rating = $scope.rating;
					$scope.hoverValue = 0;
					$scope.mouseLeave({ param: param });
				};
			}
		};
	});

	
	directiveLibraryModule.directive('starRatingTwo', function () {
		return {
			scope: {
				rating: '=',
				colour: '=',
				maxRating: '@',
				readOnly: '@',
				click: "&",
				mouseHover: "&",
				mouseLeave: "&"
			},
			template:
				"<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer; font-size:1.5em' ng-repeat='idx in maxRatings track by $index'> \
						<md-icon style='color:gold;height:40px;width:40px;outline:0' md-svg-src='{{((hoverValue + _rating) <= $index) && \"img/directive_library/ic_star_outline_24px.svg\" || \"img/directive_library/ic_star_24px.svg\"}}'\
						ng-Click='isolatedClick($index + 1)'\
						ng-mouseenter='isolatedMouseHover($index + 1)'\
						ng-mouseleave='isolatedMouseLeave($index + 1)'></md-icon>\
				</div>",
			compile: function (element, attrs) {
				if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
					attrs.maxRating = '5';
				};
			},
			controller: function ($scope) {
				$scope.maxRatings = [];

				for (var i = 1; i <= $scope.maxRating; i++) {
					$scope.maxRatings.push({});
				};

				$scope._rating = $scope.rating;

				$scope.isolatedClick = function (param) {
					if ($scope.readOnly == 'true') return;

					$scope.rating = $scope._rating = param;
					$scope.hoverValue = 0;
					$scope.click({ param: param });
				};

				$scope.isolatedMouseHover = function (param) {
					if ($scope.readOnly == 'true') return;

					$scope._rating = 0;
					$scope.hoverValue = param;
					$scope.mouseHover({ param: param });
				};

				$scope.isolatedMouseLeave = function (param) {
					if ($scope.readOnly == 'true') return;

					$scope._rating = $scope.rating;
					$scope.hoverValue = 0;
					$scope.mouseLeave({ param: param });
				};
			}
		};
	});

/*
_____  ___  _____ __ __  __  ____     ____   ___  _____    _____ __ __  __ __   __ __  __ 
||_// ||=||  ||   || ||\\|| (( ___    ||=)  ||=|| ||_//    ||==  || ||\\|| ||  ((  ||==|| 
|| \\ || ||  ||   || || \||  \\_||    ||_)) || || || \\    ||    || || \|| || \_)) ||  ||
*/	  

/*
  _                _                                   _   _                                       _             _   
 | |__   __ _  ___| | ____ _ _ __ ___  _   _ _ __   __| | | |__   __ _ _ __  _ __   ___ _ __   ___| |_ __ _ _ __| |_ 
 | '_ \ / _` |/ __| |/ / _` | '__/ _ \| | | | '_ \ / _` | | '_ \ / _` | '_ \| '_ \ / _ \ '__| / __| __/ _` | '__| __|
 | |_) | (_| | (__|   < (_| | | | (_) | |_| | | | | (_| | | |_) | (_| | | | | | | |  __/ |    \__ \ || (_| | |  | |_ 
 |_.__/ \__,_|\___|_|\_\__, |_|  \___/ \__,_|_| |_|\__,_| |_.__/ \__,_|_| |_|_| |_|\___|_|    |___/\__\__,_|_|   \__|
                       |___/                                                                                         
*/

	directiveLibraryModule.directive('mdBackgroundBanner', function() {
	  return {
		restrict: 'E',
		template: "<div id='backgound_banner' style='margin:0px; background:{{color}}; position:fixed; height:{{height}}; width:100%; z-index:0;)'></div>",
		//"<div id='prlx_lyr_1' style='position:fixed; background: url() 0px 200px;width:100%;height:800px;'></div> <div id='backgound_banner' style='margin:0px; background:; position:fixed; height:{{height}}; width:100%; z-index:-2; box-shadow:0 3px 1px -2px rgba(0,0,0,.14),0 2px 2px 0 rgba(0,0,0,.098),0 1px 5px 0 rgba(0,0,0,.084);'></div>",
		
		scope:{
			color:'@',
			height:'@'
		},
		link: function(scope,element){

			 if(!scope.color)
			 {
				scope.color = "rgb(98, 203, 143)";
			 }
			 if(!scope.height)
			 {
				scope.height = "230px";
			 }
				
			//parallax scroll effect
			/*
			function parallax(){
			 var prlx_lyr_1 = document.getElementById('prlx_lyr_1');
			 var backgound_banner = document.getElementById('backgound_banner');
			 prlx_lyr_1.style.top = -(window.pageYOffset / 10)+'px';
			 backgound_banner.style.top = -(window.pageYOffset / 25)+'px';
			}
			window.addEventListener("scroll", parallax, false);
			*/
		} //end of link
	  };
	});
	
	/*
	  _                _                                   _   _                                                  _ 
	 | |__   __ _  ___| | ____ _ _ __ ___  _   _ _ __   __| | | |__   __ _ _ __  _ __   ___ _ __    ___ _ __   __| |
	 | '_ \ / _` |/ __| |/ / _` | '__/ _ \| | | | '_ \ / _` | | '_ \ / _` | '_ \| '_ \ / _ \ '__|  / _ \ '_ \ / _` |
	 | |_) | (_| | (__|   < (_| | | | (_) | |_| | | | | (_| | | |_) | (_| | | | | | | |  __/ |    |  __/ | | | (_| |
	 |_.__/ \__,_|\___|_|\_\__, |_|  \___/ \__,_|_| |_|\__,_| |_.__/ \__,_|_| |_|_| |_|\___|_|     \___|_| |_|\__,_|
							|___/                                                                                   
	*/
	
	
	/*
	                _   _               _   _ _   _            _             _   
	  ___  ___  ___| |_(_) ___  _ __   | |_(_) |_| | ___   ___| |_ __ _ _ __| |_ 
	 / __|/ _ \/ __| __| |/ _ \| '_ \  | __| | __| |/ _ \ / __| __/ _` | '__| __|
	 \__ \  __/ (__| |_| | (_) | | | | | |_| | |_| |  __/ \__ \ || (_| | |  | |_ 
	 |___/\___|\___|\__|_|\___/|_| |_|  \__|_|\__|_|\___| |___/\__\__,_|_|   \__|
	*/
	
	directiveLibraryModule.directive('sectionTitle', function() {
	  return {
		restrict: 'E',
		template: "<div id='newdiv' layout='row' style='width: 255px; margin-top:8px; margin-left:8px;' flex layout-sm='row'><div flex='25'>	<img src={{catogeryLetter}} style='margin-top:22px;border-radius:20px'/>	</div> <div flex style='margin-top:27px;'>	<label style='font-weight:700'>{{title}}</label> </div></div>",
		scope:{
			title:'@',
			catogeryLetter:'='
		},
		link: function(scope,element){

      if (scope.title == "" || scope.title == null) {
         
        element.find('#newdiv').attr('hide-sm', '');
        //console.log("one of the pic is empty");
      }else{
        scope.catogeryLetter = "img/material alperbert/avatar_tile_"+scope.title.charAt(0).toLowerCase()+"_28.png";
         
         element.find('#newdiv').attr('new', '');
      }

			
			
			
		} //end of link
	  };
	});
	
	/*
		                _   _               _   _ _   _                       _ 
		  ___  ___  ___| |_(_) ___  _ __   | |_(_) |_| | ___    ___ _ __   __| |
		 / __|/ _ \/ __| __| |/ _ \| '_ \  | __| | __| |/ _ \  / _ \ '_ \ / _` |
		 \__ \  __/ (__| |_| | (_) | | | | | |_| | |_| |  __/ |  __/ | | | (_| |
		 |___/\___|\___|\__|_|\___/|_| |_|  \__|_|\__|_|\___|  \___|_| |_|\__,_|
                                                                        
	*/
	

	
	/*
	 ____  ____  ____  ____  _     _       _     ____    ____  _     _____  _____  ____  _        ____  _____  ____  ____  _____ 
	/ ___\/   _\/  __\/  _ \/ \   / \     / \ /\/  __\  /  _ \/ \ /\/__ __\/__ __\/  _ \/ \  /|  / ___\/__ __\/  _ \/  __\/__ __\
	|    \|  /  |  \/|| / \|| |   | |     | | |||  \/|  | | //| | ||  / \    / \  | / \|| |\ ||  |    \  / \  | / \||  \/|  / \  
	\___ ||  \_ |    /| \_/|| |_/\| |_/\  | \_/||  __/  | |_\\| \_/|  | |    | |  | \_/|| | \||  \___ |  | |  | |-|||    /  | |  
	\____/\____/\_/\_\\____/\____/\____/  \____/\_/     \____/\____/  \_/    \_/  \____/\_/  \|  \____/  \_/  \_/ \|\_/\_\  \_/  
	*/
	
	   directiveLibraryModule.directive('scrollup', function() {
	  return {
		restrict:'E',
		template:"<md-button class='md-raised' id=scrollme type='button' style='height:56px;width:56px;border-radius:56px;background-color: #3F51B5;color:white;'><div class='pull-down'></div>Go up</md-button>",
		link: function(scope,element){
			function scrollTo(o, l, c) {
				if (!(0 > c)) {
					var r = l - o.scrollTop,
						s = r / c * 10;
					setTimeout(function() {
						o.scrollTop = o.scrollTop + s, o.scrollTop !== l && scrollTo(o, l, c - 10)
					}, 10)
				}
			}

			function runScroll() {
				scrollTo(document.body, 0, 600)
			}

			function scrollTo(o, l, c) {
				if (!(0 > c)) {
					var r = l - o.scrollTop,
						s = r / c * 10;
					setTimeout(function() {
						o.scrollTop = o.scrollTop + s, o.scrollTop != l && scrollTo(o, l, c - 10)
					}, 10)
				}
			}
			var scrollme;
			scrollme = document.querySelector("#scrollme"), scrollme.addEventListener("click", runScroll, !1);
		}
	  }
	});
	
	/*
	 ____  ____  ____  ____  _     _       _     ____    ____  _     _____  _____  ____  _        _____ _      ____ 
	/ ___\/   _\/  __\/  _ \/ \   / \     / \ /\/  __\  /  _ \/ \ /\/__ __\/__ __\/  _ \/ \  /|  /  __// \  /|/  _ \
	|    \|  /  |  \/|| / \|| |   | |     | | |||  \/|  | | //| | ||  / \    / \  | / \|| |\ ||  |  \  | |\ ||| | \|
	\___ ||  \_ |    /| \_/|| |_/\| |_/\  | \_/||  __/  | |_\\| \_/|  | |    | |  | \_/|| | \||  |  /_ | | \||| |_/|
	\____/\____/\_/\_\\____/\____/\____/  \____/\_/     \____/\____/  \_/    \_/  \____/\_/  \|  \____\\_/  \|\____/
	*/
	



	directiveLibraryModule.service('uiInitilize', function(){
		this.insertIndex = function(array) {
			
			 for(var i=0; i<array.length; i++){
				  array[i].$index   = i;
			  }
			
			return array;
		};
	});
	
	directiveLibraryModule.service('notifications',['$mdToast','$mdDialog', function($mdToast,$mdDialog){

		this.toast = function(content,status, delay) {
			if(!delay)
				delay = 2000;
			 $mdToast.show({
            	template: '<md-toast class="md-toast-'+status+'">'+content+'</md-toast>',
            	hideDelay: delay,
            	position: 'bottom right'
            });
		};
		
		this.alertDialog = function(title, content){
			$mdDialog.show(
			  $mdDialog.alert()
				.parent(angular.element(document.querySelector('input[name="editForm"]')))
				.clickOutsideToClose(true)
				.title(title)
				.textContent(content)
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
			);
		}
		
		
	}]);
	
	directiveLibraryModule.directive('errSrc', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });

                attrs.$observe('ngSrc', function (value) {
                    if (!value && attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        }
    });
	
})(window.angular);