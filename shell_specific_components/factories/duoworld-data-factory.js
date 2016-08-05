angular.module('mambatiFrameworkShell').factory('shellDataFactory', function ($presence, $http, $auth, $objectstore, $rootScope, $q) {

    $rootScope.shellConfig = "";
    var factory = this;
    factory.userProfileDetails = null;
    factory.profilePicture = "";
    factory.authObject = "";
    factory.shellConfig = "";
    factory.allApps = "";
    factory.allWidgets = [{
        Name: "clock",
        image: "images/widget/clock.png",
        color: 'lime',
        icon: 'ic_watch_24px.svg'
        }, {
        Name: "weather",
        image: "images/widget/weather.png",
        color: 'yellow',
        icon: 'ic_cloud_24px.svg'
        }, {
        Name: "userprofile",
        image: "images/widget/profile.png",
        color: 'red',
        icon: 'ic_person_24px.svg'
        }, {
        Name: "calender",
        image: "images/widget/calender.png",
        color: 'blue',
        icon: 'ic_timer_24px.svg'
        }];
    factory.defaultThemes = [
        {
            primarypaletteName: 'red',
            primarypalette: '#F44336',
            accentpalette: '#FFC107'
            }
            , {
            primarypaletteName: 'pink',
            primarypalette: '#E91E63',
            accentpalette: '#CDDC39'
            }
            , {
            primarypaletteName: 'purple',
            primarypalette: '#9C27B0',
            accentpalette: '#00BCD4'
            }
            , {
            primarypaletteName: 'deep-purple',
            primarypalette: '#673AB7',
            accentpalette: '#FF5722'
            }
            , {
            primarypaletteName: 'indigo',
            primarypalette: '#3F51B5',
            accentpalette: '#FF4081'
            }
            , {
            primarypaletteName: 'blue',
            primarypalette: '#2196F3',
            accentpalette: '#607D8B'
            }
            , {
            primarypaletteName: 'light-blue',
            primarypalette: '#03A9F4',
            accentpalette: '#FF5252'
            }
            , {
            primarypaletteName: 'cyan',
            primarypalette: '#00BCD4',
            accentpalette: '#FFC107'
            }
            , {
            primarypaletteName: 'teal',
            primarypalette: '#009688',
            accentpalette: '#FF9800'
            }
            , {
            primarypaletteName: 'green',
            primarypalette: '#4CAF50',
            accentpalette: '#7C4DFF'
            }
            , {
            primarypaletteName: 'light-green',
            primarypalette: '#8BC34A',
            accentpalette: '#607D8B'
            }
            , {
            primarypaletteName: 'lime',
            primarypalette: '#CDDC39',
            accentpalette: '#00BCD4'
            }
            , {
            primarypaletteName: 'yellow',
            primarypalette: '#FFEB3B',
            accentpalette: '#536DFE'
            }
            , {
            primarypaletteName: 'amber',
            primarypalette: '#FFC107',
            accentpalette: '#03A9F4'
            }
            , {
            primarypaletteName: 'orange',
            primarypalette: '#FF9800',
            accentpalette: '#009688'
            }
            , {
            primarypaletteName: 'deep-orange',
            primarypalette: '#FF5722',
            accentpalette: '#CDDC39'
            }
            , {
            primarypaletteName: 'brown',
            primarypalette: '#795548',
            accentpalette: '#CDDC39'
            }
            , {
            primarypaletteName: 'grey',
            primarypalette: '#9E9E9E',
            accentpalette: '#00BCD4'
            }
            , {
            primarypaletteName: 'blue-grey',
            primarypalette: '#607D8B',
            accentpalette: '#FFC107'
            }
		];
    factory.defaultWallPapers = [{
            imgUrl: 'images/shellassets/background/background1.gif',
            thumb: 'images/shellassets/background/250x250_blur-background1.jpg'
            }
            , {
            imgUrl: 'images/shellassets/background/background2.gif',
            thumb: 'images/shellassets/background/250x250_blur-background2.jpg'
            }
            , {
            imgUrl: 'images/shellassets/background/background3.gif',
            thumb: 'images/shellassets/background/250x250_blur-background3.jpg'
            }
            , {
            imgUrl: 'images/shellassets/background/background4.gif',
            thumb: 'images/shellassets/background/250x250_blur-background9.jpg'
            }
            , {
            imgUrl: 'images/shellassets/background/background5.gif',
            thumb: 'images/shellassets/background/250x250_blur-background4.jpg'
            }
            , {
            imgUrl: 'images/shellassets/background/background6.gif',
            thumb: 'images/shellassets/background/250x250_blur-background5.jpg'
            }
            , {
            imgUrl: 'images/shellassets/background/blur-background6.jpg',
            thumb: 'images/shellassets/background/250x250_blur-background6.jpg'
            }
            , {
            imgUrl: 'images/shellassets/background/blur-background8.jpg',
            thumb: 'images/shellassets/background/250x250_blur-background8.jpg'
            }
		];

    return {
        getUserProfileDetails: function () {
            $presence.setOnline();
            var deferred = $q.defer();
            if (factory.userProfileDetails !== null) {
                deferred.resolve(factory.userProfileDetails);
            } else {
                $http.get("http://" + window.location.hostname + "/auth/GetSession/" + $auth.getSecurityToken() + "/" + window.location.hostname).success(function (data) {
                    factory.authObject = data;
                    $http.get("/apis/profile/userprofile/" + factory.authObject.Email).success(function (data) {
                        factory.userProfileDetails = data;
                        //return factory.userProfileDetails;
                        deferred.resolve(factory.userProfileDetails);
                    }).error(function (data) {
                        factory.userProfileDetails = data;
                        deferred.resolve("failed");
                        //return factory.userProfileDetails;
                    });
                }).error(function (data) {
                    // return false;
                    deferred.resolve("failed");
                });
            };

            return deferred.promise;
        },

        setUserProfilePicture: function (data) {
            factory.profilePicture = data;
        },

        getUserProfilePicture: function () {
            return factory.profilePicture;
        },

        setShellConfig: function (data) {
            factory.shellConfig = data;
            //$rootScope.shellConfig = factory.shellConfig;
        },

        getShellConfig: function () {
            return factory.shellConfig;
        },

        getThemeConfig: function () {
            return factory.shellConfig.themeconfiguration;
        },

        setAllApps: function (data) {
            factory.allApps = data;
        },

        getAllApps: function () {
            return factory.allApps;
        },

        getAllWidgets: function () {
            return factory.allWidgets;
        },

        getDefaultThemes: function () {
            return factory.defaultThemes;
        },

        getDefaultWallpapers: function () {
            return factory.defaultWallPapers;
        },



    }
});
