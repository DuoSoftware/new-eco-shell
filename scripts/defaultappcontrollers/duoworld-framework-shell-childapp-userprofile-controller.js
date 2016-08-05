    (function () {
        var duoworldFrameworkShellLauncherUserprofileCtrl = function ($scope, $rootScope, $mdDialog, $window, $http, $auth, notifications, $charge, $objectstore, $storage, $uploader, $ocLazyLoad, shellDataFactory) {

            //variable declaration
            var profile = this;
            profile.shellConfig = "";
            profile.account = {};
            profile.ledger = [];
            //profile.profilePicture = shellDataFactory.getUserProfilePicture();
            profile.showMore = false;
            profile.showEdit = true;
            profile.content;
            profile.contentBeforeEdit = {};
            profile.account.AccountCards = [{
                Name: "rgereg",
                CardNo: "4242424242424242",
                CardType: "Visa",
                ExpiryMonth: 06,
                ExpiryYear: 2017,
                CSV: 123,
                cardImage: "img/visa_s.png"

            }, {
                Name: "rgereg",
                CardNo: "51173871928716214124",
                CardType: "Master Card",
                ExpiryMonth: 06,
                ExpiryYear: 2017,
                CSV: 123,
                cardImage: "img/master_s.png"

            }, {
                Name: "rgereg",
                CardNo: "3442424242424242",
                CardType: "American Express",
                ExpiryMonth: 06,
                ExpiryYear: 2017,
                CSV: 123,
                cardImage: "img/amex_s.png"

            }];
            profile.ledger = [
                {
                    TranDate: "2016.05.02",
                    TranType: "asdf",
                    TranNo: 234,
                    Amount: 10000
                },
                {
                    TranDate: "2016.05.02",
                    TranType: "asdxdf",
                    TranNo: 2334,
                    Amount: 13000
                }
            ];


            //**********************************************************************************
            //function declaration
            profile.getAllTransctions = getAllTransctions;
            profile.editProfile = editProfile
            profile.cancelChanges = cancelChanges;
            profile.saveProfile = saveProfile;
            profile.editProfilePic = editProfilePic;
            profile.toggleShowMore = toggleShowMore;
            profile.changePassword = changePassword;
            profile.editCard = editCard;
            profile.deleteCard = deleteCard;
            profile.makeDefault = makeDefault;
            profile.newCard = newCard;

            //**********************************************************************************
            //default execution
            shellDataFactory.getUserProfileDetails()
                .then(function (data) {
                    profile.content = data;
                    profile.contentBeforeEdit = angular.copy(profile.content);
                }, function (data) {
                    profile.content = "";
                })




            //**********************************************************************************
            //implementation

            $charge.payment().getAccounts().success(function (data) {
                profile.account = data[0];
                getAllTransctions(data[0].AccountId);
                //console.log($scope.account);
                for (i = 0, len = profile.account.AccountCards.length; i < len; ++i) {
                    if (profile.account.AccountCards[i].CardType == "Master" || profile.account.AccountCards[i].CardType == "Master Card") {
                        profile.account.AccountCards[i].cardImage = "img/master_s.png";
                    } else if (profile.account.AccountCards[i].CardType == "Visa") {
                        profile.account.AccountCards[i].cardImage = "img/visa_s.png";
                    } else if (profile.account.AccountCards[i].CardType == "Amex" || profile.account.AccountCards[i].CardType == "American Express") {
                        profile.account.AccountCards[i].cardImage = "img/amex_s.png";
                    }
                }
            }).error(function (data) {
                console.log(data);
            })

            function getAllTransctions(accountId) {
                $charge.payment().getTransactions(accountId).success(function (data) {
                    profile.ledger = data;
                }).error(function (data) {
                    console.log(data);
                })
            }

            function editProfile() {
                profile.showEdit = false;
            }

            function cancelChanges() {
                profile.content = angular.copy(profile.contentBeforeEdit);
                profile.showEdit = true;
            }

            function saveProfile() {
                $rootScope.showGlobalProgress = true;
                if (profile.editForm.$valid === true) {
                    profile.showEdit = true;
                    console.log(profile.content);
                    var req = {
                        method: "POST",
                        url: "/apis/profile/userprofile",
                        headers: {
                            "Content-Type": "application/json"
                                //"SecurityKey" : $auth.getSecurityToken()
                        },
                        data: profile.content
                    };
                    $http(req).then(function (data) {
                        $rootScope.showGlobalProgress = false;
                        if (data.data.IsSuccess === true) {
                            notifications.toast("Profile Updated", "success");
                            profile.showEdit = '/img/ic_mode_edit_24px.svg';
                            profile.contentBeforeEdit = angular.copy(profile.content);
                            $rootScope.sendShellNotification('Profile details updated');
                        } else {
                            notifications.toast(data.data.Message, "error", 3000);
                        }
                    }, function (data) {
                        $rootScope.showGlobalProgress = false;
                        notifications.toast("Error occurred while saving", "error", 3000);
                    });
                    profile.showEdit = '/img/ic_mode_edit_24px.svg';
                } else {
                    $rootScope.showGlobalProgress = false;
                    notifications.toast("Please enter valid data and fill all required feilds", "error");
                }
            };

            function editProfilePic(ev) {
                $rootScope.profilePicture = "img/bx_loader.gif";
                $mdDialog.show({
                    controller: 'uploadPictureCtrl',
                    templateUrl: 'partials/frameworktemplates/uploadPicture.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (answer) {
                    //$scope.progressCircle = true;
                    //if (answer == "success") {
                    $rootScope.profilePicture = "/apis/media/profilepic/get/" + profile.content.Email;
                    //}
                })
            };

            function toggleShowMore() {
                profile.showMore = !profile.showMore;
            }

            function changePassword(ev) {
                $mdDialog.show({
                    controller: 'changePasswordCtrl as password',
                    templateUrl: 'partials/frameworktemplates/changePassword.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (answer) {
                    if (answer) {
                        console.log(answer);
                    }
                })
            }

            function editCard(ev, card) {
                $mdDialog.show({
                    controller: 'addCardCtrl',
                    templateUrl: 'partials/frameworktemplates/newCard.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        cardObject: card,
                        account: profile.account,
                        userObject: profile.content
                    }
                }).then(function (answer) {
                    if (answer) {
                        profile.account = answer;
                    }
                })
            }

            function deleteCard(ev, card) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm().title('Delete Card').textContent('Are you sure you want to delete the card with the name of ' + card.Name + '?').ariaLabel('Delete Card').targetEvent(ev).ok('Delete Card').cancel('Cancel');
                $mdDialog.show(confirm).then(function () {
                    $rootScope.showGlobalProgress = true;
                    var account = angular.copy(profile.account);
                    var replaceThis = "";
                    for (i = 0, len = account.AccountCards.length; i < len; ++i) {
                        if (account.AccountCards[i].guid == card.guid) {
                            replaceThis = i;
                        } else { //console.log(i,'new card');
                        }
                    }
                    if (replaceThis || replaceThis === 0) {
                        account.AccountCards.splice(replaceThis, 1);
                        console.log(replaceThis, 'replace this card');
                    }
                    $charge.payment().newCard(account).success(function (data) {
                        profile.account = account;
                        $rootScope.showGlobalProgress = false;
                        notifications.toast("Card Successfully Deleted", "success", 3000);
                        $mdDialog.hide(data);
                    }).error(function (data) {
                        $rootScope.showGlobalProgress = false;
                        notifications.alertDialog("Error", "Failed to delete card");
                    })
                });
            }

            function makeDefault(ev, card) {
                for (i = 0, len = profile.account.AccountCards.length; i < len; ++i) {
                    profile.account.AccountCards[i].default = false;
                }
                card.default = true;
                //console.log($scope.account);
                $rootScope.showGlobalProgress = true;
                $charge.payment().newCard($scope.account).success(function (data) {
                    $rootScope.showGlobalProgress = false;
                    notifications.toast("Default card changed", "success", 3000);
                    $mdDialog.hide(data);
                }).error(function (data) {
                    $rootScope.showGlobalProgress = false;
                    notifications.alertDialog("Error", "Could not set Default card due to error");
                })
            }

            function newCard(ev) {
                $mdDialog.hide();
                if ($scope.content.BillingAddress && $scope.content.PhoneNumber) {
                    $mdDialog.show({
                        controller: 'addCardCtrl',
                        templateUrl: 'partials/frameworktemplates/newCard.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        locals: {
                            cardObject: "",
                            account: profile.account,
                            userObject: profile.content
                        }
                    }).then(function (answer) {
                        if (answer) {
                            profile.account = answer;
                        }
                    })
                } else {
                    notifications.alertDialog("Complete Profile", "Please add your Phone Number and Billing Address before adding cards");
                }
            }

        };
        duoworldFrameworkShellLauncherUserprofileCtrl.$inject = ['$scope', '$rootScope', '$mdDialog', '$window', '$http', '$auth', 'notifications', '$charge', '$objectstore', '$storage', '$uploader', '$ocLazyLoad', 'shellDataFactory'];
        angular.module('mambatiFrameworkShell').controller('duoworld-framework-shell-launcher-userprofile-ctrl', duoworldFrameworkShellLauncherUserprofileCtrl);
    })();
    //_____________________________________________________________________________________________profileCtrl start
    //_____________________________________________________________________________________________addCardCtrl start
    (function () {
        var addCardCtrl = function ($scope, $rootScope, $mdDialog, notifications, account, cardObject, userObject, $charge) {
            $scope.account = {};
            $scope.card = {};
            $scope.newCard = true;
            $scope.disableaddBtn = false;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var startYear = yyyy;
            $scope.years = [];
            for (i = 0, len = 30; i < len; ++i) {
                $scope.years.push(yyyy.toString());
                yyyy = yyyy + 1;
            }
            var monthName = "";
            $scope.months = [];
            $scope.yearChanged = function (selectedYear) {
                $scope.months = [];
                if (parseInt(selectedYear) == startYear) {
                    for (i = 1, len = 13; i < len; ++i) {
                        monthName = i;
                        if (monthName >= mm) {
                            if (monthName.toString().length == 1) {
                                monthName = "0" + i;
                            }
                            $scope.months.push(monthName.toString());
                        }
                    }
                } else {
                    for (i = 1, len = 13; i < len; ++i) {
                        monthName = i;
                        if (monthName.toString().length == 1) {
                            monthName = "0" + i;
                        }
                        $scope.months.push(monthName);
                    }
                }
            }
            if (cardObject) {
                $scope.yearChanged(cardObject.ExpiryYear);
                $scope.card = angular.copy(cardObject);
                $scope.newCard = false;
            }
            $scope.card.CardType = "";
            $scope.cardTypes = [{
                    type: "Visa",
                    validPatterns: ['41', '42', '43', '44', '45', '46', '47', '48', '49'],
                    imageUrl: "img/visa_s.png",
                    regExPattern: /^4[0-9]{12}(?:[0-9]{3})?$/
        }
                , {
                    type: "Master Card",
                    validPatterns: ['51', '52', '53', '54', '55'],
                    imageUrl: "img/master_s.png",
                    regExPattern: /^5[1-5][0-9]{14}$/
        }
                , {
                    type: "American Express",
                    validPatterns: ['37', '34'],
                    imageUrl: "img/amex_s.png",
                    regExPattern: /^3[47][0-9]{13}$/
        }
						];
            $rootScope.$watch('cardTypeRoot', function () {
                $scope.card.CardType = $rootScope.cardTypeRoot;
            })
            $scope.cancel = function () {
                $mdDialog.hide();
            }
            $scope.submit = function () {
                    var validExpiry = false;
                    var validCardNo = false;
                    var validCVS = false;
                    //var validPhoneNumber = false;
                    if ($scope.card.ExpiryYear == null || $scope.card.ExpiryMonth == null) {
                        notifications.toast("Please select the expiry date", "error");
                    } else {
                        validExpiry = true;
                    }
                    try {
                        if ($scope.card.CardType.regExPattern.test($scope.card.CardNo) == false) {
                            notifications.toast("You card no. is invalid", "error"); //card type chosen but still invalid
                        } else {
                            validCardNo = true;
                        }
                    } catch (exception) {
                        notifications.toast("You card no. is invalid", "error"); //card type doesn't even exist
                    }
                    if (!$scope.card.CSV) {
                        notifications.toast("Invalid CVV Number", "error");
                    } else {
                        //
                        if ($scope.card.CardType.type === "Visa" || $scope.card.CardType.type === "Master Card") {
                            if ($scope.card.CSV.length === 3) {
                                validCVS = true;
                            } else {
                                notifications.toast("CVV Number for " + $scope.card.CardType.type + " cards should contain 3 digits", "error", 4000);
                            }
                        } else if ($scope.card.CardType.type === "American Express") {
                            if ($scope.card.CSV.length === 4) {
                                validCVS = true;
                            } else {
                                notifications.toast("CVV Number for American Express cards should contain 4 digits", "error", 4000);
                            }
                        }
                    }
                    /*if(!$scope.account.PhoneNumber)
                    {
                    	notifications.toast("Enter a valid phone number with 9 digits", "error", 4000);
                    }else{
                    	validPhoneNumber = true;
                    }*/
                    if (validCardNo === true && validExpiry === true && validCVS === true) {
                        $scope.disableaddBtn = true;
                        $rootScope.showGlobalProgress = true;
                        var addCardObj = angular.copy($scope.card);
                        addCardObj.CardType = addCardObj.CardType.type;
                        if (account == null) {
                            account = {};
                            account.DeliveyAddress = userObject.BillingAddress, account.BillingAddress = userObject.BillingAddress, account.PhoneNumber = userObject.PhoneNumber, account.AccountBalance = 0, account.AccountCards = []
                        }
                        var replaceThis = "";
                        for (i = 0, len = account.AccountCards.length; i < len; ++i) {
                            if (account.AccountCards[i].guid == addCardObj.guid) {
                                replaceThis = i;
                            } else { //console.log(i,'new card');
                            }
                        }
                        if (replaceThis || replaceThis === 0) {
                            account.AccountCards.splice(replaceThis, 1);
                            console.log(replaceThis, 'replace this card');
                        }
                        if (addCardObj.CardType == "Master" || addCardObj.CardType == "Master Card") {
                            addCardObj.cardImage = "img/master_s.png";
                        } else if (addCardObj.CardType == "Visa") {
                            addCardObj.cardImage = "img/visa_s.png";
                        } else if (addCardObj.CardType == "Amex" || addCardObj.CardType == "American Express") {
                            addCardObj.cardImage = "img/amex_s.png";
                        }
                        account.AccountCards.push(addCardObj);
                        var addedOrEdited = "Added";
                        if ($scope.newCard === false) {
                            addedOrEdited = "Edited";
                        }
                        $charge.payment().newCard(account).success(function (data) {
                            $scope.disableaddBtn = false;
                            $rootScope.showGlobalProgress = false;
                            notifications.toast("Card Successfully " + addedOrEdited, "success", 3000);
                            $mdDialog.hide(data);
                        }).error(function (data) {
                            $scope.disableaddBtn = false;
                            $rootScope.showGlobalProgress = false;
                            console.log(data);
                            notifications.alertDialog("Error", "Failed to add card");
                        })
                    } // END OF VALIDATED SUBMIT
                } // END OF SUBMIT
        };
        addCardCtrl.$inject = ['$scope', '$rootScope', '$mdDialog', 'notifications', 'account', 'cardObject', 'userObject', '$charge'];
        angular.module('mambatiFrameworkShell').controller('addCardCtrl', addCardCtrl);
    })();
    //_____________________________________________________________________________________________addCardCtrl end
    //_____________________________________________________________________________________________changePasswordCtrl start
    (function () {
        var changePasswordCtrl = function ($scope, $rootScope, $mdDialog, $http, notifications, shellDataFactory) {

            var password = this;
            password.disableChangePasswordBtn = false;
            password.shellConfig = shellDataFactory.getShellConfig();
            password.cancel = cancel;
            password.submit = submit;

            function cancel() {
                $mdDialog.hide();
            }

            function submit() {
                $rootScope.showGlobalProgress = true;
                if (password.newPassword === password.confirmNewPassword) {
                    password.disableChangePasswordBtn = true;
                    $rootScope.showGlobalProgress = true;
                    console.log(window.location.host + '/auth/ChangePassword/' + password.oldPassword + '/' + password.newPassword);
                    $http.get('/auth/ChangePassword/' + password.oldPassword + '/' + password.newPassword).success(function (data) {
                        $rootScope.showGlobalProgress = false;
                        if (data == "true") {
                            notifications.toast("Passoword Successfully Changed", "success");
                            $mdDialog.hide();
                        } else {
                            notifications.toast(data, "error");
                        }
                        password.disableChangePasswordBtn = false;
                        $rootScope.showGlobalProgress = false;
                    }).error(function () {
                        $rootScope.showGlobalProgress = false;
                        password.disableChangePasswordBtn = false;
                        $rootScope.showGlobalProgress = false;
                        notifications.toast("Error occurred while changing the password", "error", 3000);
                    });
                } else {
                    notifications.toast("New Password Confirmation invalid", "error", 4000);
                }
            }
        };
        changePasswordCtrl.$inject = ['$scope', '$rootScope', '$mdDialog', '$http', 'notifications', 'shellDataFactory'];
        angular.module('mambatiFrameworkShell').controller('changePasswordCtrl', changePasswordCtrl);
    })();
    //_____________________________________________________________________________________________changePasswordCtrl end
    //_____________________________________________________________________________________________components start
    angular.module('mambatiFrameworkShell').directive('customOnChange', customOnChangeFunc);

    function customOnChangeFunc() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    };

    function filterByPatternFunc($rootScope) {
        return function (cardTypes, CardNo) {
            if (!CardNo) {
                CardNo = "";
                return cardTypes;
            }
            for (i = 0, len = cardTypes.length; i < len; ++i) {
                for (j = 0, len = cardTypes[i].validPatterns.length; j < len; ++j) {
                    var contains = cardTypes[i].validPatterns[j].startsWith(CardNo.substring(0, 2));
                    if (contains === true) {
                        $rootScope.cardTypeRoot = cardTypes[i];
                        return [cardTypes[i]];
                    }
                }
            }
        }
    };
    angular.module('mambatiFrameworkShell').filter("filterByPattern", filterByPatternFunc);
    filterByPatternFunc.$inject = ['$rootScope'];
    angular.module('mambatiFrameworkShell').directive('angularMask', angularMaskFunc);

    function angularMaskFunc() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, el, attrs, model) {
                var format = attrs.angularMask,
                    arrFormat = format.split('|');
                if (arrFormat.length > 1) {
                    arrFormat.sort(function (a, b) {
                        return a.length - b.length;
                    });
                }
                model.$formatters.push(function (value) {
                    return value === null ? '' : mask(String(value).replace(/\D/g, ''));
                });
                model.$parsers.push(function (value) {
                    model.$viewValue = mask(value);
                    var modelValue = String(value).replace(/\D/g, '');
                    el.val(model.$viewValue);
                    return modelValue;
                });

                function mask(val) {
                    if (val === null) {
                        return '';
                    }
                    var value = String(val).replace(/\D/g, '');
                    if (arrFormat.length > 1) {
                        for (var a in arrFormat) {
                            if (value.replace(/\D/g, '').length <= arrFormat[a].replace(/\D/g, '').length) {
                                format = arrFormat[a];
                                break;
                            }
                        }
                    }
                    var newValue = '';
                    for (var nmI = 0, mI = 0; mI < format.length;) {
                        if (format[mI].match(/\D/)) {
                            newValue += format[mI];
                        } else {
                            if (value[nmI] != undefined) {
                                newValue += value[nmI];
                                nmI++;
                            } else {
                                break;
                            }
                        }
                        mI++;
                    }
                    return newValue;
                }
            }
        };
    };
    //Password Strength Directive - Start
    angular.module('mambatiFrameworkShell').directive('passwordStrengthIndicator', passwordStrengthIndicator);

    function passwordStrengthIndicator() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs, ngModel) {
                scope.strengthText = "";
                var strength = {
                    measureStrength: function (p) {
                        var _passedMatches = 0;
                        var _regex = /[$@&+#-/:-?{-~!^_`\[\]]/g;
                        if (/[a-z]+/.test(p)) {
                            _passedMatches++;
                        }
                        if (/[A-Z]+/.test(p)) {
                            _passedMatches++;
                        }
                        if (_regex.test(p)) {
                            _passedMatches++;
                        }
                        return _passedMatches;
                    }
                };
                var indicator = element.children();
                var dots = Array.prototype.slice.call(indicator.children());
                var weakest = dots.slice(-1)[0];
                var weak = dots.slice(-2);
                var strong = dots.slice(-3);
                var strongest = dots.slice(-4);
                element.after(indicator);
                var listener = scope.$watch('ngModel', function (newValue) {
                    angular.forEach(dots, function (el) {
                        el.style.backgroundColor = '#EDF0F3';
                    });
                    if (ngModel.$modelValue) {
                        var c = strength.measureStrength(ngModel.$modelValue);
                        if (ngModel.$modelValue.length > 7 && c > 2) {
                            angular.forEach(strongest, function (el) {
                                el.style.backgroundColor = '#039FD3';
                                scope.strengthText = "is very strong";
                            });
                        } else if (ngModel.$modelValue.length > 5 && c > 1) {
                            angular.forEach(strong, function (el) {
                                el.style.backgroundColor = '#72B209';
                                scope.strengthText = "is strong";
                            });
                        } else if (ngModel.$modelValue.length > 3 && c > 0) {
                            angular.forEach(weak, function (el) {
                                el.style.backgroundColor = '#E09015';
                                scope.strengthText = "is weak";
                            });
                        } else {
                            weakest.style.backgroundColor = '#D81414';
                            scope.strengthText = "is very weak";
                        }
                    }
                });
                scope.$on('$destroy', function () {
                    return listener();
                });
            },
            template: '<span id="password-strength-indicator"><span></span><span></span><span></span><span></span><md-tooltip>password strength {{strengthText}}</md-tooltip></span>'
        };
    }
    //Password Strength Directive - End
    //Hide the Account Numbers in show all Accounts
    angular.module('mambatiFrameworkShell').filter('hideNumbers', hideNumbersFunc);

    function hideNumbersFunc() {
        return function (input) {
            return input.replace(/.(?=.{4})/g, 'x');
        };
    };
    //_____________________________________________________________________________________________components end
    //---------------------------------------------------------------------------------------------uploadPictureCtrl start
    (function () {
        var uploadPictureCtrl = function ($scope, $rootScope, $mdDialog, notifications, $uploader) {
            $scope.cancel = function () {
                $mdDialog.hide();
            }
            $scope.doubleWrap = "{{outputImage}}"
            $scope.fileChanged = function (evt) {
                if (!evt) evt = window.event;
                // var x = e.target||e.srcElement;
                var file = evt.target.files[0];
                // var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.theImage1 = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            }
            $scope.onUpdate = function (data) {
                //console.log(data)
            }
            $scope.submit = function () {
                var noImage = true;
                try {
                    var youtubeimgsrc = document.getElementById("youtubeimg").src;
                    noImage = false;
                } catch (exception) {
                    noImage = true;
                }
                // console.log(noImage == false);
                if (noImage === false) {
                    $rootScope.showGlobalProgress = true;
                    var myblob = dataURItoBlob(youtubeimgsrc);
                    var file = blobToFile(myblob, "profilepicture");
                    $uploader.onSuccess(function () {
                        notifications.toast("Profile picture updated", "success");
                        $rootScope.sendShellNotification('Profile picture updated');
                        $rootScope.showGlobalProgress = false;
                        $mdDialog.hide("success");
                        //$scope.profilePicture = tempProfilePic;
                    });
                    $uploader.onError(function () {
                        $rootScope.showGlobalProgress = false;
                        notifications.toast("Error occured, Profile picture was not updated", "error");
                    });
                    $uploader.uploadUserMedia("profilepictures", file, "profile.jpg");
                } else {
                    notifications.toast("Please select a picture", "error");
                };
            }

            function blobToFile(theBlob, fileName) {
                //A Blob() is almost a File() - it's just missing the two properties below which we will add
                theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                return theBlob;
            }

            function dataURItoBlob(dataURI) {
                // convert base64/URLEncoded data component to raw binary data held in a string
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
                else byteString = unescape(dataURI.split(',')[1]);
                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                // write the bytes of the string to a typed array
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new File([ia], {
                    type: 'mimeString'
                });
            }
        };
        uploadPictureCtrl.$inject = ['$scope', '$rootScope', '$mdDialog', 'notifications', '$uploader'];
        angular.module('mambatiFrameworkShell').controller('uploadPictureCtrl', uploadPictureCtrl);
    })();
    //--------------------------------------------------------------------------------------------------------uploadPictureCtrl end
