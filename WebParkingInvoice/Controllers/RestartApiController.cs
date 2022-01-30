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
    public class RestartApiController : ApiController
    {
        IParkInfoService _parkInfoService;
        ICustomersService _customersService;
        IInvoiceService _invoiceService;

        public RestartApiController(IParkInfoService parkInfoService, ICustomersService customersService, IInvoiceService invoiceService)
        {
                // Init dependecies
            _parkInfoService = parkInfoService;
            _customersService = customersService;
            _invoiceService = invoiceService;
        }

        public bool Get()
        {
            _customersService.DemoInit(true);
            _parkInfoService.DemoInit(true);
           _invoiceService.DemoInit(true);
           
           return true;
        }
    }
}
