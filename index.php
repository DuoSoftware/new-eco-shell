<?php

$useragent=$_SERVER['HTTP_USER_AGENT'];

if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4)))

header('Location: /../mobile_shell');
?>
    <!DOCTYPE html>
    <html manifest="shell.appcache">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title>DuoWorld</title>
        <link rel="shortcut icon" href="images/shellassets/dw-favicon.png" type="image/png">
        <!--build:css css/main.min.css -->
        <link rel="stylesheet" type="text/css" href="bower_components/angular-material/angular-material.css" />
        <link rel="stylesheet" type="text/css" href="bower_components/animate.css/animate.min.css" />
        <!--        <link rel="stylesheet" type="text/css" href="bower_components/swiper/dist/css/swiper.css" />-->
        <!--        <link rel="stylesheet" type="text/css" href="bower_components/angular-gridster/dist/angular-gridster.min.css" />-->
        <link rel="stylesheet" type="text/css" href="bower_components/perfect-scrollbar/src/perfect-scrollbar.css">
        <link rel="stylesheet" type="text/css" href="shell_specific_components/styles/animations.min.css" />
        <link rel="stylesheet" type="text/css" href="shell_specific_components/styles/appshellcommon.css" />
        <link rel="stylesheet" type="text/css" href="shell_specific_components/styles/themesVarient.css">
        <!--        <link rel="stylesheet" type="text/css" href="shell_specific_components/styles/refractoredStyles.css" />-->
        <!--       <link rel="stylesheet" type="text/css" href="shell_specific_components/styles/custommaterialstyling.css" />-->
        <!--        <link rel="stylesheet" type="text/css" href="shell_specific_components/styles/v-accordion.css" />-->
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900' rel='stylesheet' type='text/css'>
        <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
        <!-- endbuild -->
    </head>

    <body ng-app="mambatiFrameworkShell" layout="column" ng-cloak ng-controller="duoworld-framework-shell-ctrl as vm" md-theme="{{vm.shellConfig.themeconfiguration.palettename}}-{{vm.shellConfig.themeconfiguration.theme}}" md-theme-watch="true" class="{{vm.shellConfig.themeconfiguration.palettename}}-{{vm.shellConfig.themeconfiguration.theme}}">
        <!-- framework outer container .start -->
        <div id="dw-loadingFrame" layout="column" layout-align="center center">
            <p style="font-size: 12vw;
    font-weight: 700;
    margin: 0px;animation:fadeIn 0.6s 0.2s;">DuoWorld</p>
            <p>Please wait, loading..</p>
            <!--
    <div class="dw-cygilContainer" style="background:url(images/tennantassets/duoworldbannerCustom.png);"></div>
    <div class="dw-platformLoadingContainer"> Loading the platform, please wait ! </div>
-->
        </div>
        <div ngsf-fullscreen id="duoWorld-framework-main-container">
            <!--        style="background-image:url( {{shellConfig.backgroundconfiguration[2].backgroundimageconfig.imageurl }});"-->
            <!-- framework inner container .start -->
            <!--            <div id="duoworld-framework-container">-->
            <!-- right side nav .start -->
            <md-sidenav class="md-sidenav-right md-primary" layout="column" layout-align="start start" md-component-id="right"> </md-sidenav>
            <!-- right side nav .end -->
            <!-- top tool bar .start -->
            <!--                <md-toolbar class="md-toolbar-medium" style="z-index:4 !important;">-->
            <div class="md-toolbar-tools dock-toolbar {{vm.shellConfig.themeconfiguration.palettename}}-{{vm.shellConfig.themeconfiguration.theme}}" ng-class="{'dock-toolbar-overlay':$state.current.name == 'dock'}" layout="row" layout-align="space-between center">
                <div class="tool-bar-control-set left" layout="row" layout-align="start center" flex>
                    <!--
                    <md-button ng-click="showApplicationTray()" aria-label="menu">
                        <md-icon md-svg-icon="icons/ic_apps_24px.svg" alt="Settings"></md-icon>
                        <md-tooltip>All Applications</md-tooltip>
                    </md-button>
                    <md-content class="toolbar-allApplication-tray " ng-if="$root.showMainApplicationTray" layout="column" layout-align="start center">
                        <div class="toolbar-allApplication-tray-anim" ng-if="$root.showMainApplicationTray"></div>
                        <perfect-scrollbar class="systemTrayScroller" id="systemTrayScroller" wheel-propagation="false" wheel-speed="2" suppressScrollX="true" layout="row" layout-align="center start">
                            <div layout="row" layout-align="start start" layout-wrap layout-padding>
                                <div ng-repeat="componentdata in allApps | filter:globalSearchKeyword" component-generator component="'appshortcut'" componentdata="componentdata" ng-if="componentdata.Apps == undefined" componentdraggable="true" style="width:140px"> </div>
                                <div ng-repeat="componentdata in allApps | filter:globalSearchKeyword" component-generator component="'appbundle'" componentdata="componentdata" ng-if="componentdata.Apps !== undefined" componentdraggable="true" style="width:140px"> </div>
                            </div>
                        </perfect-scrollbar>
                    </md-content>
-->
                    <div ng-if="$state.current.name !== 'dock'">
                        <md-button aria-label="Close Application" ng-click="vm.childApplicationClose()">
                            <md-icon md-svg-icon="icons/ic_arrow_back_24px.svg" alt="close"></md-icon>
                        </md-button>
                    </div>

                    <md-menu md-offset="0 58">
                        <md-button ng-click="$mdOpenMenu()" aria-label="All Apps">
                            <div layout="row" layout-align="center center"><img src="images/tennantassets/duoworldlogo.png" style="width:30px;"></div>
                            <!--                                                        <md-icon md-svg-icon="icons/ic_apps_24px.svg" alt="All Apps"></md-icon>-->
                            <md-tooltip md-direction="right">All Applications</md-tooltip>
                        </md-button>
                        <md-menu-content layout="column" layout-align="start start" class="application-dialog-panel">
                            <div layout="row" layout-align="space-between center" style="width:100%;padding:0px 8px;">
                                <span style="font-size: 18px;
    font-weight: 300;">All Applications</span>

                                <md-button aria-label="see all" class="md-primary">
                                    <md-icon md-svg-icon="icons/ic_apps_24px.svg" alt="marketplace"></md-icon>
                                </md-button>
                            </div>
                            <md-menu-divider></md-menu-divider>
                            <md-content layout="column" layout-align="start center" layout-padding>
                                <perfect-scrollbar class="systemTrayScroller" id="systemTrayScroller" wheel-propagation="false" wheel-speed="2" suppressScrollX="true" layout="row" layout-align="center start">
                                    <div layout="row" layout-align="center start" layout-wrap>
                                        <div ng-repeat="componentdata in vm.allApps | filter:globalSearchKeyword" component-generator component="'appshortcut'" componentdata="componentdata" ng-if="componentdata.Apps == undefined" componentdraggable="false" style="width:100px"> </div>
                                        <div ng-repeat="componentdata in vm.allApps | filter:globalSearchKeyword" component-generator component="'appbundle'" componentdata="componentdata" ng-if="componentdata.Apps !== undefined" componentdraggable="false" style="width:100px"> </div>
                                    </div>
                                </perfect-scrollbar>
                                <p ng-if="">No Results Found!</p>
                            </md-content>
                        </md-menu-content>

                    </md-menu>

                    <!--
                    <md-button ng-click="vm.showApplicationPanel($event)">
                        <div layout="row" layout-align="center center"><img src="images/tennantassets/duoworldlogo.png" style="width:30px;"></div>
                        <md-tooltip md-direction="right">All Applications</md-tooltip>
                    </md-button>
-->

                    <div layout="row" layout-align="start center" ng-if="$state.current.name !== 'dock'">

                        <div style="width:1px;height:28px;background-color:rgba(255, 255, 255, 0.3);margin:10px;"></div>
                        <p style="margin:5px;color:white;font-weight:300;">{{$root.shellRoutedAppName}}</p>
                    </div>
                    <!--                    <shell-branding id="shellBranding" ng-src="images/tennantassets/duoworldlogo.png" ng-click="toggleLeftMenu()"></shell-branding>-->
                    <!--                    <img src="images/tennantassets/duoworldlogo.png" style="width:30px;">-->
                </div>
                <!--
                <div class="tool-bar-search" layout="row" layout-align="center center" flex>

    <input ng-model="globalSearchKeyword" placeholder="Search">
</div>
-->

                <!-- <div class="tool-bar-control-set middle" layout="row" layout-align="start center">
                        <div class="dw-global-serach-container" layout="row" layout-align="end center">
                            <div class="dw-global-search-section1" layout="row" layout-align="start center">
                                <div class="dw-global-search-icon">
                                    <md-icon md-svg-icon="icons/ic_search_24px.svg" class="s24" alt="Search"></md-icon>
                                </div>
                                <div class="dw-global-search-input-box">
                                    <input type="text" placeholder="Search">
                                </div>
                            </div>
                            <div class="dw-global-search-section2" layout="column" layout-align="center end">
                                <div class="dw-global-search-tag">{{globalSearch.context}}<md-tooltip>Local Context</md-tooltip></div>
                            </div>
                        </div>
                    </div> -->
                <div class="tool-bar-control-set right" layout="row" layout-align="end center" flex>
                    <!--                        <tenantswitcher-component currenttennant="currenttenantsessioninfo.Username"></tenantswitcher-component>-->
                    <!--
                            <md-button aria-label="Search" ng-click="revealSearchBar()">
                                <md-icon md-svg-icon="icons/ic_search_24px.svg" alt="Search" ng-hide="searchBarRevealed"></md-icon>
                                <md-icon md-svg-icon="icons/ic_close_24px.svg" alt="Close Search" ng-show="searchBarRevealed"></md-icon>
                            </md-button>
                            <div class="serachBox" ng-show="searchBarRevealed">
                                <md-input-container md-no-float class="md-block">
                                    <input ng-model="globalSearchKeyword" placeholder="Search"> </md-input-container>
                            </div>
-->
                    <md-menu md-position-mode="target-right target" md-offset="0 45">
                        <md-button ng-click="showNotifications($mdOpenMenu);" aria-label="show notifications">
                            <md-icon md-svg-icon="icons/ic_notifications_none_24px.svg"></md-icon>
                            <div ng-if="unseenNotificationCount > 0" class="latestNotificationCount" layout="row" layout-align="center center">{{unseenNotificationCount}}</div>
                        </md-button>
                        <md-menu-content layout="column" layout-align="start center" width="5" class="profile-widget {{vm.shellConfig.themeconfiguration.palettename}}-{{vm.shellConfig.themeconfiguration.theme}}" md-theme="{{vm.shellConfig.themeconfiguration.palettename}}-{{vm.shellConfig.themeconfiguration.theme}}" md-theme-watch="true">
                            <perfect-scrollbar class="allAppItemContainer-scroller" wheel-propagation="false" wheel-speed="2">
                                <div class="notification-dropdown-container-box" layout="row" layout-align="start center" ng-repeat="n in shellNotifications | orderBy:'-timestamp'" ng-if="n.viewstatus"> <img ng-src="data:image/png;base64,{{n.user.profile_pic}}" err-src="images/appIcons/contacts.png" class="notification-box-image" />
                                    <div layout="column" layout-align="start start" class="notification-box-content" flex>
                                        <p>{{n.message}}</p> <span>{{n.timestamp | date:'medium'}}</span> </div>
                                    <md-icon md-svg-icon="icons/ic_flash_on_24px.svg" alt="previous actions" class="notifiaction-box-icon"></md-icon>
                                </div>
                            </perfect-scrollbar>
                            <md-menu-item style="width:100%" ng-if="isNotificationeEmpty()">
                                <md-button aria-label="no new notifications">
                                    <md-icon md-svg-icon="icons/ic_error_24px.svg" alt="User Profile"></md-icon> No new Notifications! </md-button>
                            </md-menu-item>
                            <md-menu-divider></md-menu-divider>
                            <md-menu-item style="width:100%">
                                <md-button ng-click="toggleNotifications()" aria-label="see all">
                                    <md-icon md-svg-icon="icons/ic_turned_in_not_24px.svg" alt="User Profile"></md-icon> See All </md-button>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                    <md-button ng-click="vm.switchFullScreen();" aria-label="fullscreen" ng-if="!vm.fullScreenOn">
                        <md-icon md-svg-icon="icons/ic_fullscreen_24px.svg" alt="Fullscreen"></md-icon>
                        <md-tooltip>Fullscreen</md-tooltip>
                    </md-button>
                    <md-button ng-click="vm.exitFullScreen();" aria-label="fullscreen" ng-if="vm.fullScreenOn">
                        <md-icon md-svg-icon="icons/ic_fullscreen_exit_24px.svg" alt="Fullscreen"></md-icon>
                        <md-tooltip>Exit Fullscreen</md-tooltip>
                    </md-button>
                    <md-button ng-click="vm.dwFrameworkBuiltinAppNavigation('settings');" aria-label="settings">
                        <md-icon md-svg-icon="icons/ic_settings_24px.svg" alt="Settings"></md-icon>
                        <md-tooltip>Settings</md-tooltip>
                    </md-button>

                    <md-menu md-position-mode="target-right target" md-offset="0 65">
                        <md-button ng-click="$mdOpenMenu()">
                            <div layout="row" layout-align="center center"> <img ng-src="{{$root.profilePicture}}" err-src="images/usercover4.jpg" width="30" height="30" style="border-radius:50%;">
                                <!--                                <span>&nbsp {{currenttenantsessioninfo.Username}}</span>-->
                            </div>
                        </md-button>
                        <md-menu-content layout="column" layout-align="start center" width="5" class="profile-widget {{vm.shellConfig.themeconfiguration.palettename}}-{{vm.shellConfig.themeconfiguration.theme}}" md-theme="{{vm.shellConfig.themeconfiguration.palettename}}-{{vm.shellConfig.themeconfiguration.theme}}" md-theme-watch="true">
                            <div layout="column" layout-align="start center" style="width:100%">
                                <img ng-src="{{$root.profilePicture}}" err-src="images/usercover4.jpg" style="width:320px;height:320px;">
                                <div class="profile-widget-overlay"></div>
                                <div layout="row" layout-align="space-between center" class="profile-widget-info ">
                                    <div flex layout="column" layout-align="start start" ng-click="vm.dwFrameworkBuiltinAppNavigation('user profile');">
                                        <span>{{vm.content.Name}}</span> <span>{{currenttenantsessioninfo.Username}}</span> </div>
                                    <div layout="row" layout-align="end center">
                                        <md-button ng-click="vm.dwFrameworkBuiltinAppNavigation('user profile');">
                                            <md-icon md-svg-icon="icons/ic_account_box_24px.svg" alt="profile"></md-icon>
                                        </md-button>
                                        <md-button ng-click="vm.quitApplication($event);">
                                            <md-icon md-svg-icon="icons/ic_exit_to_app_24px.svg" alt="Signout"></md-icon>
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                            <!--
                           <div class="tennantCollectionModalContainerSearch" ng-if="$root.recivedTennantCollection.length">
    <md-input-container md-no-float class="searchInputContainer">
        <md-icon md-svg-src="icons/ic_search_24px.svg"></md-icon>
        <input ng-model="tennantSwitchSearch" type="text" placeholder="Search Tennant's"> </md-input-container>
</div>
-->
                            <perfect-scrollbar class="allAppItemContainer-scroller" wheel-propagation="false" wheel-speed="2">
                                <div class="tennantCollectionModalContainerContent" layout="column" layout-align="start start">
                                    <tennantswitchlist-component ng-repeat="tennant in $root.recivedTennantCollection | filter:tennantSwitchSearch" ng-click="vm.makeSwitchTennant(tennant.TenantID,$event)" tennantid="tennant.TenantID"></tennantswitchlist-component>
                                </div>
                            </perfect-scrollbar>
                            <!--
                           <md-menu-divider></md-menu-divider>
<md-menu-item style="width:100%">
    <md-button>
        <md-icon md-svg-icon="icons/ic_settings_24px.svg" alt="User Profile"></md-icon> Manage Tenants </md-button>
</md-menu-item>
-->

                            <md-menu-divider></md-menu-divider>
                            <md-menu-item style="width:100%">

                                <md-button>
                                    <md-icon md-svg-icon="icons/ic_group_add_24px.svg" alt="Signout"></md-icon> Add Tenants </md-button>
                            </md-menu-item>

                        </md-menu-content>
                    </md-menu>
                </div>
            </div>
            <!--                </md-toolbar>-->
            <!-- top tool bar .end -->
            <!-- middle UI View .start -->
            <div id="duoworld-framework-view-container" ui-view></div>
            <!--
            <footer ng-if="$state.current.name === 'dock'" layout="row" layout-align="center center" class="footer-menu" layout-padding>
                <md-button class="md-fab md-mini custom-main-button" layout="row" layout-align="center center"> <img src="images/appIcons/process%20designer.png" width="56px"> </md-button>
                <md-button class="md-fab md-mini custom-main-button" layout="row" layout-align="center center"> <img src="images/appIcons/package.png" width="56px"> </md-button>
                <md-button class="md-fab md-mini custom-main-button" layout="row" layout-align="center center" ng-click="showApplicationTray()">
                    <md-icon md-svg-icon="icons/ic_apps_24px.svg" alt="Settings"></md-icon>
                </md-button>
                <md-button class="md-fab md-mini custom-main-button" layout="row" layout-align="center center"> <img src="images/appIcons/settings.png" width="56px"> </md-button>
                <md-button class="md-fab md-mini custom-main-button" layout="row" layout-align="center center"> <img src="images/appIcons/duo%20digin%20rt.png" width="56px"> </md-button>
            </footer>
-->
            <!-- middle UI View .end -->


        </div>
        <div background-component id="backgroundImage" style="width:100%; height:100%;background-image:url({{vm.shellConfig.backgroundconfiguration[2].backgroundimageconfig.imageurl}});background-size:cover;    background-color: rgba(0,0,0,0.26);
    background-blend-mode: overlay;"></div>
        <!--        </div>-->
        <!-- framework inner container .end -->
        <!--        <img id="backgroundImage" src="{{$root.shellConfig.backgroundconfiguration[2].backgroundimageconfig.imageurl}}" style="width:100%; height:100%;">-->
        <!--        url({{$root.shellConfig.backgroundconfiguration[2].backgroundimageconfig.imageurl}})-->

        <!-- framework outer container .end -->
        <!-- framework load procedure .start -->
        <script src="/bower_components/jquery/dist/jquery.min.js"></script>
        <!--        <script src="shell_specific_components/libs/lava.min.js"></script>-->
        <script>
            var dwLoadingFrameIndicator = $("#dw-loadingFrame");
            var platformLoadCheck = setInterval(function() {
                if (/loaded|complete/.test(document.readyState)) {
                    clearInterval(platformLoadCheck);
                    setTimeout(removeLoadingframe, 1000);
                }
            }, 10);
            var removeLoadingframe = function() {
                dwLoadingFrameIndicator.fadeOut(1000, function() {
                    dwLoadingFrameIndicator.remove();

                });
            };
            var checkAlert = function() {
                alert('this is done !');
            };

        </script>
        <!-- framework load procedure .end -->
        <!-- Framework Core Library Dependencies -->
        <!--build:js js/libs.min.js -->
        <script src="bower_components/angular/angular.min.js"></script>
        <script src="bower_components/ui-router/release/angular-ui-router.min.js"></script>
        <script src="shell_specific_components/libs/mam-routing-engine.min.js"></script>
        <script src="bower_components/angular-messages/angular-messages.min.js"></script>
        <script src="bower_components/angular-aria/angular-aria.min.js"></script>
        <script src="bower_components/angular-animate/angular-animate.min.js"></script>
        <script src="bower_components/angular-material/angular-material.min.js"></script>
        <!--            <script src="/bower_components/angular-touch/angular-touch.min.js"></script>-->
        <!--        <script src="bower_components/swiper/dist/js/swiper.jquery.min.js"></script>-->
        <!--        <script src="bower_components/javascript-detect-element-resize/jquery.resize.js"></script>-->
        <!--        <script src="bower_components/angular-gridster/dist/angular-gridster.min.js"></script>-->
        <!--        <script src="shell_specific_components/libs/newblur.min.js"></script>-->
        <!--        <script src="shell_specific_components/libs/angular-swiper.js"></script>-->
        <!--        <script src="shell_specific_components/libs/v-accordion.min.js"></script>-->
        <script src="bower_components/perfect-scrollbar/min/perfect-scrollbar.min.js"></script>
        <script src="bower_components/perfect-scrollbar/min/perfect-scrollbar.with-mousewheel.min.js"></script>
        <script src="bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js"></script>
        <!--        <script src="bower_components/angular-click-outside-master/clickoutside.directive.js"></script>-->
        <script src="bower_components/angular-scroll/angular-scroll.min.js"></script>
        <!--        <script src="shell_specific_components/libs/ng-croppie.min.js"></script>-->
        <!--        <script src="bower_components/ngContextMenu-master/dist/ng-contextmenu.js"></script>-->
        <script src="bower_components/oclazyload/dist/ocLazyLoad.js"></script>
        <!-- <script src="angular-material-icons.min.js"></script> -->
        <!-- endbuild -->
        <!-- UI Micro Kernal Modules -->
        <script src="/uimicrokernel/socket.io-1.2.0.js"></script>
        <script src="/uimicrokernel/uimicrokernel.js"></script>
        <!-- Shell Specific Global Modules -->
        <!--build:js js/main.min.js -->
        <script src="shell_specific_components/libs/mambatidirectives.js"></script>
        <script src="bower_components/color-thief/src/color-thief.js"></script>
        <script src="shell_specific_components/libs/angular-colorthief.min.js"></script>
        <!--        <script src="shell_specific_components/libs/widget.js"></script>-->
        <script src="shell_specific_components/libs/mambatirenderingengine.js"></script>
        <!--        <script src="shell_specific_components/filters/dw-shell-common-filters.js"></script>-->
        <!--        <script src="shell_specific_components/libs/childapp-container-directive.js"></script>-->
        <script src="shell_specific_components/applicationbootstrap/duoworld-frameworkshell.js"></script>
        <script src="shell_specific_components/applicationbootstrap/duoworld-childstates.js"></script>
        <script src="shell_specific_components/applicationbootstrap/duoworld-themeconfiguration.js"></script>
        <script src="shell_specific_components/factories/duoworld-data-factory.js"></script>
        <!--        <script src="shell_specific_components/factories/duoworld-tennantinfo-factory.js"></script>-->
        <!--        <script src="shell_specific_components/controllers/duoworld-frameworkentrycontroller.js"></script>-->
        <script src="shell_specific_components/controllers/duoworld-framework-shell-controller.js"></script>
        <!--        <script src="shell_specific_components/controllers/duoworld-panel-applicationspanelcontroller.js"></script>-->
        <!--        <script src="shell_specific_components/controllers/duoworld-framework-shell-dock-controller.js"></script>-->
        <!--        <script src="shell_specific_components/controllers/duoworld-framework-shell-launcher-controller.js"></script>-->
        <!--        <script src="shell_specific_components/controllers/duoworld-framework-shell-launcher-customapps-controller.js"></script>-->
        <!--        <script src="shell_specific_components/controllers/duoworld-framework-shell-launcher-defaultapps-controller.js"></script>-->
        <!--        <script src="scripts/defaultappcontrollers/duoworld-framework-shell-childapp-userprofile-controller.js"></script>-->
        <!--        <script src="scripts/defaultappcontrollers/duoworld-framework-shell-childapp-settings-controller.js"></script>-->
        <!--        <script src="shell_specific_components/controllers/cloudcharge.js"></script>-->
        <!-- endbuild -->


        <!--
        <script src="/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="/bower_components/angular-messages/angular-messages.min.js"></script>
<script src="core_apps/appmarket/js/angular-material-icons.js"></script>
<script data-require="angular-filter@*" data-semver="0.5.2" src="core_apps/appmarket/js/angular-filter.js"></script>
<script src="core_apps/appmarket/js/cloudcharge.js"></script>
<script src="core_apps/appmarket/js/v-accordion.min.js"></script>
<script src="core_apps/appmarket/js/directivelibrary.js"></script>


<script src="core_apps/appmarket/js/controllers/viewCtrl.js"></script>
<script src="core_apps/appmarket/js/controllers/config.js"></script>
<script src="core_apps/appmarket/js/controllers/viewProductCtrl.js"></script>
<script src="core_apps/appmarket/js/controllers/rateCtrl.js"></script>
<script src="core_apps/appmarket/js/controllers/myAppsCtrl.js"></script>
<script src="core_apps/appmarket/js/controllers/addCardCtrl.js"></script>
<script src="core_apps/appmarket/js/controllers/myCardsCtrl.js"></script>
<script src="core_apps/appmarket/js/controllers/searchCtrl.js"></script>
<script src="core_apps/appmarket/js/controllers/successPageCtrl.js"></script>


<script src="core_apps/appmarket/js/jquery.bxslider.min.js"></script>
-->
    </body>

    </html>
