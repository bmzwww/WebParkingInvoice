using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebParkingInvoice.Models
{
    public class CustomerModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public bool IsPremium { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
    }
}