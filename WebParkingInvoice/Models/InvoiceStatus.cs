using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebParkingInvoice.Models
{public enum InvoiceStatus
    {
       Draft = 0,
       Calculated = 1,
       Sent = 2,
       Viewed = 3,
       Partial = 4,
       Paid = 5,
       Overdue = 6

    }
}