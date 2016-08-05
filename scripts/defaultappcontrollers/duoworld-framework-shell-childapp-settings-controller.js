//duoworld-framework-shell-launcher-settings-ctrl
(function () {
    var duoworldFrameworkShellLauncherSettingsControl = function ($rootScope, $scope, $state, $objectstore, $http, $rootScope, $timeout, $mdToast, $mdDialog, $uploader, $auth, $ocLazyLoad, shellDataFactory) {

        //variable declarations
        var vm = this;
        vm.shellConfig = shellDataFactory.getShellConfig();
        vm.originalConfig = angular.copy(vm.shellConfig);
        vm.defaultThemes = shellDataFactory.getDefaultThemes();
        vm.defaultWallPapers = shellDataFactory.getDefaultWallpapers();
        vm.customItemMap = "";
        vm.gridsterOpts = "";
        vm.uploadingWallpaper = false;
        vm.newPanelType = "Collections";


        //*************************************************************************************************
        //function declarations
        vm.childApplicationClose = childApplicationClose;
        vm.saveGlobalSettings = saveGlobalSettings;
        vm.changeTheme = changeTheme;
        vm.changeWallPaper = changeWallPaper;
        vm.saveGlobalSettings = saveGlobalSettings;
        vm.uploadNewWallpaper = uploadNewWallpaper;
        vm.file_changed = file_changed;
        vm.checkForPositionChange = checkForPositionChange;
        vm.getPanelCount = getPanelCount;
        vm.showAddNewPanel = showAddNewPanel;
        vm.matchPanelArrangement = matchPanelArrangement;
        vm.addNewPanel = addNewPanel;
        vm.close = close;
        vm.deletePanel = deletePanel;

        //*************************************************************************************************
        //default execution
        vm.customItemMap = {
            sizeX: '1',
            sizeY: '1',
            row: 'pannelRepNode.row',
            col: 'pannelRepNode.col'
        };

        vm.gridsterOpts = {
            columns: 4, // the width of the grid, in columns
            pushing: true, // whether to push other items out of the way on move or resize
            floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            swapping: true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
            width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            rowHeight: '180', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            //margins: [10, 10], // the pixel distance between each widget
            outerMargin: true, // whether margins apply to outer edges of the grid
            isMobile: false, // stacks the grid items if true
            mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
            mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
            minColumns: 4, // the minimum columns the grid must have
            minRows: 1, // the minimum height of the grid, in rows
            maxRows: 1,
            defaultSizeX: 2, // the default width of a gridster item, if not specifed
            defaultSizeY: 1, // the default height of a gridster item, if not specified
            minSizeX: 1, // minimum column width of an item
            maxSizeX: null, // maximum column width of an item
            minSizeY: 1, // minumum row height of an item
            maxSizeY: 150, // maximum row height of an item
            resizable: {
                enabled: false
            },
            draggable: {
                enabled: true, // whether dragging items is supported
                stop: function (event, $element, widget) {
                        //console.log(event,$element,widget);
                        checkForPositionChange();
                    } // optional callback fired when item is finished dragging
            }
        };

        $scope.$watch('vm.shellConfig.docklayoutconfiguration.pannelcollection', vm.matchPanelArrangement, true);

        //        $scope.$watch('vm.shellConfig.themeconfiguration', function () {
        //            shellDataFactory.setShellConfig(vm.shellConfig);
        //        }, true);

        $scope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (!angular.equals(vm.shellConfig, vm.originalConfig)) {
                    vm.saveGlobalSettings();
                };
            })

        //*************************************************************************************************
        //implementation
        function childApplicationClose() {
            if (!angular.equals(vm.shellConfig, vm.originalConfig)) {
                vm.saveGlobalSettings();
            };
            $state.go('dock');
        };

        function changeTheme(selectedTheme, theme) {
            vm.shellConfig.themeconfiguration.theme = theme;
            vm.shellConfig.themeconfiguration.palettename = selectedTheme.primarypaletteName;
            vm.shellConfig.themeconfiguration.primarypalette = selectedTheme.primarypalette;
            vm.shellConfig.themeconfiguration.accentpalette = selectedTheme.accentpalette;
        };

        function changeWallPaper(wallPaper) {
            vm.shellConfig.backgroundconfiguration[2].backgroundimageconfig.imageurl = wallPaper.imgUrl;
        };

        function saveGlobalSettings() {
            vm.shellConfig.username = $auth.getUserName();
            var client = $objectstore.getClient("shellconfig");
            client.onComplete(function (data) {
                $mdToast.show($mdToast.simple().content('Changes have been saved !').hideDelay(3000));
                //shellnotification
                //$rootScope.sendBulkNotification('shell congiguration changed');
                $rootScope.sendShellNotification('shell configuration changed');
            });
            client.onError(function (data) {
                $mdToast.show($mdToast.simple().content('Something went wrong!').hideDelay(3000));
            });
            client.insert(vm.shellConfig, {
                KeyProperty: "username"
            });
        };

        function uploadNewWallpaper() {
            $mdDialog.hide();
            document.getElementById("selectPicture").click();
        };

        function file_changed(element) {
            vm.uploadingWallpaper = true;
            var photofile = element.files[0];
            //console.log(photofile, $auth.getUserName());
            var localWallpaper = "";
            var reader = new FileReader();
            reader.onload = function () {
                localWallpaper = {
                    imgUrl: reader.result
                };
                //$scope.changeWallPaper(localWallpaper);
            }
            reader.readAsDataURL(photofile);
            //$uploader.upload("duosoftware.com", "shellConfigWallpapers", photofile, $auth.getUserName(), true);
            $uploader.uploadMedia("shellConfigWallpapers", photofile, "background.jpg");
            $uploader.onSuccess(function (data) {
                $mdToast.show($mdToast.simple().content('Successfully uploaded wallpaper!').hideDelay(3000));
                vm.uploadingWallpaper = false;
                localWallpaper.imgUrl = "/apis/media/tenant/shellConfigWallpapers/background.jpg";
                vm.changeWallPaper(localWallpaper);
                $rootScope.sendShellNotification('Wallpaper updated');
                // console.log(data);
            });
            $uploader.onError(function (data) {
                //console.log(data);
                $mdToast.show($mdToast.simple().content('Something went wrong !').hideDelay(3000));
                vm.uploadingWallpaper = false;
            });
        };

        function checkForPositionChange() {
            var posAvailability = {
                one: false,
                two: false,
                three: false
            };
            for (var a = 0; a < vm.shellConfig.docklayoutconfiguration.pannelcollection.length; a++) {
                vm.shellConfig.docklayoutconfiguration.pannelcollection[a].panelArrangement = vm.shellConfig.docklayoutconfiguration.pannelcollection[a].row + vm.shellConfig.docklayoutconfiguration.pannelcollection[a].col;

                if (vm.shellConfig.docklayoutconfiguration.pannelcollection[a].panelArrangement === 0) {
                    posAvailability.one = true;
                    console.log("one found");
                }
                if (vm.shellConfig.docklayoutconfiguration.pannelcollection[a].panelArrangement === 1) {
                    posAvailability.two = true;
                }
                if (vm.shellConfig.docklayoutconfiguration.pannelcollection[a].panelArrangement === 2) {
                    posAvailability.three = true;
                }
            };

            if (posAvailability.one == false) {
                //console.log("one missing");
                for (b = 0; b < vm.shellConfig.docklayoutconfiguration.pannelcollection.length; b++) {
                    console.log("old" + vm.shellConfig.docklayoutconfiguration.pannelcollection[b].col)
                    vm.shellConfig.docklayoutconfiguration.pannelcollection[b].col = vm.shellConfig.docklayoutconfiguration.pannelcollection[b].col - 1;
                    console.log("ofgdld" + vm.shellConfig.docklayoutconfiguration.pannelcollection[b].col);
                }
            }

            if (posAvailability.two == false) {
                // console.log("two missing");
                for (c = 0; c < vm.shellConfig.docklayoutconfiguration.pannelcollection.length; c++) {
                    if (vm.shellConfig.docklayoutconfiguration.pannelcollection[c].panelArrangement > 1) {
                        console.log("old" + vm.shellConfig.docklayoutconfiguration.pannelcollection[c].col)
                        vm.shellConfig.docklayoutconfiguration.pannelcollection[c].col = vm.shellConfig.docklayoutconfiguration.pannelcollection[c].col - 1;
                        console.log("ofgdld" + vm.shellConfig.docklayoutconfiguration.pannelcollection[c].col);
                    }
                }
            }
            if (posAvailability.three == false) {
                //console.log("three missing");
                for (d = 0; d < vm.shellConfig.docklayoutconfiguration.pannelcollection.length; d++) {
                    if (vm.shellConfig.docklayoutconfiguration.pannelcollection[d].panelArrangement > 2) {
                        console.log("old" + vm.shellConfig.docklayoutconfiguration.pannelcollection[d].col)
                        vm.shellConfig.docklayoutconfiguration.pannelcollection[d].col = vm.shellConfig.docklayoutconfiguration.pannelcollection[d].col - 1;
                        console.log("ofgdld" + vm.shellConfig.docklayoutconfiguration.pannelcollection[d].col);
                    }
                }
            }
        }

        function getPanelCount(num) {
            var ans = 4 - num
            return new Array(ans);
        }

        function showAddNewPanel(ev) {
            $mdDialog.show({
                controller: 'duoworld-framework-shell-launcher-settings-ctrl as vm',
                templateUrl: 'partials/modal-templates/partials.modal-templates.addnewpanel.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {}, function () {});
        };

        function matchPanelArrangement() {
            for (a = 0; a < vm.shellConfig.docklayoutconfiguration.pannelcollection.length; a++) {
                vm.shellConfig.docklayoutconfiguration.pannelcollection[a].panelArrangement = vm.shellConfig.docklayoutconfiguration.pannelcollection[a].row + vm.shellConfig.docklayoutconfiguration.pannelcollection[a].col;
            };
        }

        function addNewPanel() {
            $mdDialog.hide();
            var lastposition = "0";
            var prevPanelPosition = {
                "col": 0,
                "row": 1
            }
            for (b = 0; b < vm.shellConfig.docklayoutconfiguration.pannelcollection.length; b++) {
                if (vm.shellConfig.docklayoutconfiguration.pannelcollection[b].panelArrangement > lastposition) {
                    lastposition = vm.shellConfig.docklayoutconfiguration.pannelcollection[b].panelArrangement;
                    prevPanelPosition = vm.shellConfig.docklayoutconfiguration.pannelcollection[b];
                };
            };
            console.log(prevPanelPosition);
            if (prevPanelPosition.col == 3) {
                var newPanelPosition = {
                    "col": 0,
                    "row": parseInt(prevPanelPosition.row + 1)
                };
            } else {
                var newPanelPosition = {
                    "col": parseInt(prevPanelPosition.col + 1),
                    "row": prevPanelPosition.row
                }
            };
            var obj = {
                "shellRelationship": "DuoWorld Alpha Shell v 1.0",
                "panelDescription": "Framework shell applications panel",
                "panelTitle": vm.newPanelTitle,
                "pannnelDirectiveContentTemplate": "partials/panel-templates/collections-pannel.html",
                "panelArrangement": newPanelPosition.row + newPanelPosition.col,
                "pannelContentCollectionType": "application-component",
                "row": newPanelPosition.row,
                "col": newPanelPosition.col,
                "panelType": vm.newPanelType
            };
            vm.shellConfig.docklayoutconfiguration.pannelcollection.push(obj);

            console.log(vm.addNewPanelsCount);
            //console.log(obj);
            $mdToast.show($mdToast.simple().content('Successfully added panel!').hideDelay(3000));
            //shellnotification
            $rootScope.sendShellNotification('new panel ' + vm.newPanelTitle + ' added');
        };

        function close() {
            $mdDialog.cancel();
        };

        function deletePanel(panel) {
            for (a = 0; a < vm.shellConfig.docklayoutconfiguration.pannelcollection.length; a++) {
                if (vm.shellConfig.docklayoutconfiguration.pannelcollection[a].panelTitle == panel.panelTitle) {
                    vm.shellConfig.docklayoutconfiguration.pannelcollection.splice(a, 1);
                    vm.checkForPositionChange();
                    $mdToast.show($mdToast.simple().content('Successfully Deleted panel!').hideDelay(3000));
                    $rootScope.sendShellNotification('Panel ' + panel.panelTitle + ' deleted');
                };
            };
        };
    };

    duoworldFrameworkShellLauncherSettingsControl.$inject = ['$rootScope', '$scope', '$state', '$objectstore', '$http', '$rootScope', '$timeout', '$mdToast', '$mdDialog', '$uploader', '$auth', '$ocLazyLoad', 'shellDataFactory'];

    angular.module('mambatiFrameworkShell').controller('duoworld-framework-shell-launcher-settings-ctrl', duoworldFrameworkShellLauncherSettingsControl);
})();
