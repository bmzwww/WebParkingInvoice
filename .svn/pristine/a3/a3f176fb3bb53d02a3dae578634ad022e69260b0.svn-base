using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebParkingInvoice.Models;
using WebParkingInvoice.Services;
using WebParkingInvoice.Static;

namespace WebParkingInvoice.Controllers
{
    public  class CustomersApiController : ApiController
    {
        ICustomersService _iCustomersService;

        public CustomersApiController(ICustomersService iCustomersService)
        {
            _iCustomersService = iCustomersService;
        }

        public List<CustomerModel> Get()
        {
            // Get list of customers 
            return _iCustomersService.GetCustomers();
        }
    }
}
