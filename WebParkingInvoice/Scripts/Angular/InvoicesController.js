

var appModule = angular.module('fontEndAngularApp');
appModule.controller('InvoicesController', InvoicesController);


/* @ngInject */
function InvoicesController($scope,  apiTestService) {

    // LOG
    console.info('function InvoicesController', new Date());

   
 
    // EVENTS
    {
        $scope.CalculateInvoices = function () {

            // Deactivate UI
            $scope.disabled = true;

            console.warn('CalculateInvoices');

            // CALL API
            var q = apiTestService.postInvoiceCalculation('CalculateAll');

            q.$promise.then(function (response) {

                // SHOW ALARM
                //printObject(response);

                // Activate UI
                $scope.disabled = false;

                LoadInvoices($scope, apiTestService);


            })
                .catch(function (reason) {

                    // SHOW ALARM
                    printObject(reason);

                    // Activate UI
                    $scope.disabled = false;
                });



        };
        $scope.SendInvoices = function () {

            console.warn('SendInvoices');
            if (confirm("Are you sure to sent invoices to customers?")) {

                // Deactivate UI
                $scope.disabled = true;

                // CALL API
                var q = apiTestService.sendInvoice('SendAll');

                q.$promise.then(function (response) {

                    // SHOW ALARM
                    //printObject(response);

                    // Activate UI
                    $scope.disabled = false;

                    LoadInvoices($scope, apiTestService);


                })
                    .catch(function (reason) {

                        // SHOW ALARM
                        printObject(reason);

                        // Activate UI
                        $scope.disabled = false;
                    });

            }
        };
        $scope.Restart = function () {

            console.warn('Restart');

            if (confirm("Are you sure to restart demo?")) {

                // Deactivate UI
                $scope.disabled = true;

                // CALL API
                var q = apiTestService.restart();

                q.$promise.then(function (response) {

                    // SHOW ALARM
                    //printObject(response);

                    // Activate UI
                    $scope.disabled = false;

                    LoadInvoices($scope, apiTestService);


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

            LoadInvoices($scope, apiTestService);
        };

    }

    // DEFAULT
    $scope.RefreshData();
    
}

/* @ngInject */
function LoadInvoices($scope, apiTestService) {

    // INIT
    {
        $scope.Invoices = [];
    }

    // Deactivate UI
    $scope.disabled = true;

    // CALL API
    var q = apiTestService.getInvoices();


    q.$promise.then(function (response) {

        // SHOW ALARM
        //printObject(response);



        $scope.Invoices = [];
        for (var i = 0; i < response.length; i++) {

            var invoice = {};
            var p = response[i];
            invoice.ID = p.ID;
            //parkInfo.ParkHouse = p.ParkHouse;
            invoice.Customer = p.Customer;
            invoice.Number = p.Number;
            invoice.Balance = p.BalanceStr;
            invoice.InvoiceDateNet = p.InvoiceDate;
            invoice.DueDateNet = p.DueDate;
            invoice.Status = p.Status;
            invoice.StatusStr = p.StatusStr;

            if (p.DueDate != null) {
                invoice.InvoiceDatetJS = new Date(Date.parse(invoice.InvoiceDateNet));
                invoice.DueDateJs = new Date(Date.parse(invoice.DueDateNet));

                invoice.InvoiceDate = DateToString(invoice.InvoiceDatetJS);
                invoice.DueDate = DateToString(invoice.DueDateJs);
            }
            //parkInfo.periodStartNet = p.PeriodStart;
            //parkInfo.periodEndNet = p.PeriodEnd;

            //parkInfo.PeriodStartJS = new Date(Date.parse(parkInfo.periodStartNet));
            //parkInfo.PeriodEndJs = new Date(Date.parse(parkInfo.periodEndNet));

            //parkInfo.PeriodStart = DateToString(parkInfo.PeriodStartJS);
            //parkInfo.PeriodEnd = DateToString(parkInfo.PeriodEndJs);

            //parkInfo.DayAmount = p.DayAmount;
            //parkInfo.NightAmount = p.NightAmount;

            //public long ID { get; set; }
            //public CustomerModel Customer { get; set; }
            //public string Number { get; set; }
            //public double Balance { get; set; }
            //public string Details { get; set; }
            //public string BalanceStr { get; set; }
            //public DateTime? InvoiceDate { get; set; }
            //public DateTime? DueDate { get; set; }
            //public InvoiceStatus Status { get; set; }

            invoice.Details = p.Details;

            $scope.Invoices.push(invoice);
        }

        // LOG
        console.info('$scope.Invoices', $scope.Invoices);

        // Activate UI
        $scope.disabled = false;


    }).catch(function (reason) {

        // SHOW ALARM
        printObject(reason);

        // Activate UI
        $scope.disabled = false;
    });
}

