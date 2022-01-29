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
    public interface IParkInfoService
    {
        void DemoInit(bool forceInit);
        List<ParkInfoModel> GetParkInfoOverview();
        List<ParkInfoModel> GetCustomerParkInfo(int id);
    }

    public class ParkInfoService : IParkInfoService
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        IHoursCalculationService _iHoursCalculationService;
        ICustomersService _iCustomersService;

        public ParkInfoService(IHoursCalculationService iHoursCalculationService, ICustomersService iCustomersService)
        {
            _iHoursCalculationService = iHoursCalculationService;
            _iCustomersService = iCustomersService;
        }

        public void DemoInit(bool forceInit)
        {
            Log.DebugFormat("{0}({1})", MethodBase.GetCurrentMethod().Name, forceInit);

            if (CustomersStorage.Customers == null)
            {
                _iCustomersService.DemoInit(forceInit);
            }

            // Generate ParkInfo
            if (ParkInfoStorage.ParkInfoCollection == null || forceInit)
            {
                var list = new List<ParkInfoModel>();
                var defaultParkHouse = new ParkHouseModel() { ID = 1, Address = "Tallinn", Name = "ParkHouse 1" };

                var rnd = new Random();

                var cur = DateTime.Now.Date;
                cur = cur.AddDays(-cur.Day);

                // Random cycle
                var maxCycle = rnd.Next(100, 600);

                while (list.Count < maxCycle)
                {
                    // Random.Next not include MaxValue
                    var customerPos = rnd.Next(0, CustomersStorage.Customers.Count);
                    var customer = CustomersStorage.Customers[customerPos];

                    var day1 = rnd.Next(1, cur.Day);
             
                    var h1 = rnd.Next(1, 24);
                    var h2 = rnd.Next(1, 24);
                    var m1 = rnd.Next(1, 60);
                    var m2 = rnd.Next(1, 60);

                    var randomDate1 = new DateTime(cur.Year, cur.Month, day1, h1, m1, 0, DateTimeKind.Local);
                    randomDate1 = randomDate1.ToLocalTime();

                    var randomDate2 = new DateTime(cur.Year, cur.Month, day1, h2, m2, 0, DateTimeKind.Local);

                    // try to put comlex date
                    var compexDate2 = rnd.Next(0, 5);

                    if(compexDate2 == 2)
                    {
                        var day2 = day1 + rnd.Next(1, 4);
                        if (day2 > cur.Day)
                        {
                            day2 = cur.Day;
                        }
                        randomDate2 = new DateTime(cur.Year, cur.Month, day2, h2, m2, 0, DateTimeKind.Local);
                    }

                     randomDate2 = randomDate2.ToLocalTime();
                    // Order date increasing
                    if (randomDate1 > randomDate2)
                    {
                        var x = randomDate1;
                        randomDate1 = randomDate2;
                        randomDate2 = x;
                    }

                    if ((randomDate2 - randomDate1).TotalMinutes > 1)
                    {
                        var intersect = false;

                        foreach (var t in list.Where(w => customer == w.Customer))
                        {
                            if (_iHoursCalculationService.IntersectsWith(randomDate1, randomDate2, t.PeriodStart,
                                t.PeriodEnd))
                            {
                                intersect = true;
                                break;
                            }
                        }

                        if (!intersect)
                        {

                            //var endNight = randomDate1.Date.AddHours(7);

                            //if (randomDate1 > randomDate1.Date.AddDays(-1).AddHours(19) && randomDate1 < endNight)
                            //{
                            //    if (endNight > randomDate2)
                            //    {
                            //        endNight = randomDate2;
                            //    }

                            //    nightPeriodAmount = GetHalfHoursFromDoubleHours( (endNight - randomDate1).TotalHours);
                            //}

                            //var amount = _iHoursCalculationService.CalculateAmount(randomDate1, randomDate2);
                            var pim = new ParkInfoModel()
                            {
                                ID = list.Count + 1,
                                Customer = customer,
                                ParkHouse = defaultParkHouse,
                                PeriodStart = randomDate1,
                                PeriodEnd = randomDate2,
                                Amount = new AmountModel()
                            };

                            var res = _iHoursCalculationService.CalculateIntervals(pim);

                            pim.Amount.Day = res.Sum(s => s.Amount.Day);
                            pim.Amount.Night = res.Sum(s => s.Amount.Night);
                            pim.Amount.DayHours = res.Sum(s => s.Amount.DayHours);
                            pim.Amount.NightHours = res.Sum(s => s.Amount.NightHours);
                            pim.Amount.TotalHours = (pim.PeriodEnd - pim.PeriodStart).TotalHours;
                            pim.Amount.DayAndNight = _iHoursCalculationService.GetAmountFromHours(pim.Amount.TotalHours);

                            list.Add(pim);
                        }
                    }
                }

                //ParkInfoSample.Add(new ParkInfoModel
                //{
                //    ID = 1,
                //    AgreementCode = "AGR00001",
                //    ParkHouse = defaultParkHouse,
                //    PeriodStart = DateTime.Now.AddMonths(-1).AddDays(10).AddHours(-1).AddMinutes(-15),
                //    PeriodEnd = DateTime.Now.AddMonths(-1).AddDays(10),
                //});

                //ParkInfoSample.Add(new ParkInfoModel
                //{
                //    ID = 2,
                //    AgreementCode = "AGR00002",
                //    ParkHouse = defaultParkHouse,
                //    PeriodStart = DateTime.Now.AddMonths(-1).AddDays(10).AddHours(-1).AddMinutes(-15),
                //    PeriodEnd = DateTime.Now.AddMonths(-1).AddDays(10),
                //});
                ParkInfoStorage.ParkInfoCollection = list.OrderBy(o => o.PeriodStart).ToList();
            }
        }

        public List<ParkInfoModel> GetParkInfoOverview()
        {
            Log.DebugFormat("{0}()", MethodBase.GetCurrentMethod().Name);

            // Check DB
            if (ParkInfoStorage.ParkInfoCollection == null)
            {
                DemoInit(false);
            }

            var info = new DateTimeFormatInfo();

            var q = ParkInfoStorage.ParkInfoCollection.GroupBy(g => new { g.Customer, g.ParkHouse, g.PeriodStart.Month, g.PeriodStart.Year })
                    .Select(s => new ParkInfoModel()
                    {
                        Customer = s.Key.Customer,
                        Amount =
                            new AmountModel()
                            {
                                Day= s.Sum(s2 => s2.Amount.Day),
                                Night = s.Sum(s2 => s2.Amount.Night),
                                DayHours = s.Sum(s2 => s2.Amount.DayHours),
                                NightHours =  s.Sum(s2 => s2.Amount.NightHours),
                                DayAndNight = s.Sum(s2 => s2.Amount.DayAndNight),
                                TotalHours = s.Sum(s2 => s2.Amount.TotalHours),
                            },
                        ParkHouse = s.Key.ParkHouse,
                        Details = String.Format(@"{0}, {1}",s.Key.Year, info.GetMonthName(s.Key.Month))
                    }).OrderBy(o =>o.Customer.Name).ToList();

            // SLEEP 
            Thread.Sleep(100);

            return q;
        }

        public List<ParkInfoModel> GetCustomerParkInfo(int id)
        {
            Log.DebugFormat("{0}({1})", MethodBase.GetCurrentMethod().Name, id);

            // Check DB
            if (ParkInfoStorage.ParkInfoCollection == null)
            {
                DemoInit(false);
            }

            // SLEEP 
            Thread.Sleep(200);

            return ParkInfoStorage.ParkInfoCollection.Where(w => w.Customer.ID == id).ToList();
        }
    }
}