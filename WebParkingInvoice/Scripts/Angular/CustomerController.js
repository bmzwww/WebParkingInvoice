

var appModule = angular.module('fontEndAngularApp');
appModule.controller('CustomerController', CustomerController);


/* @ngInject */
function CustomerController($scope, apiTestService) {

    // LOG
    console.info('function CustomerController window.location.href=', window.location.href);

 

    // INIT
    {
        $scope.ParkInfo = {Items: []};
    }

    // EVENTS
    {
        $scope.RefreshData = function () {

            // LOG
            console.info('RefreshData()', new Date());

            LoadCustomer($scope, apiTestService);
        };
    }

    // Load
    $scope.RefreshData();


}
/* @ngInject */
function LoadCustomer($scope, apiTestService) {
    // Deactivate UI
    $scope.disabled = true;
    // Number
    var number = ReadNumber();

    var customerId = Number(number);

    // CALL API
    var q = apiTestService.getCustomerParkInfo(customerId);


    q.$promise.then(function (response) {

        // SHOW ALARM
        //printObject(response);



        $scope.ParkInfo.Items = [];
        for (var i = 0; i < response.length; i++) {

            var parkInfo = {};
            var p = response[i];
            parkInfo.ID = p.ID;
            parkInfo.ParkHouse = p.ParkHouse;
            parkInfo.Customer = p.Customer;

            parkInfo.periodStartNet = p.PeriodStart;
            parkInfo.periodEndNet = p.PeriodEnd;

            parkInfo.PeriodStartJS = new Date(Date.parse(parkInfo.periodStartNet));
            parkInfo.PeriodEndJs = new Date(Date.parse(parkInfo.periodEndNet));

            parkInfo.PeriodStart = DateTimeToString(parkInfo.PeriodStartJS);
            parkInfo.PeriodEnd = DateTimeToString(parkInfo.PeriodEndJs);

            parkInfo.DayAmount = p.Amount.Day;
            parkInfo.NightAmount = p.Amount.Night;
            parkInfo.DayAndNight = p.Amount.DayAndNight;


            parkInfo.TotalHoursStr = minTommss(p.Amount.TotalHours);

            $scope.ParkInfo.Items.push(parkInfo);
        }

        // LOG
        //console.debug('$scope.ParkInfo.Items', $scope.ParkInfo.Items);

        // Activate UI
        $scope.disabled = false;


    }).catch(function (reason) {

        // SHOW ALARM
        printObject(reason);

        // Activate UI
        $scope.disabled = false;
    });
}
