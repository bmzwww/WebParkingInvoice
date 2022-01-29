using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Web;
using WebParkingInvoice.Models;

namespace WebParkingInvoice.Services
{


    public interface ICalculationService
    {
        void CalculateInvoice(InvoiceModel invoice);
    }

    public class CalculationService : ICalculationService
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public readonly double PremiumDayTariff = Convert.ToDouble(ConfigurationManager.AppSettings["PremiumDayTariff"]);
        public readonly double PremiumNightTariff = Convert.ToDouble(ConfigurationManager.AppSettings["PremiumNightTariff"]);
        public readonly double RegularDayTariff = Convert.ToDouble(ConfigurationManager.AppSettings["RegularDayTariff"]);
        public readonly double RegularNightTariff = Convert.ToDouble(ConfigurationManager.AppSettings["RegularNightTariff"]);
        public readonly double PremiumMaxInvoice = Convert.ToDouble(ConfigurationManager.AppSettings["PremiumMaxInvoice"]);
                public readonly double PremiumMonthlyFee = Convert.ToDouble(ConfigurationManager.AppSettings["PremiumMonthlyFee"]);
                public readonly double Tax = Convert.ToDouble(ConfigurationManager.AppSettings["Tax"]) / 100;



        public void CalculateInvoice(InvoiceModel invoice)
        {
            foreach (var pi in invoice.Items)
            {
                pi.Price = pi.Amount.Day > 0 ? pi.Amount.Day * GetTariff(true, invoice.Customer.IsPremium) : pi.Amount.Night * GetTariff(false, invoice.Customer.IsPremium);
                pi.Rate = (pi.Amount.Day > 0 ? GetTariff(true, invoice.Customer.IsPremium).ToString("0.00") : GetTariff(false, invoice.Customer.IsPremium).ToString("0.00")) + " EUR";
                pi.Details = String.Format(@"Day {0}, {1} - {2}", pi.PeriodStart.Day, pi.PeriodStart.ToString("HH:mm"),
                    pi.PeriodEnd.ToString("HH:mm"));
                pi.PriceStr = pi.Price.ToString("0.00") + " EUR";
            }

            // Total
            invoice.Price = invoice.Items.Sum(s => s.Price);
            invoice.PriceStr = invoice.Price.ToString("0.00") + " EUR";

            invoice.TaxAmount = invoice.Price * Tax;
            invoice.TaxAmountStr = invoice.TaxAmount.ToString("0.00") + " EUR";

            invoice.Balance = invoice.TaxAmount + invoice.Price;
            invoice.BalanceStr = invoice.Balance.ToString("0.00") + " EUR";

            invoice.TaxStr = ((int)(Tax * 100)).ToString() + " %";

           // invoice.InvoiceDate = DateTime.Now.Date;
           // invoice.DueDate = invoice.InvoiceDate.Value.AddDays(21);
            
            // Premium

            if (invoice.Customer.IsPremium)
            {
                if (invoice.Balance > PremiumMaxInvoice)
                {
                    var priceLimit = PremiumMaxInvoice/1.2;
                    var priceDiff = invoice.Price - priceLimit;
                    invoice.Price = priceLimit;
                    invoice.PriceStr = invoice.Price.ToString("0.00") + " EUR";

                    invoice.TaxAmount = invoice.Price * Tax;
                    invoice.TaxAmountStr = invoice.TaxAmount.ToString("0.00") + " EUR";

                    invoice.Balance = PremiumMaxInvoice;
                    invoice.BalanceStr = invoice.Balance.ToString("0.00") + " EUR";

                    var pi = new ParkInfoPriceModel()
                    {
                        Price = -priceDiff,
                        Amount = new AmountModel() { Day = 1 }
                    };

                    pi.PriceStr = pi.Price.ToString("0.00") + " EUR";
                    pi.Rate = pi.Price.ToString("0.00") + " EUR";
                    pi.Details = "Premium price cap garantee";
                    invoice.Items.Add(pi);
                }

                {
                    var pi = new ParkInfoPriceModel()
                    {
                        Price = PremiumMonthlyFee,
                        Amount = new AmountModel()
                        {Day = 1}
                    };
                    pi.PriceStr = pi.Price.ToString("0.00") + " EUR";
                    pi.Rate = pi.Price.ToString("0.00") + " EUR";
                    pi.Details = "Premium monthly fee";
                    invoice.Items.Insert(0, pi);
                }
            }


     

           

            invoice.Status = InvoiceStatus.Calculated;
            invoice.StatusStr = invoice.Status.ToString();
            Log.InfoFormat("{0}({1}): {2}, {3}, {4}", MethodBase.GetCurrentMethod().Name, invoice.Number, invoice.StatusStr, invoice.Details, invoice.BalanceStr);
        }

        public double GetTariff(bool isDay, bool isPremium)
        {
            if (isPremium)
            {
                if (isDay)
                {
                    return PremiumDayTariff;
                }
                else
                {
                    return PremiumNightTariff;
                }
            }
            else
            {
                if (isDay)
                {
                    return RegularDayTariff;
                }
                else
                {
                    return RegularNightTariff;
                }
            }
        }
    }
}