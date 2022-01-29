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
    public class InvoiceCalculationApiController : ApiController
    {
        IInvoiceService _iInvoiceService;
        public InvoiceCalculationApiController(IInvoiceService iInvoiceService)
        {
            //  Init dependecies
            _iInvoiceService = iInvoiceService;
        }

        public void Post(string id)
        {
            _iInvoiceService.CalculateInvoice(id);
        }
    }
}
