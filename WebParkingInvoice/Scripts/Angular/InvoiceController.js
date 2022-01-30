

var appModule = angular.module('fontEndAngularApp');
appModule.controller('InvoiceController', InvoiceController);

/* @ngInject */
function InvoiceController($scope, apiTestService) {

    // LOG
    console.info('function InvoiceController', new Date());


  

    // EVENT
    {
        $scope.CalculateInvoice = function () {

            // Deactivate UI
            $scope.disabled = true;

            console.warn('CalculateInvoice');

            // Number
            var number = ReadNumber();

            // CALL API
            var q = apiTestService.postInvoiceCalculation(number);

            q.$promise.then(function (response) {

                // SHOW ALARM
                //printObject(response);

                // Activate UI
                $scope.disabled = false;

                LoadInvoice($scope, apiTestService);


            })
                .catch(function (reason) {

                    // SHOW ALARM
                    printObject(reason);

                    // Activate UI
                    $scope.disabled = false;
                });



        };
        $scope.SendInvoice = function () {

            console.warn('CalculateInvoice');

            if (confirm("Are you sure to send invoice by email to customer?")) {

                // Deactivate UI
                $scope.disabled = true;

                // Number
                var number = ReadNumber();

                // CALL API
                var q = apiTestService.sendInvoice(number);

                q.$promise.then(function (response) {
                    // Activate UI
                    $scope.disabled = false;

                    LoadInvoice($scope, apiTestService);
                })
                .catch(function (reason) {

                    // SHOW ALARM
                    printObject(reason);

                    // Activate UI
                    $scope.disabled = false;
                });


            }
        };
        $scope.RefreshData = function () {
            // LOG
            console.info('RefreshData()', new Date());

            LoadInvoice($scope, apiTestService);
        };
    }

    // LOAD
    {
        $scope.RefreshData();
    }

}

/* @ngInject */
function LoadInvoice($scope, apiTestService) {

    // INIT
    {
        $scope.Invoice = {};
        $scope.Invoice.Items = [];
    }

    // Deactivate UI
    $scope.disabled = true;

    // Number
    var number = ReadNumber();

    // CALL API
    var q = apiTestService.getInvoice(number);

    q.$promise.then(function (response) {

        $scope.Invoice = {};
        $scope.Invoice.Items = [];
        $scope.Invoice.Balance = response.Balance;
        $scope.Invoice.BalanceStr = response.BalanceStr;
        $scope.Invoice.TaxStr = response.TaxStr;
        $scope.Invoice.PriceStr = response.PriceStr;
        $scope.Invoice.TaxAmountStr = response.TaxAmountStr;
        $scope.Invoice.Status = response.Status;
        $scope.Invoice.StatusStr = response.StatusStr;
        $scope.Invoice.Number = response.Number;
        $scope.Invoice.Details = response.Details;
        $scope.Invoice.DueDateNet = response.DueDate;
        $scope.Invoice.InvoiceDateNet = response.InvoiceDate;
        $scope.Invoice.SumAmount = 0;

        if (response.DueDate != null) {
            $scope.Invoice.InvoiceDatetJS = new Date(Date.parse($scope.Invoice.InvoiceDateNet));
            $scope.Invoice.DueDateJs = new Date(Date.parse($scope.Invoice.DueDateNet));

            $scope.Invoice.InvoiceDate = DateToString($scope.Invoice.InvoiceDatetJS);
            $scope.Invoice.DueDate = DateToString($scope.Invoice.DueDateJs);
        }
        //

        for (var i = 0; i < response.Items.length; i++) {

            var parkInfoPrice = {};
            var p = response.Items[i];
            parkInfoPrice.ID = p.ID;
            parkInfoPrice.PriceStr = p.PriceStr;
            parkInfoPrice.Details = p.Details;
            parkInfoPrice.Rate = p.Rate;
            parkInfoPrice.Amount = p.Amount.Day + p.Amount.Night;
            parkInfoPrice.HoursDouble = (p.Amount.DayHours + p.Amount.NightHours);
            parkInfoPrice.Hours = minTommss(parkInfoPrice.HoursDouble);
            parkInfoPrice.Comments = p.Amount.Comments;

         

            if (parkInfoPrice.HoursDouble > 0) {
                $scope.Invoice.SumAmount = $scope.Invoice.SumAmount + parkInfoPrice.Amount;
                if (parkInfoPrice.Comments) {
                    parkInfoPrice.HoursStr = parkInfoPrice.Hours + " / 30 min = " + Number(parkInfoPrice.Amount + 1) + " - 1 (" + parkInfoPrice.Comments + ")";
                    parkInfoPrice.Highlight = true;
                } else {
                    parkInfoPrice.HoursStr = parkInfoPrice.Hours + " / 30 min = " + parkInfoPrice.Amount;
                    parkInfoPrice.Highlight = false;
                }
            }
            $scope.Invoice.Items.push(parkInfoPrice);
        }

        // LOG
        console.info('$scope.Invoice', $scope.Invoice);

        // Activate UI
        $scope.disabled = false;


    })
        .catch(function (reason) {

        // SHOW ALARM
        printObject(reason);

        // Activate UI
        $scope.disabled = false;
    });

}






