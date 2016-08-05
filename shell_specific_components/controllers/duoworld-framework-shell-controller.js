// duoworld-framework-shell-ctrl.js
(function () {
    'use strict';
    var duoWorldFrameworkShellCtrl = function ($rootScope, $scope, $state, $http, $location, $mdSidenav, $mdDialog, $mdToast, $presence, $auth, $apps, $v6urls, $helpers, $objectstore, $timeout, $fws, $document, $q, $storage, $mdBottomSheet, $ocLazyLoad, shellDataFactory, $mdMedia, $mdPanel) {

        //variable declarations
        var vm = this;
        vm.selectedTennantID = document.domain; //framework tennant ID
        vm.allApps = []; //framework all applications
        vm.isLoggedIn = false; //framework logged in default status
        vm.content = ""; //user profile details
        $rootScope.profilePicture;
        vm.shellConfig = shellDataFactory.getShellConfig();
        vm.allApps = "";
        vm.allWidgets = "";
        $rootScope.showGlobalProgress = false;

        //$rootScope.shellConfig = {}; //framework configuration
        $rootScope.frameworkShellSecurityToken = ""; //framwork shell security token
        $rootScope.dwFrameworkActiveApps = []; //framework active apps
        $rootScope.recivedTennantCollection = []; // framework recived tennant collection
        $rootScope.frameworkFavoriteApplication = [];
        $rootScope.currenttenantsessioninfo = [];
        $rootScope.shellUserProfileSection = [];
        $rootScope.v6urls = $v6urls;
        $rootScope.opendAppIconUrl = "";
        $rootScope.shellRoutedAppName = "";
        // $rootScope.panelCustomizingTray = false;
        vm.fullScreenOn = false;
        vm.content = "";

        //function declarations
        vm.frameworkSessionCheck = frameworkSessionCheck;
        vm.getFrameworkSessionInfo = getFrameworkSessionInfo;
        vm.frameworkSessionLog = frameworkSessionLog;
        vm.loadTenantConfig = loadTenantConfig;
        vm.getDefaultShellConfig = getDefaultShellConfig;
        vm.loadShellConfig = loadShellConfig;
        vm.globalTenantRetrivel = globalTenantRetrivel;
        $rootScope.globalAppRetrivel = globalAppRetrivel;
        vm.addMissingGridsterFields = addMissingGridsterFields;
        vm.dwFrameworkBuiltinAppNavigation = dwFrameworkBuiltinAppNavigation;
        vm.appUninstall = appUninstall;
        vm.quitApplication = quitApplication;
        vm.switchFullScreen = switchFullScreen;
        vm.exitFullScreen = exitFullScreen;
        vm.showSiteTour = showSiteTour;
        vm.childApplicationClose = childApplicationClose;
        vm.makeSwitchTennant = makeSwitchTennant;
        vm.deleteApp = deleteApp;
        vm.toggleLeftMenu = toggleLeftMenu;
        vm.toggleNotifications = toggleNotifications;
        vm.quickLaunchAppAccess = quickLaunchAppAccess;
        vm.showApplicationPanel = showApplicationPanel;

        //************************************************************************************************************

        //default executions
        frameworkSessionCheck(); //framework session check

        getFrameworkSessionInfo();

        frameworkSessionLog();

        loadTenantConfig();

        shellDataFactory.getUserProfileDetails()
            .then(function (data) {
                vm.content = data;
                $rootScope.profilePicture = "/apis/media/profilepic/get/" + vm.content.Email;
                shellDataFactory.setUserProfilePicture($rootScope.profilePicture);
            }, function (data) {
                vm.content = "";
                $rootScope.profilePicture = "/apis/media/profilepic/get/" + vm.content.Email;
                shellDataFactory.setUserProfilePicture($rootScope.profilePicture);
            })


        globalTenantRetrivel(); //framework tenant retrival

        $rootScope.globalAppRetrivel();

        addMissingGridsterFields(vm.allApps); //optional for testing purposes only

        vm.allWidgets = shellDataFactory.getAllWidgets();
        //************************************************************************************************************       

        //implementations
        function frameworkSessionCheck() {
            if ($auth.checkSession()) {
                vm.isLoggedIn = true;
            } else {
                vm.isLoggedIn = false;
            }
        };

        function getFrameworkSessionInfo() {
            $rootScope.currenttenantsessioninfo = $auth.getSession();
            //console.log($rootScope.currenttenantsessioninfo);
        }

        function frameworkSessionLog() {
            if (vm.isLoggedIn === true) {
                $state.go("dock");
                $rootScope.frameworkShellSecurityToken = $auth.getSecurityToken();
            } else {
                $state.go("unrecognized");
            }
        };

        function getDefaultShellConfig() {
            console.log("getting defaut shell configuration");
            $http.get("shell_specific_components/local_data/shellconfiguration.json").
            success(function (data, status, headers, config) {
                console.log(data);
                vm.shellConfig = data;
                shellDataFactory.setShellConfig(vm.shellConfig);
                //return data;
            }).
            error(function (data, status, headers, config) {
                console.log("failed defualt");
                //return false;
            });
        };

        function loadShellConfig() {
            console.log("loading shell config");
            var client = $objectstore.getClient("shellconfig");
            client.onGetOne(function (data, status, headers, config) {
                console.log(data);
                //return data;
                if (data === undefined || data === null || data.shellConfiguration === undefined) {
                    if (vm.shellConfig === undefined || vm.shellConfig === null || vm.shellConfig.shellConfiguration === undefined) {
                        getDefaultShellConfig();
                    } else {
                        return vm.shellConfig;
                    }
                    //$rootScope.globalAppRetrivel();
                } else {
                    vm.shellConfig = data;
                    shellDataFactory.setShellConfig(vm.shellConfig);
                    // return vm.shellConfig;
                };
            });
            client.onError(function (data, status, headers, config) {
                console.log("failed shell config");
                getDefaultShellConfig();
                //return false;
            });
            client.getByKey($auth.getUserName());
        };

        function loadTenantConfig() {
            console.log("loading tenant config")
            $http.get("/apis/usertenant/tenant/shell/configurations").
            success(function (data, status, headers, config) {
                //return data;
                vm.shellConfig = data;
                shellDataFactory.setShellConfig(vm.shellConfig);
                console.log(data);
                //$rootScope.tenantConfig = data;

                if (vm.shellConfig === undefined || vm.shellConfig === null || vm.shellConfig.shellConfiguration === undefined) {
                    loadShellConfig();
                    //$rootScope.globalAppRetrivel();
                } else {
                    if (vm.shellConfig.shellConfiguration.userEditable === true) {
                        loadShellConfig();
                    } else {
                        //return vm.shellConfig;
                    }
                };

            }).
            error(function (data, status, headers, config) {
                console.log("failed tenant");
                getDefaultShellConfig();
                //return false;
            });
        };

        function globalTenantRetrivel() {
            $http.get($rootScope.v6urls.auth + "/tenant/GetTenants/" + $rootScope.frameworkShellSecurityToken + "").
            success(function (data, status, headers, config) {
                $rootScope.recivedTennantCollection = data;
                // console.log($rootScope.recivedTennantCollection);
            }).
            error(function (data, status, headers, config) {
                //console.log(data);
            });
        };

        function addMissingGridsterFields(apps) {
            var x = 1;
            var y = 0;
            for (var a = 0; a < apps.length; a++) {
                apps[a].col = y;
                apps[a].row = x;
                y = y + 1;
                if (y == 5) {
                    x = x + 1;
                    y = 0;
                };
            };
            vm.allApps = apps;
            shellDataFactory.setAllApps(vm.allApps);

        };

        function globalAppRetrivel() {
            $apps.onAppsRetrieved(function (e, data) {
                var appIconHostName = window.location.hostname;
                for (var appIndex in data.apps) {
                    var iconUrl = data.apps[appIndex].iconUrl;
                    if (iconUrl) {
                        if (iconUrl.indexOf("http") === 0) {
                            data.apps[appIndex].iconUrl = iconUrl;
                        } else {
                            data.apps[appIndex].iconUrl = window.location.protocol + "//" + appIconHostName + iconUrl;
                        }
                    } else {
                        data.apps[appIndex].iconUrl = "/devportal/appicons/29fa48d1ffbb1f3792a417cda647df7d.png";
                    }
                }
                vm.allApps = data.apps;
                addMissingGridsterFields(vm.allApps);
                // $rootScope.allApps = $scope.allApps;
            });
            $apps.getAppsForUser();
        };

        function dwFrameworkBuiltinAppNavigation(appName) {
            switch (appName) {
                case "market place":
                    $state.go("launcher.marketplace");
                    $rootScope.shellRoutedAppName = "Marketplace";
                    break;
                case "user profile":
                    $state.go("launcher.userprofile");
                    $rootScope.shellRoutedAppName = "User Profile";
                    break;
                case "tennant explorer":
                    $state.go("launcher.tennantexplorer");
                    $rootScope.shellRoutedAppName = "Tenant Explorer";
                    break;
                case "settings":
                    $state.go("launcher.settings");
                    $rootScope.shellRoutedAppName = "Settings";
                    break;
                default:
                    //console.log('wrong selection !');
            }
        };

        function appUninstall(appObject) {
            $objectstore.getClient("application").onComplete(function (data) {
                console.log(data);
            }).onError(function (data) {
                console.log(data);
            }).delete(appObject, {
                "KeyProperty": "ApplicationID"
            });
        };

        function quitApplication(ev) {
            var confirm = $mdDialog.confirm()
                .title('Say GoodBye?')
                .textContent('are you sure you want to continue?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Do it!')
                .cancel('Oh No!');
            $mdDialog.show(confirm).then(function () {
                location.replace("/logout.php"); //logout location change
            }, function () {

            });
        };

        function switchFullScreen() {
            var i = document.body;
            console.log(document.fullscreenElement, !document.webkitFullscreenElement);
            if (!document.fullscreenElement || !document.webkitFullscreenElement || !document.mozFullscreenElement || !document.msFullscreenElement) {
                vm.fullScreenOn = true;
                if (i.requestFullscreen) {
                    i.requestFullscreen();
                } else if (i.webkitRequestFullscreen) {
                    i.webkitRequestFullscreen();
                } else if (i.mozRequestFullScreen) {
                    i.mozRequestFullScreen();
                } else if (i.msRequestFullscreen) {
                    i.msRequestFullscreen();
                }
            }
        }

        function exitFullScreen() {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement) {
                console.log("closing fullscreen");
                vm.fullScreenOn = false;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }

        function showSiteTour() {
            $mdDialog.show({
                controller: introController,
                templateUrl: 'partials/modal-templates/partials.modal-templates.intro.html',
            });
        };

        function introController($scope, $mdDialog) {
            $scope.closeIntro = function () {
                $mdDialog.cancel();
            }

        }

        function childApplicationClose() {
            var mainAppContainer = angular.element('.md-child-application-container');
            mainAppContainer.css({
                'transform': 'translateY(100vh)',
            });
            $timeout(function () {
                $state.go('dock');
            }, 50);
        };

        function makeSwitchTennant(tennantDomain, ev) {
            var switchConfirm = $mdDialog.confirm().title('Tennant switch confirm.').content('Are you sure you want to switch to "' + tennantDomain + '" ?').ariaLabel('Switch Tennant').ok('Yes go ahead !').cancel('Dont do it').targetEvent(ev);
            $mdDialog.show(switchConfirm).then(function () {
                window.open('http://' + tennantDomain, '_blank');
                // location.replace('http://'+tennantDomain);
            }, function () {});
        };

        function deleteApp(data) {
            $http.get('/apps/' + data.ApplicationID + '?uninstall=' + $auth.getUserName()).success(function (response) {
                // console.log(response);
                $rootScope.globalAppRetrivel();
                $mdToast.show($mdToast.simple().content(data.Name + ' uninstalled successfully!').position("right bottom").hideDelay(3000));
            }).error(function (data) {
                // console.log(data);
                $mdToast.show($mdToast.simple().content('couldnt uninstall').position("right bottom").hideDelay(3000));
            });
        };

        function toggleLeftMenu() {
            $mdSidenav("left").toggle();
        };

        function toggleNotifications() {
            $mdSidenav("right").toggle();
        };

        function quickLaunchAppAccess(appdetail) {
            toggleLeftMenu();
            var quickLaunchUri = "launcher/customapp/" + appdetail.ApplicationID + "/" + appdetail.Name;
            $location.path(quickLaunchUri);
            $rootScope.opendAppIconUrl = appdetail.iconUrl;
        };

        function showApplicationPanel(ev) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
            $mdDialog.show({
                controller: 'applicationsPanelCtrl as applications',
                templateUrl: 'partials/modal-templates/partials.modal-templates.applicationpanel.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })

        };


        //shell ntification start
        $scope.unseenNotificationCount = 0;
        $scope.shellNotifications = [];
        var NotificationColors = ['blue', 'lime', 'purple', 'grey', 'red', 'teal', 'cyan', 'amber'];
        var isNotificationMenuOpen = false;

        function getPreviousNotifications() {
            console.log($auth.getSecurityToken());
            //var domain = (window.location.host).replace(/"."/g, "");
            $http({
                method: 'GET',
                url: $rootScope.v6urls.objectStore + "/" + window.location.host + '/notifications',
                headers: {
                    securityToken: 123
                }
            }).success(function (data) {
                console.log(data.result);
                data = data.result;
                for (var x = 0; x < data.length; x++) {
                    var obj = {
                        from: data[x].from,
                        timestamp: data[x].timestamp,
                        message: data[x].content,
                        viewstatus: false,
                        color: NotificationColors[Math.floor(Math.random() * NotificationColors.length)]
                    };
                    $scope.shellNotifications.push(obj);
                };
            }).error(function (data) {
                console.log(data);
            });
        };
        getPreviousNotifications();
        $scope.showNotifications = function ($mdOpenMenu) {
            $mdOpenMenu();
            isNotificationMenuOpen = !isNotificationMenuOpen;
            if (!isNotificationMenuOpen) {
                $scope.removeAllSeenNotifications();
            };
        };
        $rootScope.sendShellNotification = function (msg) {
            // console.log("sending shell notification");
            $fws.command("notification", {
                "type": "shell",
                "from": $rootScope.currenttenantsessioninfo.Username,
                "to": $rootScope.currenttenantsessioninfo.Username,
                "message": msg,
                "tenantId": vm.selectedTennantID
            });
        };
        $rootScope.sendBulkNotification = function (msg) {
            // console.log("sending bulk notificaion");
            $fws.command("notification", {
                "type": "tenantbulkshell",
                "from": $rootScope.currenttenantsessioninfo.Username,
                "message": msg
            });
        };
        $fws.onRecieveCommand("notification_response", function (e, data) {
            console.log(data);
        });
        $fws.onRecieveCommand("send_notification", function (e, data) {
            //console.log(data);
            var obj = {
                from: data.from,
                timestamp: data.timestamp,
                message: data.content,
                viewstatus: true,
                color: NotificationColors[Math.floor(Math.random() * NotificationColors.length)]
            };
            $scope.shellNotifications.push(obj);
            $scope.unseenNotificationCount = $scope.unseenNotificationCount + 1;
        });
        $scope.removeAllSeenNotifications = function () {
            for (var q = 0; q < $scope.shellNotifications.length; q++) {
                if ($scope.shellNotifications[q].viewstatus == true) {
                    $scope.shellNotifications[q].viewstatus = false;
                };
            };
            $scope.unseenNotificationCount = 0;
        };
        $scope.isNotificationeEmpty = function () {
            var answer = true;
            for (var n = 0; n < $scope.shellNotifications.length; n++) {
                if ($scope.shellNotifications[n].viewstatus == true) {
                    answer = false
                };
            };
            return answer;
        };



    };

    duoWorldFrameworkShellCtrl.$inject = ['$rootScope', '$scope', '$state', '$http', '$location', '$mdSidenav', '$mdDialog', '$mdToast', '$presence', '$auth', '$apps', '$v6urls', '$helpers', '$objectstore', '$timeout', '$fws', '$document', '$q', '$storage', '$mdBottomSheet', '$ocLazyLoad', 'shellDataFactory', '$mdMedia', '$mdPanel'];

    angular.module('mambatiFrameworkShell').controller('duoworld-framework-shell-ctrl', duoWorldFrameworkShellCtrl);

}());
