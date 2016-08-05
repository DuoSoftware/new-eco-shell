//duoworld-framework-shell-dock-controller.js
(function () {
    var duoWorldFrameworkShellDockCtrl = function ($rootScope, $scope, $state, $presence, $auth, $apps, $helpers, $location, $ocLazyLoad, $mdDialog, shellDataFactory, $mdToast) {


        //variable declarations
        var vm = this;
        console.log(shellDataFactory);
        vm.shellConfig = shellDataFactory.getShellConfig();
        vm.allApps = shellDataFactory.getAllApps();
        vm.allWidgets = shellDataFactory.getAllWidgets();
        vm.swiper = {};
        vm.selectedPanelIndex = 0;
        vm.sliderSwipeStarted = false;
        vm.gridsterOpts = "";
        vm.customItemMap = "";
        vm.widgetItemMap = "";
        vm.showPanelEditModeFlag = false;
        //********************************************************************************************************
        //function declarations
        vm.addToPanel = addToPanel;
        vm.onReadySwiper = onReadySwiper;
        vm.showPanelEditMode = showPanelEditMode;
        $rootScope.showPanelEditMode = showPanelEditMode;
        vm.exitPanelEditMode = exitPanelEditMode;
        vm.saveGlobalSettings = saveGlobalSettings;
        vm.removeAppFromPanel = removeAppFromPanel;
        vm.handleDrop = handleDrop;
        $rootScope.handleDrop = handleDrop;
        vm.goToNextStep = goToNextStep;
        vm.goToPrevStep = goToPrevStep;
        vm.findAppInfo = findAppInfo;
        //*******************************************************************************************************
        //default executions
        console.log("%cDuoWorld", "color: blue; font-size: large");
        console.log("%cConsole log is intended for Developer purposes only", "color: red; font-size: x-large");

        //$rootScope.globalAppRetrivel();

        vm.gridsterOpts = {
            columns: 10,
            pushing: true,
            floating: false,
            swapping: true,
            width: 'auto',
            colWidth: 'auto',
            rowHeight: 140,
            outerMargin: true,
            isMobile: false,
            mobileBreakPoint: 600,
            mobileModeEnabled: true,
            minColumns: 5,
            maxColumns: 10,
            minRows: 5,
            maxRows: 5,
            defaultSizeX: 1,
            defaultSizeY: 1,
            minSizeX: 1,
            maxSizeX: null,
            minSizeY: 1,
            maxSizeY: 100,
            resizable: {
                enabled: false
            },
            draggable: {
                enabled: false,
                start: function () {
                    //console.log($scope.swiper);
                    vm.swiper.lockSwipes();
                },
                stop: function () {
                    vm.swiper.unlockSwipes();
                },
            }
        };

        vm.customItemMap = {
            sizeX: 'app.comp_extra.sizeX',
            sizeY: 'app.comp_extra.sizeY',
            row: 'app.comp_extra.row',
            col: 'app.comp_extra.col'
        };

        vm.widgetItemMap = {
            sizeX: 'componentdata.comp_extra.sizeX',
            sizeY: 'componentdata.comp_extra.sizeY',
            row: 'componentdata.comp_extra.row',
            col: 'componentdata.comp_extra.col'
        };
        //*******************************************************************************************************
        //implementation

        //ex-178 posting data between 2 apps
        window.dwShellController = {
            refreshApps: function () {
                //$rootScope.globalAppRetrivel();
            },
            openApp: function (ApplicationID, Name) {
                console.log("calling");
                var quickLaunchUri = "launcher/customapp/" + ApplicationID + "/" + Name;
                $location.path(quickLaunchUri);
            }
        }

        //panel customiztion start
        function addToPanel(app, type, x, y) {
            var selectedPanel = vm.shellConfig.docklayoutconfiguration.pannelcollection[vm.selectedPanelIndex];
            var w = window.innerWidth;
            var h = window.innerHeight;
            var posX = parseInt((x - ((w - (w * 0.7)) / 2)) / (w * 0.7 / 10));
            console.log(x, w, posX);
            var posY = parseInt((y - 60) / (140 * 0.7));
            console.log(y, posY);
            if (selectedPanel !== undefined) {
                var obj = {
                    "comp_Id": app.ApplicationID,
                    "comp_Name": app.Name,
                    "comp_Type": type,
                    "comp_Data": app,
                    "comp_extra": {
                        "visible": true,
                        "row": posY,
                        "col": posX,
                        "sizeX": 1,
                        "sizeY": 1
                    }
                }
                if (type !== "appshortcut" && type !== "appbundle") {
                    obj.comp_extra.sizeX = 2;
                    obj.comp_extra.sizeY = 2;
                    obj.comp_extra.widgetImage = app.image;
                }
                if (selectedPanel.panelComponents === undefined) {
                    selectedPanel.panelComponents = [];
                }
                selectedPanel.panelComponents.push(obj);
                vm.shellConfig.docklayoutconfiguration.pannelcollection[vm.selectedPanelIndex] = selectedPanel;
                //$scope.$apply()
            }
        };

        function onReadySwiper(swiper) {
            vm.swiper = swiper;
            console.log(vm.swiper)
                //console.log('onReadySwiper');
            swiper.on('slideChangeStart', function () {
                console.log('slideChangeStart');
                vm.selectedPanelIndex = swiper.activeIndex;
            });
            swiper.on('sliderMove', function () {
                vm.sliderSwipeStarted = true;
                console.log("swiper moving");
            });
            swiper.on('touchEnd', function () {
                vm.sliderSwipeStarted = false;
                console.log("swiper stopped");
            });
        };

        function showPanelEditMode() {
            //console.log("going to edit mode", !vm.sliderSwipeStarted);
            vm.showPanelEditModeFlag = true;
            vm.gridsterOpts.draggable.enabled = true;
        };

        function exitPanelEditMode() {
            vm.showPanelEditModeFlag = false;
            vm.gridsterOpts.draggable.enabled = false;
        }

        function saveGlobalSettings() {
            vm.shellConfig.username = $auth.getUserName();
            var client = $objectstore.getClient("shellconfig");
            client.onComplete(function (data) {
                $mdToast.show($mdToast.simple().content("Changes have been saved !").hideDelay(3000));
            });
            client.onError(function (data) {
                $mdToast.show($mdToast.simple().content("Something went wrong!").hideDelay(3000));
            });
            client.insert(vm.shellConfig, {
                KeyProperty: "username"
            });
        };

        function removeAppFromPanel(app, ev, i) {
            var selectedPanel = vm.shellConfig.docklayoutconfiguration.pannelcollection[vm.selectedPanelIndex];
            var confirm = $mdDialog.confirm().title("Would you like to delete " + app.comp_Name + " ?").textContent("the app will be removed from your collections").ariaLabel("Lucky day").targetEvent(ev).ok("Please do it!").cancel("Dont do it!");
            $mdDialog.show(confirm).then(function () {
                selectedPanel.panelComponents.splice(i, 1);
                $mdToast.show($mdToast.simple().content(app.comp_Name + " deleted").position("top right").hideDelay(2000));
            }, function () {});
        };

        function handleDrop(data) {
            console.log(data);
            var app = JSON.parse(data.dataTransfer.getData('Text'));
            console.log(app);
            if (app.ApplicationID !== undefined) {
                if (app.Apps !== undefined) {
                    vm.addToPanel(app, 'appbundle', data.x, data.y);
                } else {
                    vm.addToPanel(app, 'appshortcut', data.x, data.y);
                }
            } else {
                app.ApplicationID = app.Name + new Date();
                vm.addToPanel(app, app.Name, data.x, data.y);
            };
        };

        function goToNextStep() {
            var elmnt = document.getElementById("appTray-content");
            elmnt.scrollTop += 90;
        };

        function goToPrevStep() {
            var elmnt = document.getElementById("appTray-content");
            elmnt.scrollTop += 90;
        };
        //end of panel customization

        function findAppInfo(ev, data) {
            var selectedApp = data;
            $mdDialog.show({
                controller: appInfoController,
                templateUrl: 'partials/modal-templates/partials.modal-templates.appinfo.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    selectedAppInfo: selectedApp
                },
                clickOutsideToClose: true
            });
        };

        function appInfoController($scope, selectedAppInfo) {
            $scope.selectedAppInfo = selectedAppInfo;
        }


    };

    duoWorldFrameworkShellDockCtrl.$inject = ['$rootScope', '$scope', '$state', '$presence', '$auth', '$apps', '$helpers', '$location', '$ocLazyLoad', '$mdDialog', 'shellDataFactory', '$mdToast'];

    angular.module('mambatiFrameworkShell').controller('duoworld-framework-shell-dock-ctrl', duoWorldFrameworkShellDockCtrl);

})();
