using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebParkingInvoice.Models
{
    public class InvoiceModel
    {
        public long ID { get; set; }
        public CustomerModel Customer { get; set; }
        public string Number { get; set; }
        public double Balance { get; set; }
        public string BalanceStr { get; set; }

        public double Price { get; set; }
        public string PriceStr { get; set; }
  
        public string TaxStr { get; set; }
        public double TaxAmount { get; set; }
        public string TaxAmountStr { get; set; }

        public string Details { get; set; }

        public DateTime? InvoiceDate { get; set; }
        public DateTime? DueDate { get; set; }
        public InvoiceStatus Status { get; set; }
        public string StatusStr { get; set; }
        public List<ParkInfoPriceModel> Items { get; set; }


        //<th>
        //            #
        //        </th>
        //        <th>
        //            Invoice number
        //        </th>
        //        <th>
        //            Customer
        //        </th>
        //        <th>
        //            Car number
        //        </th>
        //        <th>
        //            Invoice Date
        //        </th>
        //        <th>
        //            Balance
        //        </th>
        //        <th>
        //            Due Date
        //        </th>
        //        <th>
        //            Status
        //        </th>
        //        <th>
        //            Actions
        //        </th>
    }


}