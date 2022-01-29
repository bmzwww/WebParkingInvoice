

var appModule = angular.module('fontEndAngularApp');

appModule.factory('apiTestResource', apiTestResource);
appModule.factory('apiCustomerParkInfoResource', apiCustomerParkInfoResource);
appModule.factory('apiInvoicesResource', apiInvoicesResource);
appModule.factory('apiGetInvoiceResource', apiGetInvoiceResource);
appModule.factory('apiInvoicesResource', apiInvoicesResource);
appModule.factory('apiCalculationResource', apiCalculationResource);
appModule.factory('apiInvoiceSenderResource', apiInvoiceSenderResource);
appModule.factory('apiRestartResource', apiRestartResource);

/* @ngInject */
function apiRestartResource($resource, opExtService) {

    console.info("1. Resource apiRestartResource");

    // Expose interface.
    var q = $resource(
        opExtService.getUri('/api/RestartApi/'),
        null,
        {
            query: {
                method: 'GET',
                isArray: false
            }
        }
    );

    return q;
}

/* @ngInject */
function apiInvoiceSenderResource($resource, opExtService) {

    console.info("1. Resource apiInvoiceSenderResource");

    // Expose interface.
    var q = $resource(
      opExtService.getUri('/api/InvoiceSenderApi/:id'),
      null,
      {
          query: {
              method: 'POST',
              isArray: false,
              params: {
                  id: '@id'
              }
          }
      }
    );

    return q;
}

/* @ngInject */
function apiCalculationResource($resource, opExtService) {

    console.info("1. Resource apiCalculationResource");

    // Expose interface.
    var q = $resource(
      opExtService.getUri('/api/InvoiceCalculationApi/:id'),
      null,
      {
          query: {
              method: 'POST',
              isArray: false,
              params: {
                  id: '@id'
              }
          }
      }
    );

    return q;
}

/* @ngInject */
function apiInvoicesResource($resource, opExtService) {

    console.info("1. Resource apiInvoicesResource");

    // Expose interface.
    var q = $resource(
      opExtService.getUri('/api/InvoicesApi/'),
      null,
      {
          query: {
              method: 'GET',
              isArray: true
          }
      }
    );

    return q;
}

/* @ngInject */
function apiTestResource($resource, opExtService) {

    console.info("1. Resource apiTestResource");

    // Expose interface.
    var q = $resource(
      opExtService.getUri('/api/ParkingApi/'),
      null,
      {
          query: {
              method: 'GET',
              isArray: true
          }
      }
    );

    return q;
}

/* @ngInject */
function apiCustomerParkInfoResource($resource,opExtService) {

    console.info("1. Resource apiTestResource");

    // Expose interface.
    var q = $resource(
      opExtService.getUri('/api/ParkingApi/:id'),
      null,
      {
          query: {
              method: 'GET',
              isArray: true,
              params: {
                  id: '@id'
              }
          }
      }
    );

    return q;
}

/* @ngInject */
function apiGetInvoiceResource($resource, opExtService) {

    console.info("1. Resource apiTestResource");

    // Expose interface.
    var q = $resource(
      opExtService.getUri('/api/InvoicesApi/:id'),
      null,
      {
          query: {
              method: 'GET',
              isArray: false,
              params: {
                  id: '@id'
              }
          }
      }
    );

    return q;
}

