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
    public class InvoiceSenderApiController : ApiController
    {
        IInvoiceService _iInvoiceService;
        public InvoiceSenderApiController(IInvoiceService iInvoiceService)
        {  
            // Init dependecies
            _iInvoiceService = iInvoiceService;
        }

        public void Post(string id)
        {
            // Send invoice by Email
            _iInvoiceService.SendInvoice(id);
        }
    }
}
