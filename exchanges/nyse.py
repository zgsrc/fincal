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

            partial_trading_days=self._partial_trading_days(),  # the 'regular_trading_hours' for partial days
            non_trading_days=self._non_trading_days(),  # days trading would normally have happened, but didn't
            data_provided_from_date="1996-01-01",
            data_provided_through_date="2017-01-01",
            # market_holidays=1,  # marketholidays was for forecasting the future - when would we be off in the future?
        )

    def _non_trading_days(self):
        # Add all the non-trading days for each year here, organized by Reason, MM-DD
        non_trading_days_temp = {
            "New Year's Day": {
                "01-01": ["1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006",
                          "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2018"],
                "01-02": ["2017"],
            },
            "Independence Day": {
                "07-03": ["2015"],
                "07-04": ["1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2005", "2006", "2007", "2008",
                          "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
                "07-05": ["2004"],
            },
        }

        return self._convert_temp_days_to_final_format(non_trading_days_temp)

    def _partial_trading_days(self):
        # Add all the partial trading days for each year here
        # signals a "trading opened" event, followed by a "trading closed" event

        # put holidays here that conform to 'standard partial trading-day hours
        partial_trading_days_temp = {
            "Day Before Martin Luther King Day": {
                "01-12": ["2001", "2007"],
                "01-13": ["2006", "2012"],
                "01-14": ["2000", "2005", "2011"],
                "01-15": ["1999", "2010", "2016"],
                "01-16": ["2004", "2009", "2015"],
                "01-17": ["2003", "2014"],
                "01-18": ["2002", "2008", "2013"],
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
