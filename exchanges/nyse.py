from exchanges.venue import Venue
# from marketanalysis import marketholidays


"""  New York Stock Exchange (NYSE)
Sources:
https://s3.amazonaws.com/armstrongeconomics-wp/2013/07/NYSE-Closings.pdf
https://www.sifma.org/resources/general/us-holiday-archive/
https://moneyzine.com/investments/stock-market-holidays/
"""


class NYSE(Venue):

    def __init__(self):
        super().__init__(
            timezone="America/New_York",
            regular_trading_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            regular_trading_hours=[{"gte": "9:30 am", "lt": "4:00 pm"}],  # execution must happen before 4pm
            pre_regular_trading_hours=[{"gte": "4:00 am", "lt": "9:30 am"}],
            post_regular_trading_hours=[{"gte": "4:00 pm", "lt": "8:00 pm"}],  # is it lt, or lte?
            default_partial_trading_hours=[{"gte": "9:30 am", "lt": "1:00 pm"}],

            partial_trading_days=self._partial_trading_days(),
            non_trading_days=self._non_trading_days(),  # days trading would normally have happened, but didn't
            data_provided_from_date="1996-01-01",
            data_provided_through_date="2017-01-01",
            # market_holidays=1,  # marketholidays,
        )

    def _non_trading_days(self):
        # Add all the non-trading days for each year here, organized by Reason, MM-DD
        non_trading_days_temp = {
            "New Year's Day": {
                "01-01": ["1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006",
                          "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2018"],
                "01-02": ["2017"],
            },
            "Martin Luther King Day": {
                "01-15": ["1996"],
                "01-18": ["1999", "2005", "2011", "2017"],
                "01-19": ["1998", "2004", "2010", "2016"],
                "01-20": ["1997", "2003", "2009", "2015"],
                "01-21": ["2002", "2008", "2014"],
            },
            "Presidential day of mourning": {
                "06-11": ["2004"],  # President Reagan
            },
            "President’s Day": {
                "02-15": ["1999", "2005", "2010", "2016"],
                "02-16": ["1998", "2004", "2009", "2015"],
                "02-17": ["1997", "2003", "2014"],
                "02-19": ["1996", "2002", "2008", "2013"],
                "02-20": ["2001", "2007", "2012"],
                "02-21": ["2000", "2006", "2011", "2017"],
            },
            "Good Friday": {
                "03-21": ["2008"],
                "03-25": ["2016"],
                "03-29": ["2002", "2013"],
                "04-02": ["1999", "2010"],
                "04-05": ["1996"],
                "04-06": ["2007", "2012"],
                "04-09": ["2004", "2015"],
                "04-10": ["1998", "2009"],
                "04-13": ["2001", "2017"],
                "04-14": ["2006"],
                "04-18": ["2003", "2014"],
                "04-21": ["2000", "2011"],
                "04-22": ["2011"],
            },
            "Memorial Day": {
                "05-25": ["1998", "2004", "2009", "2015"],
                "05-26": ["1997", "2003", "2008", "2014"],
                "05-27": ["1996", "2002", "2013"],
                "05-28": ["2001", "2007", "2012"],
                "05-29": ["2000", "2006", "2017"],
                "05-30": ["2011", "2016"],
                "05-31": ["1999", "2005", "2010", "2021"],
            },
            "Independence Day": {
                "07-03": ["2015"],
                "07-04": ["1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2005", "2006", "2007", "2008",
                          "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
                "07-05": ["2004"],
            },
            "Labor Day": {
                "09-01": ["1997", "2003", "2008", "2014"],
                "09-02": ["1996", "2002", "2013"],
                "09-03": ["2001", "2007"],
                "09-04": ["2006", "2012", "2017"],
                "09-05": ["2005", "2011", "2016"],
                "09-06": ["1999", "2004", "2010"],
                "09-07": ["1998", "2009", "2015"],
            },
            "Columbus Day": {
                "10-08": ["2001", "2007", "2012"],
                "10-09": ["2000", "2006"],
                "10-10": ["2005", "2011", "2016", "2017"],
                "10-11": ["1999", "2004", "2010", "2015"],
                "10-12": ["1998", "2009"],
                "10-13": ["1997", "2003", "2008", "2014"],
                "10-14": ["1996", "2002", "2013"],
            },
            "Veterans Day": {
                "11-09": ["2002", "2003", "2008", "2009", "2014", "2015"],
                "11-10": ["2000", "2006", "2017"],
                "11-11": ["1996", "1997", "1998", "1999", "2004", "2005", "2010", "2011", "2013", "2016"],
                "11-12": ["2001", "2007", "2012"],
            },
            "Thanksgiving": {
                "11-22": ["2001", "2007", "2012"],
                "11-23": ["2000", "2006", "2017"],
                "11-24": ["2005", "2011", "2016"],
                "11-25": ["1999", "2004", "2010"],
                "11-26": ["1998", "2009", "2015"],
                "11-27": ["1997", "2003", "2008", "2014"],
                "11-28": ["1996"],
                "11-29": ["2002", "2013"],
            },
        }

        return self._convert_temp_days_to_final_format(non_trading_days_temp)

    def _partial_trading_days(self):
        # Add all the partial trading days for each year here
        # signals a "trading opened" event, followed by a "trading closed" event

        # put holidays here that conform to 'standard partial trading-day hours
        partial_trading_days_temp = {
            "Day Before Good Friday": {
                "03-20": ["2008"],
                "03-24": ["2005", "2016"],
                "03-28": ["2002", "2013"],
                "04-01": ["1999", "2010"],
                "04-02": ["2015"],
                "04-04": ["1996"],
                "04-05": ["2007", "2012"],
                "04-08": ["2004"],
                "04-09": ["1997", "1998", "2009"],
                "04-12": ["2001"],
                "04-13": ["2006", "2017"],
                "04-17": ["2003", "2014"],
                "04-20": ["2000"],
                "04-21": ["2011"],
            },
            "Day Before Martin Luther King Day": {
                "01-12": ["2001", "2007"],
                "01-13": ["2006", "2012"],
                "01-14": ["2000", "2005", "2011"],
                "01-15": ["1999", "2010", "2016"],
                "01-16": ["2004", "2009", "2015"],
                "01-17": ["2003", "2014"],
                "01-18": ["2002", "2008", "2013"],
            },
            "Day Before Memorial Day": {
                "05-22": ["1998", "2009", "2015"],
                "05-23": ["1997", "2003", "2008", "2014"],
                "05-24": ["1996", "2002", "2013"],
                "05-25": ["2001", "2007", "2012"],
                "05-26": ["2000", "2006", "2017"],
                "05-27": ["2005", "2011", "2016"],
                "05-28": ["1999", "2004", "2010"],
            },
            "Day Before New Year's Day": {
                "12-29": ["2001", "2007", "2018"],
                "12-30": ["2005", "2011", "2012", "2016"],
                "12-31": ["1996", "1997", "1998", "1999", "2001", "2002", "2004", "2007",
                          "2008", "2009", "2012", "2013", "2014", "2015", "2016", "2017"],
            },
            "Day Before President’s Day": {
                "02-13": ["1998", "2004", "2009"],
                "02-14": ["1997", "2003"],
                "02-15": ["2002", "2008"],
                "02-16": ["1996", "2001", "2007"],
                "02-17": ["2006"],
                "02-18": ["2000", "2005"],
            },
            "Day Before Thanksgiving": {
                "11-21": ["2001", "2007"],
                "11-22": ["2000", "2006"],
                "11-23": ["2001", "2005", "2012"],
                "11-24": ["2004", "2006", "2017"],
                "11-25": ["1998", "2005", "2011", "2016"],
                "11-26": ["1997", "2003", "2004", "2008", "2010"],
                "11-27": ["1996", "1998", "2002", "2009", "2015"],
            },
            "Good Friday": {
                "04-02": ["1999", "2010"],# "2021"],
                "04-03": ["2015"],  # not full market close due to release of Employment Data
                "04-06": ["2007", "2012"],
            },
            "Presidential day of mourning": {
                "01-02": ["2007"],  # President Ford
                "11-06": ["2004"],  # President Reagan
            },
        }

        expanded_days = self._convert_temp_days_to_final_format(partial_trading_days_temp)

        # Add any days that use non-standard partial hours here
        expanded_days["1996-01-08"] = {"reason": "Snow storm", "hours": [{"gte": "11:00 am", "lte": "2:00 pm"}]}

        return {k: expanded_days[k] for k in sorted(expanded_days)}

    def _intraday_trading_interruptions(self):
        # signals a "trading paused" event, followed by a "trading resumed" or "trading closed" event
        intra_day_interruptions = {
            "1999-04-26": {"reason": "Columbine", "hours": [{"gte": "12:00 pm", "lt": "12:02 pm"}]},
            "2000-02-16": {"reason": "Walter N Frank", "hours": [{"gte": "12:00 pm", "lt": "12:01 pm"}]}
        }

        return intra_day_interruptions

    @staticmethod
    def _convert_temp_days_to_final_format(temp_dict):
        final_dict = {}
        for reason, date_dict in temp_dict.items():
            for mm_dd, years in date_dict.items():
                for year in years:
                    final_dict[f"{year}-{mm_dd}"] = {"reason": reason}

        # Return an unsorted dictionary since additional elements may be appended later
        return final_dict


# import pytz
#
# self.timezone = pytz.timezone(timezone)  # Set your local timezone here
#
# # New York Stock Exchange
# timezone = "America/New_York"
#
# regular_trading_days = "Weekday"
#
# regular_trading_hours = [
#     {"gte": "9:30 am", "lte": "4:00 pm"}
# ]
#
# pre_regular_trading_hours[
#     {"gte": "4:00 am", "lt": "9:30 am"}
# ]
#
# post_regular_trading_hours[
#     {"gt": "4:00 pm", "lte": "8:00 pm"}
# ]
#
# partial_trading_hours = [
#     {"gte": "9:30 am", "lte": "1:00 pm"}
# ]
#
# partial_trading_days = {
#     2015: {
#         "November": [27],
#         "December": [24]
#     },
#     2016: {
#         "November": [25]
#     },
#     2017: {
#         "July": [3],
#         "November": [24]
#     },
#     2018: {
#         "July": [3],
#         "November": [23],
#         "December": [24]
#     },
#     2019: {
#         "July": [3],
#         "November": [29],
#         "December": [24]
#     },
#     2020: {
#         "November": [27],
#         "December": [24]
#     },
#     2021: {
#         "November": [26]
#     }
# }
#
# holidays = {
#     2015: {
#         "January": [1, 19],
#         "February": [16],
#         "April": [3],
#         "May": [25],
#         "July": [3],
#         "September": [7],
#         "November": [26],
#         "December": [25]
#     },
#     2016: {
#         "January": [1, 18],
#         "February": [15],
#         "March": [25],
#         "May": [30],
#         "July": [4],
#         "September": [5],
#         "November": [24],
#         "December": [26]
#     },
#     2017: {
#         "January": [2, 16],
#         "February": [20],
#         "April": [14],
#         "May": [29],
#         "July": [4],
#         "September": [4],
#         "November": [23],
#         "December": [25]
#     },
#     2018: {
#         "January": [1, 15],
#         "February": [19],
#         "March": [30],
#         "May": [28],
#         "July": [4],
#         "September": [3],
#         "November": [22],
#         "December": [5, 25]
#     },
#     2019: {
#         "January": [1, 21],
#         "February": [18],
#         "April": [19],
#         "May": [27],
#         "July": [4],
#         "September": [2],
#         "November": [28],
#         "December": [25]
#     },
#     2020: {
#         "January": [1, 20],
#         "February": [17],
#         "April": [10],
#         "May": [25],
#         "July": [3],
#         "September": [7],
#         "November": [26],
#         "December": [25]
#     },
#     2021: {
#         "January": [1, 18],
#         "February": [15],
#         "April": [2],
#         "May": [31],
#         "July": [5],
#         "September": [6],
#         "November": [25],
#         "December": [24]
#     }
# }
