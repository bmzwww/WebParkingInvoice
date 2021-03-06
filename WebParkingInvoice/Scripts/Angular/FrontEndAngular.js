
var fontEndAngularApp = angular.module('fontEndAngularApp', ['ngResource']
   // , ['ngTouch', 'hmTouchEvents']
    );


// Create a new service as a factory.
fontEndAngularApp.factory('opExtService', opExtServiceConstructor);


/**
 * Factory constructor.
 *
 * @returns {Object} exposed functions
 */
/* @ngInject */
function opExtServiceConstructor() {

    //var urisApi = "//localhost:54323";
    //var urisApi = "//bmz.dlinkddns.com/WebParkingInvoice";
  
    // Try to set urisApi for automatic service link generation
    {
        console.info('opExtServiceConstructor window.location.href=', window.location.href);
        var urisApi = window.location.href.replace("http://", "");
        // List of controller for exclude from service link
        var controllers = ['Home'];
        for (var j = 0; j < controllers.length; j++) {
            // Find controller
            if (urisApi.indexOf(controllers[j]) > 0) {
                var uriSplit = urisApi.split('/');
                urisApi = "";
                var lenMax = 1;
                for (var i = 0; i < uriSplit.length; i++) {
                    if (uriSplit[i] == controllers[j]) {
                        lenMax = i;
                    }
                }
                for (var i = 0; i < lenMax; i++) {
                    urisApi = urisApi + uriSplit[i];
                    if (i < lenMax - 1) {
                        urisApi = urisApi + "/";
                    }
                }
            }
        }

        urisApi = "//" + urisApi;

        console.info('opExtServiceConstructor urisApi', urisApi);
    }

    // Expose interface.
    return {
        getUri: normalizeGetUri
    };

    /*
     * Private methods implementation.
     */

    /**
     * Get a normalized URI to a resource based on the configured environment.
     *
     * @param {String} path to resource
     * @param {String} baseUri to where the resource lives
     * @returns {String} normalized URI to resource
     */
    function normalizeGetUri(path, baseUri) {
        return (baseUri || urisApi) + path;
      
    }
}





