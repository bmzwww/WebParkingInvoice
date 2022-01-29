

var appModule = angular.module('fontEndAngularApp');
appModule.controller('IndexController', IndexController);


/* @ngInject */
function IndexController($scope, apiTestService) {

    // LOG
    console.info('Controller IndexController()');


    // EVENTS
    {
        $scope.RefreshData = function () {

            // LOG
            console.info('RefreshData()', new Date());

            LoadCustomers($scope, apiTestService);
        };
    }

    // Load
   $scope.RefreshData();

}

/* @ngInject */
function LoadCustomers($scope, apiTestService) {

    // INIT
    {
        $scope.ParkInfo = { Items: [] };
    }

    // Deactivate UI
    $scope.disabled = true;



    // CALL API
    var q = apiTestService.getParkInfo();


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
            parkInfo.Details = p.Details;

            $scope.ParkInfo.Items.push(parkInfo);
        }

        // LOG
        console.info('$scope.ParkInfo.Items', $scope.ParkInfo.Items);

        // Activate UI
        $scope.disabled = false;


    }).catch(function (reason) {

        // SHOW ALARM
        printObject(reason);

        // Activate UI
        $scope.disabled = false;
    });
}


/* @ngInject */
function ReadNumber() {

    // Number
    var el = document.createElement('a');
    el.href = window.location.href;
    var splitPath = el.pathname.split('/');
    var number = splitPath[splitPath.length - 1];
    console.info('number', number);

    return number;
}


/* @ngInject */
function printObject(o) {
    var out = '';
    for (var p in o) {
        out += p + ': ' + o[p] + '\n';
    }
    alert(out);
}

/* @ngInject */
function DateTimeToString(d) {
    var str = "";

    str = zeroPad(d.getFullYear(), 1000) + "-" + zeroPad((d.getMonth() + 1), 10) + "-" + zeroPad(d.getDate(), 10) + " " + zeroPad(d.getHours(), 10) + ":" + zeroPad(d.getMinutes(), 10);

    return str;
}

/* @ngInject */
function zeroPad(nr, base) {
    var len = (String(base).length - String(nr).length) + 1;
    return len > 0 ? new Array(len).join('0') + nr : nr;
}


/* @ngInject */
function minTommss(h) {
    var sign = h < 0 ? "-" : "";
    var hh = Math.floor(Math.abs(h));
    var mm = Math.floor((Math.abs(h) * 60) % 60);
    return sign + (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
}


/* @ngInject */
function DateToString(d) {
    var str = "";

    str = zeroPad(d.getFullYear(), 1000) + "." + zeroPad((d.getMonth() + 1), 10) + "." + zeroPad(d.getDate(), 10);

    return str;
}









