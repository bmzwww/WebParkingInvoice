
var appModule = angular.module('fontEndAngularApp');

appModule.factory('apiTestService', apiTestService);

/* @ngInject */
function apiTestService(apiTestResource, apiCustomerParkInfoResource, apiInvoicesResource, apiGetInvoiceResource, apiCalculationResource, apiInvoiceSenderResource, apiRestartResource) {
    console.info("2. Service apiTestService");

    return {
        getParkInfo: function () {
            return apiTestResource.query();
        },
        getCustomerParkInfo: function (id) {
            return apiCustomerParkInfoResource.query({id: id});
        },
        getInvoices: function () {
            return apiInvoicesResource.query();
        },
        getInvoice: function (id) {
            return apiGetInvoiceResource.query({ id: id });
        },
        postInvoiceCalculation: function (id) {
            return apiCalculationResource.query({ id: id });
        },
        sendInvoice: function (id) {
            return apiInvoiceSenderResource.query({ id: id });
        },
        restart: function () {
            return apiRestartResource.query();
        }
    };

}