using System.Web;
using System.Web.Optimization;

namespace WebParkingInvoice
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            // Init Angular Scripts
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-resource.js"
                ));

            // Init Angular Scripts without minify
            bundles.Add(new Bundle("~/bundles/angularCode").Include(
                "~/Scripts/Angular/FrontEndAngular.js",
                "~/Scripts/Angular/IndexController.js",
                "~/Scripts/Angular/CustomersController.js",
                "~/Scripts/Angular/CustomerController.js",
                "~/Scripts/Angular/InvoicesController.js",
                "~/Scripts/Angular/InvoiceController.js",
                "~/Scripts/Angular/Resources.js",
                "~/Scripts/Angular/Services.js"
                ));
        }
    }
}
