using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using WebParkingInvoice.Models;
using WebParkingInvoice.Services;

namespace TestConsoleApplication1
{
    class Program
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        static void Main(string[] args)
        {
            // Set default culture info
            var cultureInfo = new CultureInfo("en-US");
            Thread.CurrentThread.CurrentCulture = cultureInfo;

            // Test log
            TestLog();

            var maxCycle = 999;
            while (maxCycle > 0)
            {
                TestIntervals();
                TestCalculation();
                maxCycle--;
            }
        }

        private static void TestLog()
        {
            //log.Info("Test");
        }

        public static void TestIntervals()
        {
            var service = new HoursCalculationService();
            var amount1 = service.CalculateIntervals(new ParkInfoModel() { PeriodStart = DateTime.Now, PeriodEnd = DateTime.Now.AddHours(1) });
            var amount2 = service.CalculateIntervals(new ParkInfoModel() { PeriodStart = DateTime.Now, PeriodEnd = DateTime.Now.AddDays(1) });
            var amount3 = service.CalculateIntervals(new ParkInfoModel() { PeriodStart = DateTime.Now, PeriodEnd = DateTime.Now.AddDays(2) });
        }


        public static void TestCalculation()
        {
            var calculactionService = new CalculationService();
            var hoursCalculationService = new HoursCalculationService();

            var customerService = new CustomersService();
            customerService.DemoInit(true);

            var parkInfoService = new ParkInfoService(hoursCalculationService, customerService);
            parkInfoService.DemoInit(true);

            var invoiceService = new InvoiceService(parkInfoService, calculactionService, hoursCalculationService);
            invoiceService.DemoInit(true);


            var invoices = invoiceService.GetInvoices();
            foreach (var invoice in invoices)
            {
                calculactionService.CalculateInvoice(invoice);
            }

            foreach (var customer in customerService.GetCustomers())
            {
                var parkInfos = parkInfoService.GetCustomerParkInfo(customer.ID);


                var sum = parkInfos.Sum(s => s.Amount.DayAndNight);
                var hours1 = parkInfos.Sum(s => s.Amount.TotalHours);

                var invoice = invoices.FirstOrDefault(w => w.Customer.ID == customer.ID);
                if (invoice != null)
                {
                    var sum2 = invoice.Items.Where(w => w.Details.Contains("Day") && (w.Amount.DayHours > 0|| w.Amount.NightHours > 0)).Sum(s => s.Amount.Day + s.Amount.Night);
                    var hours2 = invoice.Items.Sum(s => s.Amount.DayHours + s.Amount.NightHours);

                    if (sum2 != sum)
                    {
                        Console.WriteLine("Missmatch {0} ({2}) != {1} ({3})", sum, sum2, hours1, hours2);
                    

                        var gr =
                            invoice.Items.Where(
                                w => w.Details.Contains("Day") && (w.Amount.DayHours > 0 || w.Amount.NightHours > 0))
                                .GroupBy(g => g.ID).ToDictionary(k => k.Key, v => v.ToList());

                        foreach (var p in parkInfos)
                        {
                            if (p.Amount.DayAndNight == 0)
                            
                            {

                            }

                            var pSum = p.Amount.DayAndNight;
                            var iSum = gr[p.ID].Sum(s => s.Amount.Day + s.Amount.Night);
                            if (pSum != iSum)
                            {
                                Console.WriteLine("Missmatch {0} ({2}) != {1} ({3})", pSum, iSum, hours1, hours2);
                                Console.ReadLine();

                                var list2 = hoursCalculationService.CalculateIntervals(p);
                                hoursCalculationService.ApplyFixedIntervals(invoice, list2);

                                Console.ReadLine();
                            }
                        }
                    
                    }
                }
            }
        }
    }
}
