using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebParkingInvoice.Models;

namespace WebParkingInvoice.Services
{
    public interface IHoursCalculationService
    {
       // AmountModel CalculateAmount(DateTime randomDate1, DateTime randomDate2);
        List<ParkInfoPriceModel> CalculateIntervals(ParkInfoModel model);

        bool IntersectsWith(DateTime start1, DateTime end1, DateTime start2, DateTime end2);

        int GetAmountFromHours(double hours);
        void ApplyFixedIntervals(InvoiceModel im, List<ParkInfoPriceModel> list2);
    }

    public class HoursCalculationService : IHoursCalculationService
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public List<ParkInfoPriceModel> CalculateIntervals(ParkInfoModel model)
        {
            var randomDate1 = model.PeriodStart;
            var randomDate2 = model.PeriodEnd;

            var list = new List<ParkInfoPriceModel>();

            while (randomDate1 < randomDate2)
            {
                if (randomDate1 < randomDate1.Date.AddHours(7))
                {
                    var p = new ParkInfoPriceModel()
                    {
                        ID = model.ID,
                        PeriodStart = randomDate1,
                        PeriodEnd = randomDate2 > randomDate1.Date.AddHours(7) ? randomDate1.Date.AddHours(7) : randomDate2,
                        Amount = new AmountModel()
                    };
  
                    p.Amount.NightHours = (p.PeriodEnd - p.PeriodStart).TotalHours;
                    p.Amount.Night = GetAmountFromHours(p.Amount.NightHours);
             

                    list.Add(p);
                    randomDate1 = p.PeriodEnd;
                }
                else
                {
                    if (randomDate1 < randomDate1.Date.AddHours(19))
                    {
                        var p = new ParkInfoPriceModel()
                        {
                            ID = model.ID,
                            PeriodStart = randomDate1,
                            PeriodEnd = randomDate2 > randomDate1.Date.AddHours(19) ? randomDate1.Date.AddHours(19) : randomDate2,
                            Amount = new AmountModel()
                        };


                        p.Amount.DayHours = (p.PeriodEnd - p.PeriodStart).TotalHours;
                        p.Amount.Day = GetAmountFromHours(p.Amount.DayHours);
              
                        list.Add(p);
                        randomDate1 = p.PeriodEnd;
                    }
                    else
                    {
                        var p = new ParkInfoPriceModel()
                        {
                            ID = model.ID,
                            PeriodStart = randomDate1,
                            PeriodEnd = randomDate2 > randomDate1.Date.AddDays(1).AddHours(7) ? randomDate1.Date.AddDays(1).AddHours(7) : randomDate2,
                            Amount = new AmountModel()
                        };


                        p.Amount.NightHours = (p.PeriodEnd - p.PeriodStart).TotalHours;
                        p.Amount.Night = GetAmountFromHours(p.Amount.NightHours);
                 

                        list.Add(p);
                        randomDate1 = p.PeriodEnd;
                    }
                }

            }
            //// 00:00 - 07:00
            //if (IntersectsWith(randomDate1, randomDate2, night1Start, night1End))
            //{
            //    var s = randomDate1;
            //    var e = randomDate2;
            //    if (s < night1Start)
            //    {
            //        s = night1Start;
            //    }
            //    if (e > night1End)
            //    {
            //        e = night1End;
            //    }
            //    var h = (e - s).TotalHours;

            //    nightPeriodAmount = nightPeriodAmount + GetAmountFromHours(h);

            //    list.Add(new ParkInfoPriceModel { PeriodStart = s, PeriodEnd = e, Amount = new AmountModel { Night = nightPeriodAmount } });
            //}

            //// 07:00 - 19:00
            //if (IntersectsWith(randomDate1, randomDate2, day1Start, day1End))
            //{
            //    var s = randomDate1;
            //    var e = randomDate2;
            //    if (s < day1Start)
            //    {
            //        s = day1Start;
            //    }
            //    if (e > day1End)
            //    {
            //        e = day1End;
            //    }
            //    var h = (e - s).TotalHours;
            //    dayPeriodAmount = dayPeriodAmount + GetAmountFromHours(h);

            //    list.Add(new ParkInfoPriceModel { PeriodStart = s, PeriodEnd = e, Amount = new AmountModel { Day = dayPeriodAmount } });
            //}

            return list;
        }


        public bool IntersectsWith(DateTime start1, DateTime end1, DateTime start2, DateTime end2)
        {
            return !((end2 < start1) || (start2 > end1)); //returns true
        }

        public int GetAmountFromHours(double hours)
        {
            var res = 0;
            var am = hours / 0.5;
            var amleft = hours % 0.5;
            res = Convert.ToInt32(am - amleft);
            if (amleft > 0)
            {
                res++;
            }
            return res;
        }

        public void ApplyFixedIntervals(InvoiceModel im, List<ParkInfoPriceModel> list2)
        {
            if (list2.Count(a => a.Amount.DayHours%0.5 > 0 || a.Amount.NightHours%0.5 > 0) == 2)
            {
                var x2 = list2.Where(a => a.Amount.DayHours%0.5 > 0 || a.Amount.NightHours%0.5 > 0).ToList();
                var diff1 = (x2[0].Amount.DayHours + x2[0].Amount.NightHours)%0.5;
                var diff2 = (x2[1].Amount.DayHours + x2[1].Amount.NightHours)%0.5;

                if (diff1 + diff2 <= 0.5)
                {
                    // Do it
                    var first = x2[0];

                    if (diff1 > diff2)
                    {
                        first = x2[1];
                    }


                    if (first != null)
                    {
                        if (first.Amount.Day > 0)
                        {
                            first.Amount.Day = first.Amount.Day - 1;
                        }
                        else
                        {
                            first.Amount.Night = first.Amount.Night - 1;
                        }

                        first.Amount.Comments = "Fair interval";
                    }


                }
            }

            im.Items.AddRange(list2);
        }
    }
}