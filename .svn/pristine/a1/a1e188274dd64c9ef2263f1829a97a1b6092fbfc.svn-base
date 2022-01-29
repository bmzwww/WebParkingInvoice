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
    public class ParkingApiController : ApiController
    {
        IParkInfoService _parkInfoService;

        public ParkingApiController(IParkInfoService parkInfoService)
        {
                // Init dependecies
            _parkInfoService = parkInfoService;
        }

        public List<ParkInfoModel> Get()
        {
            return _parkInfoService.GetParkInfoOverview();
        }

        public List<ParkInfoModel> Get(int id)
        {
            return _parkInfoService.GetCustomerParkInfo(id);
        }
    }
}
