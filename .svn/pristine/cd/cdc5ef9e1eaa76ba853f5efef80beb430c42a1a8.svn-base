using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Web;
using WebParkingInvoice.Models;
using WebParkingInvoice.Static;

namespace WebParkingInvoice.Services
{
    public interface IInvoiceService
    {
        void DemoInit(bool forceInit);
        List<InvoiceModel> GetInvoices();
        InvoiceModel GetInvoice(string id);
        void CalculateInvoice(string id);
        void SendInvoice(string id);
    }

    public class InvoiceService : IInvoiceService
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        IParkInfoService _iParkInfoService;
        ICalculationService _iCalculationService;
        IHoursCalculationService _iHoursCalculationService;

        public InvoiceService(IParkInfoService iParkInfoService, ICalculationService iCalculationService, IHoursCalculationService iHoursCalculationService)
        {
            _iParkInfoService = iParkInfoService;
            _iCalculationService = iCalculationService;
            _iHoursCalculationService = iHoursCalculationService;
        }

        public List<InvoiceModel> GetInvoices()
        {
            Log.DebugFormat("{0}()", MethodBase.GetCurrentMethod().Name);

            if (InvoicesStorage.Invoices == null)
            {
                DemoInit(false);
            }

            // SLEEP 
            Thread.Sleep(200);

            return InvoicesStorage.Invoices;
        }
        public InvoiceModel GetInvoice(string id)
        {
            Log.DebugFormat("{0}({1})", MethodBase.GetCurrentMethod().Name, id);

            if (InvoicesStorage.Invoices == null)
            {
                DemoInit(false);
            }

            var invoice = InvoicesStorage.Invoices.FirstOrDefault(w => w.Number == id);

            // SLEEP 
            Thread.Sleep(500);

            if (invoice == null)
            {
                return null;
            }

            if (invoice.Status == InvoiceStatus.Draft)
            {
                // Return Draft Invoice
                return new InvoiceModel()
                {
                    Balance = 0,
                    BalanceStr = "-",
                    Items = new List<ParkInfoPriceModel>(),
                    Customer = invoice.Customer,
                    Details = invoice.Details,
                    Number = invoice.Number,
                    Price = 0,
                    PriceStr = "-",
                    Status = invoice.Status,
                    StatusStr = invoice.StatusStr,
                    TaxAmount = 0,
                    TaxAmountStr = "-",
                    TaxStr = "-"
                };
            }

        

            return invoice;
        }

        public void CalculateInvoice(string id)
        {
            Log.DebugFormat("{0}({1})", MethodBase.GetCurrentMethod().Name, id);

            if (id == "CalculateAll")
            {
                var invoices = InvoicesStorage.Invoices.Where(w => w.Status == InvoiceStatus.Draft || w.Status == InvoiceStatus.Calculated);
                foreach (var invoice in invoices)
                {
                    _iCalculationService.CalculateInvoice(invoice);

                }
            }
            else
            {
                var invoice = InvoicesStorage.Invoices.FirstOrDefault(w => w.Number == id);

                if (invoice != null)
                {

                    if (invoice.Status == InvoiceStatus.Draft || invoice.Status == InvoiceStatus.Calculated)
                    {
                        _iCalculationService.CalculateInvoice(invoice);
                    }
                }
            }


        }

        public void SendInvoice(string id)
        {
            Log.DebugFormat("{0}({1})", MethodBase.GetCurrentMethod().Name, id);

            if (id == "SendAll")
            {
                var invoices = InvoicesStorage.Invoices.Where(w => w.Status == InvoiceStatus.Calculated);
                foreach (var invoice in invoices)
                {
                   
                        // Send calculated invoice

                        // Email sender should be implemented here
                        var success = true;


                        if (success)
                        {
                            // Apply changes
                            invoice.Status = InvoiceStatus.Sent;
                            invoice.StatusStr = InvoiceStatus.Sent.ToString();
                            invoice.InvoiceDate = DateTime.Now.Date;
                            invoice.DueDate = invoice.InvoiceDate.Value.AddDays(21);
                            Log.InfoFormat("{0}({1}): {2}, {3}, {4}, InvoiceDate={5}, DueDate={6}, Email={7}, Name={8}", MethodBase.GetCurrentMethod().Name, invoice.Number, invoice.StatusStr, invoice.Details, invoice.BalanceStr, invoice.InvoiceDate.Value.ToString("yyyy.MM.dd"), invoice.DueDate.Value.ToString("yyyy.MM.dd"), invoice.Customer.Email, invoice.Customer.Name);
                        }
                    
                }

            }
            else
            {
                var invoice = InvoicesStorage.Invoices.FirstOrDefault(w => w.Number == id);

                if (invoice != null)
                {

                    if (invoice.Status == InvoiceStatus.Calculated)
                    {
                        // Send calculated invoice

                        // Email sender should be implemented here
                        var success = true;


                        if (success)
                        {
                            // Apply changes
                            invoice.Status = InvoiceStatus.Sent;
                            invoice.StatusStr = InvoiceStatus.Sent.ToString();
                            invoice.InvoiceDate = DateTime.Now.Date;
                            invoice.DueDate = invoice.InvoiceDate.Value.AddDays(21);
                        }
                    }
                }
            }
           
        }

        public void DemoInit(bool forceInit)
        {
            Log.DebugFormat("{0}({1})", MethodBase.GetCurrentMethod().Name, forceInit);

            if (ParkInfoStorage.ParkInfoCollection == null)
            {
                _iParkInfoService.DemoInit(forceInit);
            }

            if (InvoicesStorage.Invoices == null || forceInit)
            {
                var list = new List<InvoiceModel>();
                var info = new DateTimeFormatInfo();
                var rnd = new Random();

                var q =
                    ParkInfoStorage.ParkInfoCollection.GroupBy(
                        g => new {g.Customer, g.PeriodStart.Month, g.PeriodStart.Year}).ToList();

                foreach (var s in q)
                {
                    var im = new InvoiceModel()
                    {
                        Customer = s.Key.Customer,
                        Details = String.Format(@"Payment for {0} {1}", s.Key.Year, info.GetMonthName(s.Key.Month)),
                        Balance = 0,
                        BalanceStr = "0.00 EUR",
                        DueDate = null,
                        InvoiceDate = null,
                        Number =
                            String.Format(@"{0}{1}{2}", s.Key.Year.ToString("0000"),
                                info.GetMonthName(s.Key.Month).Substring(0, 3).ToUpper(),
                                rnd.Next(1, 9999).ToString("0000")),
                        Status = InvoiceStatus.Draft,
                        StatusStr = InvoiceStatus.Draft.ToString(),
                

                    };

                    //im.Items = s.SelectMany(s2 => _iHoursCalculationService.CalculateIntervals(s2)).ToList();
                    
                    im.Items = new List<ParkInfoPriceModel>();

                    foreach (var m in s)
                    {
                        var list2 = _iHoursCalculationService.CalculateIntervals(m);
                        _iHoursCalculationService.ApplyFixedIntervals(im, list2);
                    }

                    im.Items = im.Items.OrderBy(o => o.PeriodStart).ToList();

                    list.Add(im);
                }

                for (var i = 0; i < list.Count; i++)
                {
                    list[i].ID = i + 1;
                }

                InvoicesStorage.Invoices = list.OrderBy(o=> o.Customer.Name).ToList();

                var testIn = list.Where(w => w.Customer.Name.Contains("Vladimir")).FirstOrDefault();
                if (testIn != null)
                {
                   // _iCalculationService.CalculateInvoice(testIn);
                    CalculateInvoice(testIn.Number);
                   SendInvoice(testIn.Number);
                }

                var testIn2 = list.Where(w => w.Customer.Name.Contains("Svensson")).FirstOrDefault();
                if (testIn2 != null)
                {
                    // _iCalculationService.CalculateInvoice(testIn);
                    CalculateInvoice(testIn2.Number);
                }
            }
        }

       
    }
}