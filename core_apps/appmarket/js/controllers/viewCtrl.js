var mainApp = angular.module('mainApp', ['ngMaterial', 'ngMessages', 'directivelibrary', 'ngMdIcons', 'ui.router', 'ngAnimate', 'angular.filter', 'uiMicrokernel', 'cloudcharge']);

angular.module('mainApp').run(["$templateCache", function ($templateCache) {

    $templateCache.put("product.html", "	<!--CARD CONTAINER START-->\r\n	<div class=\"card-container selected_product_card\" style=\"padding-top:120px;padding-bottom:20px;padding-left:10px;padding-right:10px\" ng-init=\"initialize(selectedProduct)\">\r\n		<!--WHITEFRAME START-->\r\n		<md-whiteframe class=\"md-whiteframe-4dp\" layout layout-align=\"center center\" style=\"border-radius: 4px;width:960px;margin:0 auto\"> \r\n\r\n			<!--FORM START-->\r\n			<form name=\"editForm\" style=\"width:100%;\">\r\n				<md-content flex style=\"border-radius: 4px;\">\r\n					\r\n					<div layout=\"row\" layout-align=\"space-between center\" layout-margin style=\"background-color:#00acc4;padding: 8px;margin:0px\" >\r\n						<div layout=\"row\" layout-align=\"start start\" style=\"margin:0px\">\r\n							<img id=\"userProfilePic\" src=\"/apis/marketplace/getIcon/{{selectedProduct.appKey}}\"  err-src=\"img/standard.png\" style=\" border-radius: 100px; height:56px;width:56px;\" hide-xs>\r\n							<div layout=\"column\" layout-align=\"start start\" style=\"margin-left:10px\">\r\n								<h2 style=\"font-size:25px;font-weight:300;margin:0px;color:white\">{{selectedProduct.name}}</h2>\r\n								<div layout=\"row\">\r\n    								<div star-rating rating=\"selectedProduct.rating\" colour=\"white\" style=\"margin-top: -3px;\"\r\n    									read-only=\"true\" max-rating=\"5\">\r\n    								</div>\r\n    								<span style=\"font-size:12px;color:white;margin-top: 7px;margin-left: 7px\" hide-xs>({{allRatings.length}} review<span ng-if=\"allRatings.length > 1\">s</span>)</span>\r\n								</div>\r\n							</div>\r\n						</div>\r\n		\r\n						<div layout=\"row\" layout-align=\"end end\">\r\n							<md-button class=\"md-raised\" style=\"background:#696969;font-size:14px;color:white;margin-right:20px !important;\" ng-click=\"download(selectedProduct,$event)\" ng-if=\"buttonText != \'Uninstall\'\">{{buttonText}}</md-button>\r\n							<md-button class=\"md-raised\" style=\"background:rgb(193, 58, 49);font-size:14px;color:white;margin-right:20px !important;\" ng-click=\"uninstall(selectedProduct,$event)\" ng-if=\"buttonText == \'Uninstall\'\">{{buttonText}}</md-button>\r\n								<md-button type=\"button\" class=\"md-icon-button\" aria-label=\"back\" ng-click=\"back()\">\r\n									<ng-md-icon icon=\"close\" style=\"fill:white;\" size=\"24px\"></ng-md-icon>\r\n								</md-button>\r\n							\r\n						</div>\r\n					</div>\r\n					\r\n\r\n\r\n					<md-tabs  id=\"selectedTabs\" md-dynamic-height md-border-bottom>\r\n						<md-tab label=\"overview\">\r\n						\r\n							<div layout-gt-sm=\"row\" style=\"padding:15px;\">\r\n								\r\n									<center class=\"md-block\" flex-gt-sm=\"60\" style=\"height:300px\" ng-if=\"selectedProduct.images.length != 0\">\r\n										<ul class=\"bxslider\" style=\"height:260px\">\r\n										  <li ng-repeat=\"image in selectedProduct.images\"><img  src=\"{{image}}\" /></li>\r\n										</ul>\r\n									</center>	\r\n					\r\n									\r\n								\r\n								<div layout=\"column\" layout-align=\"end end\" flex style=\"padding-left: 17px;\">\r\n									<md-card style=\"background:#607D8B;overflow-y:auto;height:212px;width:100%;z-index:1\">	\r\n										<md-card-content>\r\n										    <p style=\"color:white;\"><span style=\"font-weight: 700;\">Catogery: </span><span style=\"font-size:15px\">{{selectedProduct.catogery}}</span></p>\r\n										    <p style=\"color:white;\"><span style=\"font-weight: 700;\">Developer: </span><span style=\"font-size:15px\">{{selectedProduct.developer}}</span></p>\r\n										    <hr style=\" border: 0;height: 1px;background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.75), rgba(0, 0, 0, 0));\"/>\r\n											<p style=\"color:white;\">{{selectedProduct.description}}</p>\r\n										</md-card-content>\r\n									</md-card>\r\n									<md-card style=\"background:#607D8B;overflow-y:auto;height:44px;width:100%\">	\r\n										<md-card-content layout=\"row\" layout-align=\"space-between center\">\r\n											<p style=\"color:white;margin-top:3px\" ng-if=\"selectedProduct.discount != \'0\'\"></p>\r\n											<h1 class=\"md-title\" style=\"margin:0\"><span style=\"color:white\">{{selectedProduct.price | currency}}</span></h1>\r\n										</md-card-content>\r\n									</md-card>\r\n						\r\n								</div>\r\n							</div>\r\n								\r\n						\r\n						</md-tab>\r\n						<md-tab label=\"reviews\">\r\n						\r\n							<div layout-gt-sm=\"row\" style=\"padding:15px;\">\r\n\r\n								<md-list class=\"md-block\" flex-gt-sm=\"65\" style=\"border:1px solid #E9E9E9;border-radius:3px;height:290px;overflow-y:scroll\">\r\n								  <md-list-item class=\"md-3-line\" ng-repeat=\"comment in allRatings\" style=\"margin-left:10px;\">\r\n									<img ng-src=\"{{comment.imageurl}}\" err-src=\"img/contacts.png\" class=\"md-avatar\" />\r\n									<div class=\"md-list-item-text\" layout=\"column\" style=\"border-bottom: 1px solid #ececec;\">\r\n									<div layout=\"row\" layout-align=\"start start\"> <p style=\"font-size:12px\"><b>{{comment.name}}</b></p><p ng-if=\"comment.date\" style=\"margin-left:10px;font-size:12px\" hide-xs>(Posted: {{comment.date}})</p></div>\r\n									<div layout=\"row\" layout-align=\"start start\"><h3 style=\"font-size:18px\">{{comment.title}}</h3><p style=\"margin-left:10px;\" hide-xs>{{comment.stars}} stars</p></div>\r\n									  \r\n									  \r\n									  <p style=\"margin-top:6px;\">{{comment.description}}</p>\r\n									</div>\r\n									<md-button class=\"md-icon-button launch\" ng-click=\"deleteComment($event,comment)\" style=\"margin-top: 10px !important\" aria-label=\"delete\" ng-if=\"comment.userid == authObject.UserID\">\r\n										<ng-md-icon icon=\"close\" size=\"18px\" style=\"fill:#6A6A6A\"></ng-md-icon>\r\n									</md-button>\r\n									\r\n								  </md-list-item>\r\n								  <div layout=\"column\" layout-align=\"center center\" ng-if=\"allRatings.length < 1\">\r\n									  <h1 style=\"color:#BEBEBE;padding-top:50px\">There are no comments!</h1>\r\n									  <h4 style=\"color:#BEBEBE;\">Be the first to comment...</h4>\r\n								  </div>\r\n								</md-list>\r\n					\r\n									\r\n								\r\n								<div layout=\"column\" layout-align=\"end end\" flex style=\"padding-left:15px\" ng-if=\"myRating.title\">\r\n									<div layout=\"row\">\r\n										<span style=\"padding-bottom: 5px;margin-top: 10px;\">Edit Your Rating</span>\r\n										<md-button class=\"md-icon-button launch\" aria-label=\"edit\" ng-click=\"editRating(myRating,selectedProduct,$event)\">\r\n											<ng-md-icon icon=\"mode_edit\" style=\"margin-top: 18px;margin-right: 18px;fill:#B4B4B4\" size=\"20px\"></ng-md-icon>\r\n										</md-button>\r\n									</div>\r\n									<div star-rating-two rating=\"myRating.stars\" colour=\"white\" style=\"margin-top: -3px;margin-bottom:3px\"\r\n										read-only=\"true\" max-rating=\"5\" mouse-hover=\"mouseHover1(param)\" mouse-leave=\"mouseLeave1(param)\">\r\n									</div>\r\n									<md-icon style=\'color:gold;height:40px;width:40px;outline:0;display:none\' md-svg-src=\'img/directive_library/ic_star_24px.svg\'></md-icon>\r\n									<input ng-model=\"myRating.title\" placeholder=\"Title\" ng-disabled=\"true\" style=\"border:1px solid #CDCDCD;border-radius:3px;width:100%;outline: 0;resize: none;padding:3px;box-sizing: border-box;\"/><br/>\r\n									<textarea ng-model=\"myRating.description\" placeholder=\"What are your thoughts?\" ng-disabled=\"true\" type=\"text\" style=\"border:1px solid #CDCDCD;border-radius:3px; height:150px;width:100%;outline: 0;resize: none;padding:15px;box-sizing: border-box;\"></textarea>\r\n								</div>\r\n								\r\n								<div layout=\"column\" layout-align=\"end end\" flex style=\"padding-left:15px\" ng-if=\"!myRating.title\">\r\n									<div layout=\"row\">\r\n										<span style=\"padding-bottom: 5px;margin-top: 10px;\">Add a review</span>\r\n										<md-button class=\"md-icon-button launch\" aria-label=\"edit\" ng-click=\"editRating(myRating,selectedProduct,$event)\">\r\n											<ng-md-icon icon=\"mode_edit\" style=\"margin-top: 18px;margin-right: 18px;fill:#B4B4B4\" size=\"20px\"></ng-md-icon>\r\n										</md-button>\r\n									</div>\r\n									<div star-rating-two rating=\"myRating.stars\" colour=\"white\" style=\"margin-top: -3px;margin-bottom:3px\"\r\n										read-only=\"false\" max-rating=\"5\" click=\"rateApp(param,selectedProduct,$event)\" mouse-hover=\"mouseHover1(param)\" mouse-leave=\"mouseLeave1(param)\">\r\n									</div>\r\n									<md-icon style=\'color:gold;height:40px;width:40px;outline:0;display:none\' md-svg-src=\'img/directive_library/ic_star_24px.svg\'></md-icon>\r\n								</div>\r\n								\r\n								\r\n							</div>\r\n							\r\n						</md-tab>\r\n					</md-tabs>\r\n\r\n				</md-content>\r\n			</form>\r\n			\r\n		</md-whiteframe><br><br>\r\n		<!--WHITEFRAME END-->\r\n	</div>\r\n	<!--CARD CONTAINER END-->\r\n");

    $templateCache.put("market.html", " <md-whiteframe id=\"market_header\" class=\"md-whiteframe-2dp\" layout=\"column\" style=\"background:white;margin:0 auto;position:fixed;z-index:5;\">\r\n			\r\n			<div layout=\"row\" layout-align=\"space-between start\">\r\n    			<ul class=\"nav\" hide-xs>\r\n    				  <li class=\"drop\" style=\"z-index:3\">CATEGORIES <img src=\"img/down.png\"/>\r\n    					<ul style=\"background:white;padding-left: 0;\">\r\n    				    	<md-content style=\"opacity:.95;padding:10px\">\r\n    							<div layout=\"row\" layout-align=\"start start\" ng-repeat=\"rows in categories\">\r\n    								<div layout=\"column\" layout-align=\"center center\" class=\"icons-menu-items\" ng-repeat=\"item in rows\" ng-click=\"openCategory(item)\">\r\n    									<ng-md-icon icon=\"{{::item.imageUrl}}\" style=\"fill:#448AFF;\" size=\"48px\"></ng-md-icon>\r\n    									<center style=\"font-weight:300\">{{::item.name}}</center>\r\n    								</div>\r\n    							</div>\r\n    						</md-content>\r\n    					</ul>\r\n    				  </li>\r\n    				  <li ng-click=\"change_ref(\'market.home\',\'main\')\"><a>HOME</a></li>\r\n    				  <li ng-click=\"goTotopRated()\">TOP RATED</li>\r\n    				  <!--li ng-click=\"goTonewReleases()\">NEW RELEASES</li-->\r\n    				  \r\n    			</ul>\r\n    			<md-button class=\"md-icon-button\" ng-click=\"toggleLeft()\" aria-label=\"Close\" style=\"margin-right: 15px !important\" hide-xl hide-gt-lg hide-lg hide-gt-md hide-md hide-gt-sm>\r\n        			<ng-md-icon icon=\"menu\" style=\"fill:grey;\" size=\"32px\"></ng-md-icon>\r\n        		 </md-button>\r\n    			 <div layout=\"row\">\r\n    			     <md-button class=\"md-icon-button\" ng-click=\"openSearchContainer($event)\" aria-label=\"Close\" style=\"margin-right: 15px !important\">\r\n            			<ng-md-icon icon=\"search\" style=\"fill:grey;\" size=\"32px\"></ng-md-icon>\r\n            		  </md-button>\r\n    			  </div>\r\n			</div>\r\n		\r\n			<div layout=\"row\" layout-align=\"start start\">\r\n			<md-content class=\"tab_content\" style=\"background-color:transparent; border-top: 0;width:400px; padding-left: 40px;\">\r\n			  <md-tabs id=\"selectedTabs\" md-stretch-tabs md-selected=\"selectedIndex\" ng-click=\"changeTab(selectedIndex)\">\r\n				 <md-tab label=\"All\"></md-tab> \r\n				 <md-tab label=\"Paid\"></md-tab> \r\n				 <md-tab label=\"Free\"></md-tab> \r\n			  </md-tabs>\r\n		   </md-content>\r\n		   </div>\r\n\r\n</md-whiteframe> \r\n\r\n\r\n<div ui-view></div>");

    $templateCache.put("home.html", "<div style=\"padding-top:120px;width:100%;padding-bottom:60px;\">\r\n    <center id=\"inline\" style=\"background;max-width:960px;margin:0 auto\">\r\n    	\r\n    \r\n    	<li ng-repeat=\"product in allApps | filter:{Paid:paidOrFree||undefined} | filter:searchText||undefined\" class=\"my-animation\"> \r\n    	\r\n			<md-card style=\"width:200px;\" id=\"cardApp\" class=\"tint showbox scale\" ng-click=\"viewProduct(product)\" hide-sm hide-xs>\r\n				<img src=\"/apis/marketplace/getIcon/{{product.appKey}}\" err-src=\"img/standard.png\" style=\"min-width:128px;height:144px; width: 144px;margin: 0 auto;\"  alt=\"Washed Out\"/>\r\n				<md-divider></md-divider>\r\n				<md-card-content style=\"padding:0px;padding-left:5px !important;background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABGCAMAAAC+PCsEAAAAz1BMVEUtP1H///8ArMQPh50mUGIpRlksQFL6/v6v5e0etssGrsYCp78EoLcVeI0baX0hW24rQ1b9/v/s+fvj9vnJ7fO/6vCI2ORey9pEwtQMsMcAq8MBqcEDpLwMj6UTfpQXc4gZboIfX3MnTF7x+/zb9PfW8vah4emT3OZ81eF41OBu0N5pz91UyNhPxtc6v9I1vtEVs8kSssgGnbQHmrEJlq0KlKsLkagRg5kdZHkjVmn1/P30+/zO7/S36O6k4eqZ3ueX3edkzdssus4qus4ouc0LxBxtAAABoUlEQVRo3tXaR1YCURRFUd4vCkqQElFAcjJiQInmPP8x2fLVbbtscN4Mduuus/7PbcX1wu992B8vtw03bjukjoYM3LFjaMjcIedoyF7wO0ZDNu64MTKkWnbIGxqSuqM0QUPWDrkyMiQf/BI0pOKO2yIZUth1yNTIEBmRZzQkcsenkSFxNiINNCQNfgdoyModR0aGyIi8oiHZiLQeyRAZkaaRIaPgV0dDoqxx98mQuCONS4YMpXHRkKU0LhkiI/KOhvSzxq2RIYWuNC4ZIiOSoCGRNC4ZIiMyNTJERuQQDVm448vIkIfg10BD+tK4ZEi1K41LhtwHv1M0pJc17hMZMm5L45IhA2lcNGQhjUuGyIhcGBkiI3JChsiIzIwMkRE5Q0N60rhkiIzItZEhMiIJGjJ3x12RDJHnz0sjQzbSuGSI/KH5NjIklcZFQ9bSuGRIPkjjkiEVaVwyRJ4/WxMyREakaWRIlEFeyJC4LI1LhqTauGTIShqXDJERmRkZUpHGJUNkREo1MmQUpHHJEBmRhAyJO9K4ZMhQG5cMWWrj/vf9AK2rKmkoiQdhAAAAAElFTkSuQmCC\') no-repeat right top\">\r\n					<!--div ng-if=\"product.name.length <= 16\" style=\"position:absolute;height:55px;width:10px;background:#00acc4;-ms-transform: skewX(-20deg);-webkit-transform: skewX(-20deg); transform: skewX(-20deg);left: 120px;\"></div>\r\n					<div ng-if=\"product.name.length > 16\" style=\"position:absolute;height:67px;width:10px;background:#00acc4;-ms-transform: skewX(-20deg);-webkit-transform: skewX(-20deg); transform: skewX(-20deg);left: 120px;\"></div-->\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between start\" style=\"margin:0\">\r\n					<h2 class=\"md-title\" style=\"margin:0;margin-top:3px;font-size:16px;color:white; text-align: left;\">{{product.name}}</h2>\r\n					<div style=\"padding-left:22px;\"><div style=\"background:#00acc4;font-size: 14px;border: 1px solid #ececec;padding-left: 5px;padding-right: 5PX;padding-top: 2px;padding-bottom: 2px;margin-right:5px;margin-top:6px;color:white\"><span ng-if=\"product.price == 0\">Get!</span><span ng-if=\"product.price != 0\">Buy!</span></div></div>\r\n					</div>\r\n	\r\n					\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between center\" style=\"margin:0\">\r\n					\r\n					<div star-rating rating=\"product.rating\" colour=\"white\" style=\"margin-top: -3px;\"\r\n						read-only=\"true\" max-rating=\"5\">\r\n					</div>\r\n					<text style=\"color:black;font-weight:700;font-size:15px;margin-top: 8px;margin-right:5px;\">\r\n						<div ng-if=\"product.price > 0\">$ {{product.price}}</div>\r\n						<div ng-if=\"product.price == 0 || isNumber(product.price) == false\">Free</div>\r\n					</text>\r\n					</div>\r\n				</md-card-content>\r\n				\r\n			</md-card>\r\n			\r\n			<md-card style=\"width:145px;\" id=\"cardApp\" class=\"tint showbox scale\" ng-click=\"viewProduct(product)\" hide-xl hide-gt-lg hide-lg hide-gt-md hide-md hide-gt-sm>\r\n				<img src=\"/apis/marketplace/getIcon/{{product.appKey}}\" err-src=\"img/standard.png\" style=\"width:100px;height:100px;margin: 0 auto;\"  alt=\"Washed Out\"/>\r\n				<md-divider></md-divider>\r\n				<md-card-content style=\"padding:0px;padding-left:5px !important;background:#2d3f51;\">\r\n\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between start\" style=\"margin:0\">\r\n					<h2 class=\"md-title\" style=\"margin:0;margin-top:5px;font-size:12px;color:white; text-align: left;\">{{product.name}}</h2>\r\n					<div style=\"padding-left:22px;\"><div style=\"background:#00acc4;font-size: 12px;border: 1px solid #ececec;padding-left: 5px;padding-right: 5PX;padding-top: 2px;padding-bottom: 2px;margin-right:5px;margin-top:6px;color:white\"><span ng-if=\"product.price == 0\">Get!</span><span ng-if=\"product.price != 0\">Buy!</span></div></div>\r\n					</div>\r\n	\r\n					\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"end center\" style=\"margin:0;padding-bottom: 4px\">\r\n					<text style=\"color:white;font-weight:700;font-size:12px;margin-top: 8px;margin-right:5px;\">\r\n						<div ng-if=\"product.price != 0\"><span ng-if=\"product.price!=\'Free\'\">Rs. </span>{{product.price}}</div>\r\n						<div ng-if=\"product.price == 0\">Free</div>\r\n					</text>\r\n					</div>\r\n				</md-card-content>\r\n				\r\n			</md-card>\r\n		</li> \r\n    		\r\n    \r\n    \r\n    </center>\r\n    <div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\" style=\"padding-top:25%;\" ng-show=\"showProgress==true;\">\r\n        <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"96\"></md-progress-circular>\r\n     </div>\r\n     <div layout=\"row\" layout-align=\"center center\" ng-if=\"allApps.length == 0\">\r\n        <h2>This Page is empty</h2>\r\n    </div>\r\n</div>\r\n\r\n\r\n<ng-md-icon icon=\"home\" style=\"margin-top: 18px;margin-right: 18px;fill:#D1D1D1;bottom:20px;right:20px;height:200px;width:200px;position:fixed;z-index:-1\" size=\"200px\"></ng-md-icon>");

    $templateCache.put("search.html", "<md-dialog aria-label=\"Search\" ng-cloak style=\"box-shadow:0 7px 8px -4px rgba(0,0,0,0),0 13px 19px 2px rgba(0,0,0,0),0 5px 24px 4px rgba(0,0,0,.0) !important; background: transparent;max-height:100%;max-width:100%;height:100%;width:100%\" ng-init=\"linearProgressShow = false\">\r\n    <div ng-show=\"linearProgressShow==true\">\r\n     <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\r\n     </div>\r\n\r\n  <md-toolbar class=\"modal-header\" style=\"background:transparent;position:fixed;top:0px;\">\r\n    <div class=\"md-toolbar-tools\">\r\n      <h2></h2>\r\n      <span flex></span>\r\n	  <div>\r\n		  <md-button class=\"md-icon-button\" ng-click=\"goUp()\" aria-label=\"Close\" style=\"margin-right: 15px !important\">\r\n			<ng-md-icon icon=\"search\" style=\"fill:white;\" size=\"32px\"></ng-md-icon>\r\n		  </md-button>\r\n\r\n		  <md-button class=\"md-icon-button\" ng-click=\"cancel()\" aria-label=\"Close\" style=\"margin-right: 15px !important\">\r\n			<ng-md-icon icon=\"close\" style=\"fill:white;\" size=\"32px\"></ng-md-icon>\r\n		  </md-button>\r\n	  </div>\r\n\r\n    </div>\r\n  </md-toolbar>\r\n  \r\n<div id=\"searchContainer\" style=\"padding-top:120px;width:100%;padding-bottom:60px;overflow-y:scroll\">\r\n	<center id=\"inline\" style=\"background;max-width:960px;margin:0 auto\">\r\n		 \r\n		<div layout=\"column\">\r\n			<label style=\"color:white;font-size: 24px;line-height: 1.6em;\" for=\"serach\">Just type and press \'enter\'</label>\r\n			<input id=\"serach\" class=\"searchInput\" autofocus type=\"text\" ng-model=\"searchKeyword\" ng-keypress=\"($event.which === 13)?searchApps(searchKeyword):0\" />\r\n		</div>\r\n		\r\n    	<li ng-repeat=\"product in allApps\" class=\"my-animation\"> \r\n    			<md-card style=\"width:200px;\" id=\"cardApp\" class=\"tint showbox scale\" ng-click=\"viewProduct(product)\" hide-sm hide-xs>\r\n    				<img src=\"/apis/marketplace/getIcon/{{product.appKey}}\" err-src=\"img/standard.png\" style=\"border-radius:100px;height:144px; width: 144px;margin: 0 auto;\"  alt=\"Washed Out\"/>\r\n    				<md-divider></md-divider>\r\n    				<md-card-content style=\"padding:0px;padding-left:5px !important;background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABGCAMAAAC+PCsEAAAAz1BMVEUtP1H///8ArMQPh50mUGIpRlksQFL6/v6v5e0etssGrsYCp78EoLcVeI0baX0hW24rQ1b9/v/s+fvj9vnJ7fO/6vCI2ORey9pEwtQMsMcAq8MBqcEDpLwMj6UTfpQXc4gZboIfX3MnTF7x+/zb9PfW8vah4emT3OZ81eF41OBu0N5pz91UyNhPxtc6v9I1vtEVs8kSssgGnbQHmrEJlq0KlKsLkagRg5kdZHkjVmn1/P30+/zO7/S36O6k4eqZ3ueX3edkzdssus4qus4ouc0LxBxtAAABoUlEQVRo3tXaR1YCURRFUd4vCkqQElFAcjJiQInmPP8x2fLVbbtscN4Mduuus/7PbcX1wu992B8vtw03bjukjoYM3LFjaMjcIedoyF7wO0ZDNu64MTKkWnbIGxqSuqM0QUPWDrkyMiQf/BI0pOKO2yIZUth1yNTIEBmRZzQkcsenkSFxNiINNCQNfgdoyModR0aGyIi8oiHZiLQeyRAZkaaRIaPgV0dDoqxx98mQuCONS4YMpXHRkKU0LhkiI/KOhvSzxq2RIYWuNC4ZIiOSoCGRNC4ZIiMyNTJERuQQDVm448vIkIfg10BD+tK4ZEi1K41LhtwHv1M0pJc17hMZMm5L45IhA2lcNGQhjUuGyIhcGBkiI3JChsiIzIwMkRE5Q0N60rhkiIzItZEhMiIJGjJ3x12RDJHnz0sjQzbSuGSI/KH5NjIklcZFQ9bSuGRIPkjjkiEVaVwyRJ4/WxMyREakaWRIlEFeyJC4LI1LhqTauGTIShqXDJERmRkZUpHGJUNkREo1MmQUpHHJEBmRhAyJO9K4ZMhQG5cMWWrj/vf9AK2rKmkoiQdhAAAAAElFTkSuQmCC\') no-repeat right top\">\r\n					    <div layout=\"row\" layout-align=\"space-between start\" style=\"margin:0\">\r\n        					<h2 class=\"md-title\" style=\"margin:0;margin-top:3px;font-size:16px;color:white; text-align: left;\">{{product.name}}</h2>\r\n        					<div style=\"padding-left:22px;\"><div style=\"background:#00acc4;font-size: 14px;border: 1px solid #ececec;padding-left: 5px;padding-right: 5PX;padding-top: 2px;padding-bottom: 2px;margin-right:5px;margin-top:6px;color:white\"><span ng-if=\"product.price == 0\">Get!</span><span ng-if=\"product.price != 0\">Buy!</span></div></div>\r\n        				</div>\r\n        				<div layout=\"row\" layout-align=\"space-between center\" style=\"margin:0\">\r\n					\r\n        					<div star-rating rating=\"product.rating\" colour=\"white\" style=\"margin-top: -3px;\"\r\n        						read-only=\"true\" max-rating=\"5\">\r\n        					</div>\r\n        					<text style=\"color:black;font-weight:700;font-size:15px;margin-top: 8px;margin-right:5px;\">\r\n        						<div ng-if=\"product.price > 0\">Rs. {{product.price}}</div>\r\n        						<div ng-if=\"product.price == 0 || isNumber(product.price) == false\">Free</div>\r\n        					</text>\r\n    					</div>\r\n					\r\n    				</md-card-content>\r\n    				\r\n    			</md-card>\r\n    			\r\n    			<md-card style=\"width:145px;\" id=\"cardApp\" class=\"tint showbox scale\" ng-click=\"viewProduct(product)\"  hide-xl hide-gt-lg hide-lg hide-gt-md hide-md hide-gt-sm>\r\n    				<img src=\"/apis/marketplace/getIcon/{{product.appKey}}\" err-src=\"img/standard.png\" style=\"height:100px; width: 100px;margin: 0 auto;\"  alt=\"Washed Out\"/>\r\n    				<md-divider></md-divider>\r\n    				<md-card-content style=\"padding:0px;padding-left:5px !important;background:#2d3f51\">\r\n					    <div layout=\"row\" layout-align=\"space-between start\" style=\"margin:0\">\r\n        					<h2 class=\"md-title\" style=\"margin:0;margin-top:3px;font-size:12px;color:white; text-align: left;\">{{product.name}}</h2>\r\n        					<div style=\"padding-left:22px;\"><div style=\"background:#00acc4;font-size: 14px;border: 1px solid #ececec;padding-left: 5px;padding-right: 5PX;padding-top: 2px;padding-bottom: 2px;margin-right:5px;margin-top:6px;color:white\"><span ng-if=\"product.price == 0\">Get!</span><span ng-if=\"product.price != 0\">Buy!</span></div></div>\r\n        				</div>\r\n        				<div layout=\"row\" layout-align=\"space-between center\" style=\"margin:0\">\r\n					\r\n        					<span></span>\r\n        					<text style=\"color:white;font-weight:700;font-size:12px;margin-top: 8px;margin-right:5px;\">\r\n        						<div ng-if=\"product.price > 0\">Rs. {{product.price}}</div>\r\n        						<div ng-if=\"product.price == 0 || isNumber(product.price) == false\">Free</div>\r\n        					</text>\r\n    					</div>\r\n					\r\n    				</md-card-content>\r\n    				\r\n    			</md-card>\r\n    		</li> \r\n\r\n	</center>\r\n	<div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\" style=\"padding-top:25%;\" ng-show=\"showProgress==true;\">\r\n		<md-progress-circular md-mode=\"indeterminate\" md-diameter=\"96\"></md-progress-circular>\r\n	 </div>\r\n</div>\r\n</md-dialog>");

    $templateCache.put("categories.html", "<div style=\"padding-top:120px;width:100%;padding-bottom:60px;\">\r\n    <center id=\"inline\" style=\"background;max-width:960px;margin:0 auto\">\r\n    	\r\n    \r\n    	<li ng-repeat=\"product in categoryApps | filter:{Paid:paidOrFree||undefined} | filter:searchText||undefined\" class=\"my-animation\"> \r\n			<md-card style=\"width:200px;\" id=\"cardApp\" class=\"tint showbox scale\" ng-click=\"viewProduct(product)\" hide-sm hide-xs>\r\n				<img src=\"/apis/marketplace/getIcon/{{product.appKey}}\" err-src=\"img/standard.png\" style=\"min-width:128px;height:144px; width: 144px;margin: 0 auto;\"  alt=\"Washed Out\"/>\r\n				<md-divider></md-divider>\r\n				<md-card-content style=\"padding:0px;padding-left:5px !important;background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABGCAMAAAC+PCsEAAAAz1BMVEUtP1H///8ArMQPh50mUGIpRlksQFL6/v6v5e0etssGrsYCp78EoLcVeI0baX0hW24rQ1b9/v/s+fvj9vnJ7fO/6vCI2ORey9pEwtQMsMcAq8MBqcEDpLwMj6UTfpQXc4gZboIfX3MnTF7x+/zb9PfW8vah4emT3OZ81eF41OBu0N5pz91UyNhPxtc6v9I1vtEVs8kSssgGnbQHmrEJlq0KlKsLkagRg5kdZHkjVmn1/P30+/zO7/S36O6k4eqZ3ueX3edkzdssus4qus4ouc0LxBxtAAABoUlEQVRo3tXaR1YCURRFUd4vCkqQElFAcjJiQInmPP8x2fLVbbtscN4Mduuus/7PbcX1wu992B8vtw03bjukjoYM3LFjaMjcIedoyF7wO0ZDNu64MTKkWnbIGxqSuqM0QUPWDrkyMiQf/BI0pOKO2yIZUth1yNTIEBmRZzQkcsenkSFxNiINNCQNfgdoyModR0aGyIi8oiHZiLQeyRAZkaaRIaPgV0dDoqxx98mQuCONS4YMpXHRkKU0LhkiI/KOhvSzxq2RIYWuNC4ZIiOSoCGRNC4ZIiMyNTJERuQQDVm448vIkIfg10BD+tK4ZEi1K41LhtwHv1M0pJc17hMZMm5L45IhA2lcNGQhjUuGyIhcGBkiI3JChsiIzIwMkRE5Q0N60rhkiIzItZEhMiIJGjJ3x12RDJHnz0sjQzbSuGSI/KH5NjIklcZFQ9bSuGRIPkjjkiEVaVwyRJ4/WxMyREakaWRIlEFeyJC4LI1LhqTauGTIShqXDJERmRkZUpHGJUNkREo1MmQUpHHJEBmRhAyJO9K4ZMhQG5cMWWrj/vf9AK2rKmkoiQdhAAAAAElFTkSuQmCC\') no-repeat right top\">\r\n\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between start\" style=\"margin:0\">\r\n					<h2 class=\"md-title\" style=\"margin:0;margin-top:3px;font-size:16px;color:white; text-align: left;\">{{product.name}}</h2>\r\n					<div style=\"padding-left:22px;\"><div style=\"background:#00acc4;font-size: 14px;border: 1px solid #ececec;padding-left: 5px;padding-right: 5PX;padding-top: 2px;padding-bottom: 2px;margin-right:5px;margin-top:6px;color:white\"><span ng-if=\"product.price == 0\">Get!</span><span ng-if=\"product.price != 0\">Buy!</span></div></div>\r\n					</div>\r\n	\r\n					\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between center\" style=\"margin:0\">\r\n					\r\n					<div star-rating rating=\"product.rating\" colour=\"white\" style=\"margin-top: -3px;\"\r\n						read-only=\"true\" max-rating=\"5\">\r\n					</div>\r\n					<text style=\"color:black;font-weight:700;font-size:15px;margin-top: 8px;margin-right:5px;\">\r\n						<div ng-if=\"product.price > 0\">$ {{product.price}}</div>\r\n						<div ng-if=\"product.price == 0 || isNumber(product.price) == false\">Free</div>\r\n					</text>\r\n					</div>\r\n				</md-card-content>\r\n				\r\n			</md-card>\r\n			\r\n			<md-card style=\"width:145px;\" id=\"cardApp\" class=\"tint showbox scale\" ng-click=\"viewProduct(product)\" hide-xl hide-gt-lg hide-lg hide-gt-md hide-md hide-gt-sm>\r\n				<img src=\"/apis/marketplace/getIcon/{{product.appKey}}\" err-src=\"img/standard.png\" style=\"width:100px;height:100px;margin: 0 auto;\"  alt=\"Washed Out\"/>\r\n				<md-divider></md-divider>\r\n				<md-card-content style=\"padding:0px;padding-left:5px !important;background:#2d3f51;\">\r\n\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between start\" style=\"margin:0\">\r\n					<h2 class=\"md-title\" style=\"margin:0;margin-top:5px;font-size:12px;color:white; text-align: left;\">{{product.name}}</h2>\r\n					<div style=\"padding-left:22px;\"><div style=\"background:#00acc4;font-size: 12px;border: 1px solid #ececec;padding-left: 5px;padding-right: 5PX;padding-top: 2px;padding-bottom: 2px;margin-right:5px;margin-top:6px;color:white\"><span ng-if=\"product.price == 0\">Get!</span><span ng-if=\"product.price != 0\">Buy!</span></div></div>\r\n					</div>\r\n	\r\n					\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"end center\" style=\"margin:0;padding-bottom: 4px\">\r\n					<text style=\"color:white;font-weight:700;font-size:12px;margin-top: 8px;margin-right:5px;\">\r\n						<div ng-if=\"product.price != 0\"><span ng-if=\"product.price!=\'Free\'\">Rs. </span>{{product.price}}</div>\r\n						<div ng-if=\"product.price == 0\">Free</div>\r\n					</text>\r\n					</div>\r\n				</md-card-content>\r\n				\r\n			</md-card>\r\n		</li> \r\n    		\r\n    \r\n    \r\n    </center>\r\n    <div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\" style=\"padding-top:25%;\" ng-show=\"showProgress==true;\">\r\n        <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"96\"></md-progress-circular>\r\n     </div>\r\n     <div layout=\"row\" layout-align=\"center center\" ng-if=\"categoryApps.length == 0\">\r\n        <h2>This Page is empty</h2>\r\n    </div>\r\n</div>\r\n\r\n\r\n<ng-md-icon icon=\"{{categoryImage}}\" style=\"margin-top: 18px;margin-right: 18px;fill:#D1D1D1;bottom:20px;right:20px;height:200px;width:200px;position:fixed;z-index:-1\" size=\"200px\"></ng-md-icon>");

    $templateCache.put("rate.html", "<md-dialog aria-label=\"rate\"  ng-cloak>\r\n  <form name=\"editForm\" ng-submit=\"submit()\">\r\n  <md-toolbar class=\"modal-header\" style=\"background:#00acc4\">\r\n    <div class=\"md-toolbar-tools\">\r\n      <h2>Rate</h2>\r\n      <span flex></span>\r\n      <md-button class=\"md-icon-button\" ng-click=\"cancel();\" type=\"button\" aria-label=\"Close\">\r\n        <ng-md-icon icon=\"close\" style=\"fill:white;\" size=\"24px\"></ng-md-icon>\r\n      </md-button>\r\n    </div>\r\n  </md-toolbar>\r\n  <md-dialog-content style=\"width:268px;max-height:810px; \">\r\n    <div class=\"md-dialog-content\">\r\n		<div star-rating-two rating=\"ratingObject.stars\" colour=\"white\" style=\"margin-top: -3px;\"\r\n			read-only=\"false\" max-rating=\"5\" click=\"rateApp(param,selectedProduct,$event)\" mouse-hover=\"mouseHover1(param)\" mouse-leave=\"mouseLeave1(param)\">\r\n		</div>\r\n		 <md-input-container class=\"md-block\" flex-gt-sm>\r\n            <label>Title</label>\r\n            <input ng-model=\"ratingObject.title\">\r\n          </md-input-container>\r\n		  <textarea ng-model=\"ratingObject.description\" placeholder=\"What are your thoughts?\" type=\"text\" style=\"border:1px solid #CDCDCD;border-radius:3px; height:200px;width:100%;outline: 0;resize: none;padding:15px;box-sizing: border-box;\"></textarea>\r\n    </div>\r\n  </md-dialog-content>\r\n  <md-dialog-actions layout=\"row\">\r\n   \r\n    <md-button type=\"submit\" style=\"margin-right:20px;\" >\r\n      Submit\r\n    </md-button>\r\n  </md-dialog-actions>\r\n  </form>\r\n</md-dialog>");

    $templateCache.put("myapps.html", "<md-whiteframe id=\"market_header\" class=\"md-whiteframe-2dp\" layout=\"column\" style=\"background:white;margin:0 auto;position:fixed;z-index:5;height: 51px;\">\r\n			\r\n			<div layout=\"row\" layout-align=\"space-between start\">\r\n    			<ul class=\"nav\" hide-xs>\r\n    				  <li class=\"drop\" style=\"z-index:3\">CATEGORIES <img src=\"img/down.png\"/>\r\n    					<ul style=\"background:white;padding-left: 0;\">\r\n    				    	<md-content style=\"opacity:.95;padding:10px\">\r\n    							<div layout=\"row\" layout-align=\"start start\" ng-repeat=\"rows in categories\">\r\n    								<div layout=\"column\" layout-align=\"center center\" class=\"icons-menu-items\" ng-repeat=\"item in rows\" ng-click=\"openCategory(item)\">\r\n    									<ng-md-icon icon=\"{{::item.imageUrl}}\" style=\"fill:#448AFF;\" size=\"48px\"></ng-md-icon>\r\n    									<center style=\"font-weight:300\">{{::item.name}}</center>\r\n    								</div>\r\n    							</div>\r\n    						</md-content>\r\n    					</ul>\r\n    				  </li>\r\n    				  <li ng-click=\"change_ref(\'market.home\',\'main\')\"><a>HOME</a></li>\r\n    				  \r\n    			</ul>\r\n    			<md-button class=\"md-icon-button\" ng-click=\"toggleLeft()\" aria-label=\"Close\" style=\"margin-right: 15px !important\" hide-xl hide-gt-lg hide-lg hide-gt-md hide-md hide-gt-sm>\r\n        			<ng-md-icon icon=\"menu\" style=\"fill:grey;\" size=\"32px\"></ng-md-icon>\r\n        		 </md-button>\r\n    			 <div layout=\"row\">\r\n    			     <md-button class=\"md-icon-button\" ng-click=\"openSearchContainer($event)\" aria-label=\"Close\" style=\"margin-right: 15px !important\">\r\n            			<ng-md-icon icon=\"search\" style=\"fill:grey;\" size=\"32px\"></ng-md-icon>\r\n            		  </md-button>\r\n    			  </div>\r\n			</div>\r\n\r\n\r\n</md-whiteframe> \r\n\r\n<div ui-view></div>");

    $templateCache.put("myAppsDisplay.html", "<div style=\"width:100%;padding-bottom:60px;padding-top:60px;\">\r\n<center id=\"inline\" style=\"background;max-width:960px;margin:0 auto\">\r\n	\r\n\r\n			<li ng-repeat=\"product in allApps | filter:{Paid:paidOrFree||undefined} | filter:searchText||undefined\" class=\"my-animation\"> \r\n			<md-card style=\"width:200px;\" id=\"cardApp\" class=\"tint showbox scale\" ng-click=\"viewMyApp(product)\" hide-sm hide-xs>\r\n				<img src=\"{{product.iconUrl}}\" err-src=\"img/standard.png\" style=\"min-width:128px;height:144px; width: 144px;margin: 0 auto;\"  alt=\"Washed Out\"/>\r\n				<md-divider></md-divider>\r\n				<md-card-content style=\"padding: 6px !important;background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABGCAMAAAC+PCsEAAAAz1BMVEUtP1H///8ArMQPh50mUGIpRlksQFL6/v6v5e0etssGrsYCp78EoLcVeI0baX0hW24rQ1b9/v/s+fvj9vnJ7fO/6vCI2ORey9pEwtQMsMcAq8MBqcEDpLwMj6UTfpQXc4gZboIfX3MnTF7x+/zb9PfW8vah4emT3OZ81eF41OBu0N5pz91UyNhPxtc6v9I1vtEVs8kSssgGnbQHmrEJlq0KlKsLkagRg5kdZHkjVmn1/P30+/zO7/S36O6k4eqZ3ueX3edkzdssus4qus4ouc0LxBxtAAABoUlEQVRo3tXaR1YCURRFUd4vCkqQElFAcjJiQInmPP8x2fLVbbtscN4Mduuus/7PbcX1wu992B8vtw03bjukjoYM3LFjaMjcIedoyF7wO0ZDNu64MTKkWnbIGxqSuqM0QUPWDrkyMiQf/BI0pOKO2yIZUth1yNTIEBmRZzQkcsenkSFxNiINNCQNfgdoyModR0aGyIi8oiHZiLQeyRAZkaaRIaPgV0dDoqxx98mQuCONS4YMpXHRkKU0LhkiI/KOhvSzxq2RIYWuNC4ZIiOSoCGRNC4ZIiMyNTJERuQQDVm448vIkIfg10BD+tK4ZEi1K41LhtwHv1M0pJc17hMZMm5L45IhA2lcNGQhjUuGyIhcGBkiI3JChsiIzIwMkRE5Q0N60rhkiIzItZEhMiIJGjJ3x12RDJHnz0sjQzbSuGSI/KH5NjIklcZFQ9bSuGRIPkjjkiEVaVwyRJ4/WxMyREakaWRIlEFeyJC4LI1LhqTauGTIShqXDJERmRkZUpHGJUNkREo1MmQUpHHJEBmRhAyJO9K4ZMhQG5cMWWrj/vf9AK2rKmkoiQdhAAAAAElFTkSuQmCC\') no-repeat right top\">\r\n\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between start\" style=\"margin:0\">\r\n					<h2 class=\"md-title\" style=\"margin:0;margin-top:3px;font-size:16px;color:white\">{{product.Name}}</h2>\r\n					<div style=\"padding-left:22px;\"><div style=\"background:#00acc4;font-size: 14px;border: 1px solid #ececec;padding-left: 5px;padding-right: 5PX;padding-top: 2px;padding-bottom: 2px;margin-right:5px;margin-top:6px;color:white\"><span ng-if=\"product.price == 0\">View</span><span ng-if=\"product.price != 0\">View!</span></div></div>\r\n					</div>\r\n	\r\n					\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between center\" style=\"margin:0\">\r\n					\r\n				\r\n					</div>\r\n				</md-card-content>\r\n				\r\n			</md-card>\r\n			<md-card style=\"width:145px;\" id=\"cardApp\" class=\"tint showbox scale\" ng-click=\"viewMyApp(product)\" hide-xl hide-gt-lg hide-lg hide-gt-md hide-md hide-gt-sm>\r\n				<img src=\"{{product.iconUrl}}\" err-src=\"img/standard.png\" style=\"width:100px;height:100px;margin: 0 auto;\"  alt=\"Washed Out\"/>\r\n				<md-divider></md-divider>\r\n				<md-card-content style=\"padding: 6px !important;background:#2d3f51\">\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between start\" style=\"margin:0\">\r\n					<h2 class=\"md-title\" style=\"margin:0;margin-top:3px;font-size:12px;color:white\">{{product.Name}}</h2>\r\n					<div style=\"padding-left:22px;\"><div style=\"background:#00acc4;font-size: 14px;border: 1px solid #ececec;padding-left: 5px;padding-right: 5PX;padding-top: 2px;padding-bottom: 2px;margin-right:5px;margin-top:6px;color:white\"><span ng-if=\"product.price == 0\">View</span><span ng-if=\"product.price != 0\">View!</span></div></div>\r\n					</div>\r\n	\r\n					\r\n					<div class=\"md-actions\" layout=\"row\" layout-align=\"space-between center\" style=\"margin:0\">\r\n					\r\n				\r\n					</div>\r\n				</md-card-content>\r\n				\r\n			</md-card>\r\n		</li> \r\n\r\n\r\n</center>\r\n</div>\r\n\r\n<ng-md-icon icon=\"person\" style=\"margin-top: 18px;margin-right: 18px;fill:#D1D1D1;bottom:20px;right:20px;height:200px;width:200px;position:fixed;z-index:-1\" size=\"200px\"></ng-md-icon>\r\n");
}]);

angular.module('mainApp').controller('ViewCtrl', function ($scope, $rootScope, $state, $mdDialog, $window, $http, $objectstore, $auth, $storage, $mdSidenav) {

    $scope.toggleLeft = buildToggler('left');
    $scope.isOpenLeft = function () {
        return $mdSidenav('left').isOpen();
    };

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID)
                .toggle();
        }
    }

    $scope.close = function () {
        $mdSidenav('left').close();
    };

    $scope.baseUrl = "";
    $scope.selectedProduct = "";
    $auth.checkSession();
    $scope.authObject = {};
    $scope.profilePicture = "img/contacts.png";
    $scope.showProgress = false;
    $scope.allApps = [];
    $scope.categoryApps = [];
    $scope.categoryImage = "";
    $scope.topRatedApps = [];
    $scope.allRatings = [];
    $scope.myRating = {};
    $rootScope.showGlobalProgress = false;

    $scope.paidOrFree = null;

    $http.get('js/categories.json').success(function (response) {
        $scope.cateogiresMobile = response;
        $scope.categories = chunk(response, 5);
    });

    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

    $scope.changeTab = function (ind) {
        switch (ind) {
            case 0:
                //All Categories
                $scope.paidOrFree = null;
                break;
            case 1:
                //$location.url("/paid");
                $scope.paidOrFree = "Paid";
                break;
            case 2:
                $scope.paidOrFree = "Free";
                break;
        }
    };

    function defaultColors() {
        angular.element('#main').css('background', '#34474E');
        angular.element('#myapps').css('background', '#34474E');
        angular.element('#myaccount').css('background', '#34474E');

    }

    //Get the initial letter of the category for applications.
    $scope.getCatLetter = function (catName) {
        try {
            var catogeryLetter = "/img/material alperbert/avatar_tile_" + catName.charAt(0).toLowerCase() + "_28.png";
        } catch (exception) {}
        return catogeryLetter;
    };

    function getUserData(callback) {
        $http.get("http://" + window.location.hostname + "/auth/GetSession/" + $auth.getSecurityToken() + "/" + window.location.hostname)
            .success(function (data) {

                console.log(data);
                $scope.authObject = data;
                $scope.profilePicture = "http://duoworld.com/apis/media/profilepic/get/" + $scope.authObject.Email;

            }).error(function () {
                console.log(data);
            });

    }
    getUserData();

    function getTopRatedForHome() {
        if ($scope.allApps.length === 0) {
            $http.get("/apis/marketplace/topRatedApps/")
                .success(function (data) {
                    data.forEach(function (item) {
                        if (item.app) { //If there is an app
                            if (!item.app.iconUrl) {
                                item.app.iconUrl = "img/standard.png"; //add a image url if it is not present
                            }
                            item.app.price = parseFloat(item.app.price); //convert price to a float

                            if (item.app.price > 0) //if price is a number and more than zero
                            {
                                item.app.Paid = "Paid"; //add Paid attribute is for sorting purpose
                            } else if (item.app.price == "Free" || isNaN(item.app.price) == true || item.app.price == 0) {
                                item.app.Paid = "Free"; //add Paid attribute is for sorting purpose
                            }

                            $scope.allApps.push(item.app);
                        }
                    })
                    console.log($scope.allApps);
                    $scope.showProgress = false;

                }).error(function () {
                    console.log(data);
                    $scope.showProgress = false;
                });
        }
    }
    getTopRatedForHome();

    $scope.change_ref = function (sref, id) {
        console.log("triggered");
        defaultColors();
        $state.go(sref);
        angular.element('#' + id).css('background', '#00acc4');
        $scope.close();
    }


    $scope.openCategory = function (category) {
        //alert(name);
        location.href = "#/market/categories";
        $scope.showProgress = true;
        $scope.categoryImage = category.imageUrl;

        $http.get($scope.baseUrl + "/apis/marketplace/getAppsByCategory/" + category.name + "/2/3")
            .success(function (data) {
                console.log(data);
                $scope.categoryApps = [];
                data.forEach(function (item) {
                    if (item) { //If there is an app
                        if (!item.iconUrl) {
                            item.iconUrl = "img/standard.png"; //add a image url if it is not present
                        }
                        item.price = parseFloat(item.price); //convert price to a float

                        if (isNaN(item.price) == false && item.price > 0) //if price is a number and more than zero
                        {
                            item.Paid = "Paid"; //add Paid attribute is for sorting purpose
                        } else if (item.price == "Free" || item.price == 0) {
                            item.Paid = "Free"; //add Paid attribute is for sorting purpose
                        }

                        $scope.categoryApps.push(item);
                    }
                })
                $scope.showProgress = false;
                $scope.close();

            }).error(function () {
                console.log(data);
                $scope.showProgress = false;
            });
    }

    $scope.goTotopRated = function () {
        location.href = "#/market/toprated";

        if ($scope.topRatedApps.length == 0) {
            $http.get("/apis/marketplace/topRatedApps/")
                .success(function (data) {
                    data.forEach(function (item) {
                        if (item.app) {
                            if (!item.app.iconUrl) {
                                item.app.iconUrl = "img/standard.png";
                            }

                            if (isNaN(item.app.price) == false) //if price is a number
                            {
                                item.app.Paid = "Paid";
                            } else if (item.app.price == "Free" || item.app.price == 0 || item.app.price == "0") {
                                item.app.Paid = "Free";
                            }
                            $scope.topRatedApps.push(item.app);

                        }
                    })
                    console.log($scope.topRatedApps);
                    $scope.showProgress = false;
                    $scope.close();

                }).error(function () {
                    console.log(data);
                    $scope.showProgress = false;
                });
        }
    }

    $scope.viewProduct = function (product) {
        $scope.selectedProduct = product;
        $scope.myRating = {};
        $scope.myRating.stars = 0;

        $http.get("/apis/marketplace/getAllRating/" + product.id)
            .success(function (data) {

                $scope.allRatings = data;
                $scope.allRatings.forEach(function (item) {

                    if (item.userid == $scope.authObject.UserID) {
                        $scope.myRating = item;
                        $scope.myRating.stars = parseFloat($scope.myRating.stars);
                    }
                })
            }).error(function () {
                console.log(data);
                $scope.showProgress = false;
            });

        location.href = "#/market/product?id=" + product.id;
        $scope.close();
    }

    $scope.back = function () {

        var boxOne = document.getElementsByClassName('selected_product_card');
        // angular.element(boxOne).css('background-color', 'orange');
        angular.element(boxOne).addClass('scaleDown');
        setTimeout(function () {
            location.href = '#/market/home';
        }, 400);
    }



    $scope.goTonewReleases = function (ev) {
        location.href = "#/market/new_releases";

        $mdDialog.show({
            controller: 'myCardsCtrl',
            templateUrl: 'partials/myCards.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    }

    $scope.openSearchContainer = function (ev) {
        $mdDialog.show({
            controller: 'searchCtrl',
            templateUrl: 'search.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function (response) {
            if (response) {
                //console.log(response);
                $scope.viewProduct(response);
            }
        });
    }


})


angular.module('mainApp').filter('ceil', function () {
    return function (input) {
        var input = input || 0;
        return Math.ceil(input);
    };
});

function DialogController($scope, $mdDialog) {

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function () {

        alert(document.getElementById('direct-link'));
    };
}
