using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebParkingInvoice.Services;

namespace WebParkingInvoice.Controllers
{
    public class HomeController : Controller
    {
        ICustomersService _iCustomersService;
        IInvoiceService _iInvoiceService;
        private IParkInfoService _iParkInfoService;

        public HomeController(ICustomersService iCustomersService, IInvoiceService iInvoiceService, IParkInfoService iParkInfoService)
        {
            // Init dependecies
            _iCustomersService = iCustomersService;
            _iInvoiceService = iInvoiceService;
            _iParkInfoService = iParkInfoService;
        }

        public ActionResult Index()
        {
            // Main page with customers and their actual parking information
            ViewBag.Title = "Home";
            ViewBag.Message = "Here you can see a general information.";

            return View();
        
        }

        public ActionResult Customers()
        {
            // Main page with customers and their actual parking information
            ViewBag.Title = "Customers";
            ViewBag.Message = "Here you can see a list of customers and their short parking information.";

            return View();

        }

        public ActionResult Customer(int? id)
        {
            // Page with customer parking information and his details

            // CASE NULL
           if (!id.HasValue)
            {
                return RedirectPermanent("~/");
            }

            var customer = _iCustomersService.GetCustomer(id.Value);

            // CASE Customer not found
            if (customer == null)
            {
                return RedirectPermanent("~/");
            }

            ViewBag.Title = String.Format("Customer parking information");
            ViewBag.Message = "Parking information from third party company.";
            ViewBag.Customer = customer;

            return View();

        }

        public ActionResult Invoices()
        {
            // Page with list of invoices
            ViewBag.Title = "Invoices";
            ViewBag.Message = "Here you can see parking invoices.";

            return View();
        }

        public ActionResult Invoice(string id)
        {
            // Page with invoice details
            var invoice = _iInvoiceService.GetInvoice(id);

            // CASE Invoice not found
            if (invoice == null)
            {
                return RedirectPermanent("~/Home/Invoices");
            }


            ViewBag.Title = String.Format("Invoice");
            ViewBag.Message = "Here you can see invoice details.";
            ViewBag.Customer = invoice.Customer;

            return View();
        }
        
        public ActionResult Restart()
        {
            // DELETE and Initializate new random information
            _iCustomersService.DemoInit(true);
            _iParkInfoService.DemoInit(true);
            _iInvoiceService.DemoInit(true);

            ViewBag.Title = "Restarted";
            ViewBag.Message = "All demostration data has been deleted and generated again.";


            // CASE Invoice not found
            return View();
        }
    }
}