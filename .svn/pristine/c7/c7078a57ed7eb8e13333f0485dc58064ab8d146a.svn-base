using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WebParkingInvoice.Models;
using WebParkingInvoice.Static;

namespace WebParkingInvoice.Services
{
    public interface ICustomersService
    {
        void DemoInit(bool forceInit);
        List<CustomerModel> GetCustomers();
        CustomerModel GetCustomer(int id);
    }

    public class CustomersService : ICustomersService
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public void DemoInit(bool forceInit)
        {
            Log.DebugFormat("{0}({1})", MethodBase.GetCurrentMethod().Name, forceInit);

            if (CustomersStorage.Customers == null || forceInit)
            {
                // Init agreements
                var agrList = new List<CustomerModel>();

                // Init random data
                var rnd = new Random();


                var customer1 = new CustomerModel()
                {
                    Address = "Majaka 31, 11416 Tallinn",
                    Email = "Henrik.Jensen@gmail.com",
                    Name = "Henrik Jensen",
                    ID = rnd.Next(0, int.MaxValue),
                    PhoneNumber =
                        String.Format("+372 55 {0} {1}", rnd.Next(1, 999).ToString("000"),
                            rnd.Next(1, 999).ToString("000")),
                    IsPremium = rnd.Next(0, 2) > 0,
                    Start = DateTime.Now.AddMonths(-6)
                };

                var customer2 = new CustomerModel()
                {
                    Address = "Lõõtsa 6, 11415 Tallinn",
                    Email = "Anders.Svensson@gmail.com",
                    Name = "Anders Svensson",
                    ID = rnd.Next(0, int.MaxValue),
                    PhoneNumber =
                        String.Format("+372 55 {0} {1}", rnd.Next(1, 999).ToString("000"),
                            rnd.Next(1, 999).ToString("000")),
                    IsPremium = rnd.Next(1, 10) % 2 > 0,
                    Start = DateTime.Now.AddMonths(- rnd.Next(0, 20))
                };

                var customer3 = new CustomerModel()
                {
                    Address = "A. Weizenbergi 37, 10127 Tallinn",
                    Email = "Toomas.Kupce@gmail.com",
                    Name = "Toomas Kupce",
                    ID = rnd.Next(0, int.MaxValue),
                    PhoneNumber =
                        String.Format("+372 55 {0} {1}", rnd.Next(1, 999).ToString("000"),
                            rnd.Next(1, 999).ToString("000")),
                    IsPremium = rnd.Next(1, 10) % 2 > 0,
                    Start = DateTime.Now.AddMonths(- rnd.Next(0, 20))
                };

                var customer4 = new CustomerModel()
                {
                    Address = "Rahukohtu 3, 10130 Tallinn",
                    Email = "Taavi.Ilves@gmail.com",
                    Name = "Taavi Ilves",
                    ID = rnd.Next(0, int.MaxValue),
                    PhoneNumber =
                        String.Format("+372 55 {0} {1}", rnd.Next(1, 999).ToString("000"),
                            rnd.Next(1, 999).ToString("000")),
                    IsPremium = rnd.Next(1, 10) % 2 > 0,
                    Start = DateTime.Now.AddMonths(- rnd.Next(0, 20))
                };

                var customer5 = new CustomerModel()
                {
                    Address = "Rahukohtu 66, 10130 Tallinn",
                    Email = "Andrus.Rõivas@gmail.com",
                    Name = "Andrus  Rõivas",
                    ID = rnd.Next(0, int.MaxValue),
                    PhoneNumber =
                        String.Format("+372 55 {0} {1}", rnd.Next(1, 999).ToString("000"),
                            rnd.Next(1, 999).ToString("000")),
                    IsPremium = rnd.Next(1, 10) % 2 > 0,
                    Start = DateTime.Now.AddMonths(- rnd.Next(0, 20))
                };

                var customer6 = new CustomerModel()
                {
                    Address = "Lastekodu 13, 10113 Tallinn",
                    Email = "Maart.Ansip@gmail.com",
                    Name = "Maart Ansip",
                    ID = rnd.Next(0, int.MaxValue),
                    PhoneNumber =
                        String.Format("+372 55 {0} {1}", rnd.Next(1, 999).ToString("000"),
                            rnd.Next(1, 999).ToString("000")),
                    IsPremium = rnd.Next(1, 10) % 2 > 0,
                    Start = DateTime.Now.AddMonths(- rnd.Next(0, 20))
                };

                var customer7 = new CustomerModel()
                {
                    Address = "Tuulemäe 3 11411 Tallinn",
                    Email = "Eeva.Laar@gmail.com",
                    Name = "Eeva Laar",
                    ID = rnd.Next(0, int.MaxValue),
                    PhoneNumber =
                        String.Format("+372 55 {0} {1}", rnd.Next(1, 999).ToString("000"),
                            rnd.Next(1, 999).ToString("000")),
                    IsPremium =  rnd.Next(1, 10) % 2 > 0,
                    Start = DateTime.Now.AddMonths(- rnd.Next(0, 20))
                };

                var customer8 = new CustomerModel()
                {
                    Address = "Tuulemäe 3 11411 Tallinn",
                    Email = "Vladimir.Putin@gmail.com",
                    Name = "Vladimir Putin",
                    ID = rnd.Next(0, int.MaxValue),
                    PhoneNumber =
                        String.Format("+372 55 {0} {1}", rnd.Next(1, 999).ToString("000"),
                            rnd.Next(1, 999).ToString("000")),
                    IsPremium = true,
                    Start = DateTime.Now.AddMonths(-rnd.Next(0, 20))
                };
                var mask = "";
                for (int i = 0; i < int.MaxValue.ToString().Length; i++)
                {
                    mask = mask + "0";
                }

                agrList.Add(customer1);
                agrList.Add(customer2);
                agrList.Add(customer3);
                agrList.Add(customer4);
                agrList.Add(customer5);
                agrList.Add(customer6);
                agrList.Add(customer7);
                agrList.Add(customer8);

                CustomersStorage.Customers = agrList.OrderBy(o => o.Name).ToList();
            }
        }

        public List<CustomerModel> GetCustomers()
        {
            Log.DebugFormat("{0}()", MethodBase.GetCurrentMethod().Name);

            // Check DB
            if (CustomersStorage.Customers == null)
            {
                DemoInit(false);
            }



            return CustomersStorage.Customers;
        }

        public CustomerModel GetCustomer(int id)
        {
            Log.DebugFormat("{0}({1})", MethodBase.GetCurrentMethod().Name, id);

            // Check DB
            if (CustomersStorage.Customers == null)
            {
                DemoInit(false);
            }

            return CustomersStorage.Customers.FirstOrDefault(w => w.ID == id);
        }
    }
}