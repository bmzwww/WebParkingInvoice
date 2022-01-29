using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebParkingInvoice.Models;
using WebParkingInvoice.Services;
using WebParkingInvoice.Static;

namespace WebParkingInvoice.Controllers
{
    public class InvoicesApiController : ApiController
    {
        IInvoiceService _iInvoiceService;
        public InvoicesApiController(IInvoiceService iInvoiceService)
        {
            // Init dependecies
            _iInvoiceService = iInvoiceService;
        }

        public List<InvoiceModel> Get()
        {
            // Get list of invoices
            return _iInvoiceService.GetInvoices();
        }

        public InvoiceModel Get(string id)
        {
            // Get invoice details
           return _iInvoiceService.GetInvoice(id);
        }
    }
}
