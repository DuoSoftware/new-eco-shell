angular.module('mainApp').controller('addCardCtrl', function ($scope, $rootScope, $mdDialog, $charge, account, cardObject, notifications) {
    $scope.account = {};
    $scope.card = {}; // form object
    $scope.newCard = true; //  this can either be adding new card or editing an exisiting card
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

    if (cardObject) // if it is an exisiting card
    {
        $scope.yearChanged(cardObject.ExpiryYear);
        $scope.card = cardObject;
        $scope.newCard = false;
    }

    $scope.card.CardType = "";

    $scope.cardTypes = [{
            type: "Visa",
            validPatterns: ['41', '42', '43', '44', '45', '46', '47', '48', '49'],
            imageUrl: "img/visa_s.png",
            regExPattern: /^4[0-9]{12}(?:[0-9]{3})?$/
        },
        {
            type: "Master Card",
            validPatterns: ['51', '52', '53', '54', '55'],
            imageUrl: "img/master_s.png",
            regExPattern: /^5[1-5][0-9]{14}$/
        },
        {
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
            //	var tempExpiry = $scope.expiry;

            var validExpiry = false;
            var validCardNo = false;
            var validCVS = false;

            if ($scope.card.ExpiryYear == null || $scope.card.ExpiryMonth == null) {
                notifications.toast("Please select the expiry date", "error");
            } else {
                validExpiry = true;
            }
            try {
                if ($scope.card.CardType.regExPattern.test($scope.card.CardNo) === false) {
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


            if (validExpiry === true && validCardNo === true && validCVS === true) {
                $scope.disableaddBtn = true;
                $rootScope.showGlobalProgress = true;

                var addCardObj = angular.copy($scope.card);
                addCardObj.CardType = addCardObj.CardType.type;

                if (account == null) {

                    account = {};
                    account.DeliveyAddress = $scope.card.DeliveyAddress,
                        account.BillingAddress = $scope.card.BillingAddress,
                        account.PhoneNumber = $scope.account.PhoneNumber,
                        account.AccountBalance = 0,
                        account.AccountCards = []

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
                console.log(account);

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
})

angular.module('mainApp').filter("filterByPattern", function ($rootScope) {
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
})

angular.module('mainApp').directive('angularMask', function () {
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
})
