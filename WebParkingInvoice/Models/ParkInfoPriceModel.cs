using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebParkingInvoice.Models
{
    public class ParkInfoPriceModel : ParkInfoModel
    {
        public double Price { get; set; }

        public string PriceStr { get; set; }

        public string Rate { get; set; }
    }
}