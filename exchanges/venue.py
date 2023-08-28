import os
import pytz
import pandas as pd
import yaml


class Venue:
    def __init__(self, yaml_file_path):
        # yaml_file_path = "C:/Repos/fincal/exchanges/nyse.yml"
        # yaml_file_path = "./exchanges/nyse.yml"
        print(f"Current yaml_filePath: {yaml_file_path}")
        print(f"Current working directory for Venue: {os.getcwd()}")

        with open(yaml_file_path, 'r') as file:
            data = yaml.safe_load(file)
        
        self.timezone = pytz.timezone(data['timezone'])
        self.regular_trading_hours = [
            {"start": pd.Timestamp(trading_hours["gte"], unit='ns'), "end": pd.Timestamp(trading_hours["lt"], unit='ns')} for
            trading_hours in data['regular_trading_hours']]
        self.default_partial_trading_hours = [
            {"start": pd.Timestamp(trading_hours["gte"], unit='ns'), "end": pd.Timestamp(trading_hours["lt"], unit='ns')} for
            trading_hours in data['default_partial_trading_hours']]
        self.regular_trading_days = data['regular_trading_days']
        self.partial_trading_days = data['partial_trading_days']
        self.irregular_non_trading_days = data['non_trading_days']
        self.data_provided_from_date = data['data_provided_from_date']
        self.data_provided_through_date = data['data_provided_through_date']
        self.timezone = pytz.timezone(data['timezone'])
        #TODO: This code is brittle, and assumes alignment between the derived class and base class around gte/lte
        self.regular_trading_hours = [
            {"start": pd.Timestamp(trading_hours["gte"]), "end": pd.Timestamp(trading_hours["lt"])} for
            trading_hours in data['regular_trading_hours']]

        # self.regular_trading_hours = [self._create_date_range(trading_hours)
        #                               for trading_hours in regular_trading_hours]
        # self.pre_regular_trading_hours = [self._create_date_range(trading_hours)
        #                                   for trading_hours in pre_regular_trading_hours]
        # self.post_regular_trading_hours = [self._create_date_range(trading_hours)
        #                                    for trading_hours in post_regular_trading_hours]
        self.default_partial_trading_hours = [
            {"start": pd.Timestamp(trading_hours["gte"]), "end": pd.Timestamp(trading_hours["lt"])} for
            trading_hours in data['regular_trading_hours']]
        # self.default_partial_trading_hours = [self._create_date_range(trading_hours)
        #                                       for trading_hours in default_partial_trading_hours]
        self.regular_trading_days = data['regular_trading_days']
        self.partial_trading_days = data['partial_trading_days']
        self.irregular_non_trading_days = data['non_trading_days']
        self.data_provided_from_date = data['data_provided_from_date']
        self.data_provided_through_date = data['data_provided_through_date']
        # self.market_holidays = market_holidays

    @staticmethod
    def _create_date_range(trading_hours):
        start_key = next((key for key in ['gte', 'gt'] if key in trading_hours), None)
        end_key = next((key for key in ['lte', 'lt'] if key in trading_hours), None)

        start = pd.Timestamp(trading_hours[start_key])
        end = pd.Timestamp(trading_hours[end_key])

        if start_key == 'gt':
            start += pd.Timedelta(1, unit='ns')

        if end_key == 'lt':
            end -= pd.Timedelta(1, unit='ns')

        return pd.date_range(start=start, end=end, freq='N')

    def is_trading_time(self, timestamp):
        day = pd.Timestamp(timestamp)

        # Get trading hours for the given day
        trading_hours, reason = self.get_trading_hours(day)

        # Return True if bool(x) is True for any x in the iterable. If the iterable is empty, return False.
        return any(
            period["start"] <= timestamp <= period["end"]
            for period in trading_hours
        )

    # TODO: Overload the boolean is_xxx_day functions with a version that also returns the reason
    # def is_non_trading_day(self, day, reason):

    def is_regular_trading_day(self, day):
        # Is this a day where trading will happen during the usual hours?
        _, reason = self.get_trading_hours(day, 1)
        return reason == "Regular Trading Day"

    def is_non_trading_day(self, day, reason=None):
        # Is this a day where trading would normally have happened, but for some reason today will not?
        # ?? TODO: should we be respecting "reason" in the case of regular non-trading ??
        return self.is_irregular_non_trading_day(day, reason) or self.is_regular_non_trading_day(day)

    def is_regular_non_trading_day(self, day):
        day_of_week = pd.Timestamp(day).day_name()
        is_regular = day_of_week not in self.regular_trading_days
        return is_regular, 'Regular trading day'

    def is_irregular_non_trading_day(self, day, reason=None):
        # Is this a day where trading would normally have happened, but for some reason did|will not this day?
        day_str = day.strftime('%Y-%m-%d')  # Convert datetime to string
        irregular_reason = False

        if day_str in self.irregular_non_trading_days:
            if reason is None:
                irregular_reason = self.irregular_non_trading_days[day_str]["reason"]
            elif self.irregular_non_trading_days[day_str]["reason"] == reason:
                irregular_reason = self.irregular_non_trading_days[day_str]["reason"]

        return (True, irregular_reason) if irregular_reason else (False, 'N/A')

    def is_partial_trading_day(self, day, reason=None):
        # Is this a day where regular trading hours would normally have occurred, but for some reason today will not?
        regular_reason = False
        day_str = day.strftime('%Y-%m-%d')

        if reason is None:
            regular_reason = self.partial_trading_days[day_str]["reason"]
        elif self.partial_trading_days[day_str]["reason"] == reason:
            regular_reason = self.partial_trading_days[day_str]["reason"]

        return (True, regular_reason) if regular_reason else (False, 'N/A')

    # TODO: create a "is_trading_moment" sort of function, to say whether trading was active at a given moment
    # Or maybe some interpolation of the expanded from/to intraday ranges, so you get a full and explicit picture of
    # 'hours' on any given trading day

    def get_trading_hours(self, day, type=1):
        day_of_week = pd.Timestamp(day).day_name()

        if self.is_non_trading_day(day):
            # TODO: get the non-trading reason from the overloaded is_xxx_reason
            # If it's a non-trading day, return an empty list and the reason
            return [], self.irregular_non_trading_days[day.strftime('%Y-%m-%d')].get('reason', "Non-Trading Day")
        elif self.is_partial_trading_day(day):
            # Get trading hours for the given day using Python 3.8+ assignment expression (Walrus :=)
            # If 'hours' key exists in the dictionary for the given day, assign its value to 'trading_hours'
            # If 'hours' key doesn't exist, assign None to 'trading_hours'
            if trading_hours := self.partial_trading_days[day].get('hours'):
                # TODO: BRITTLE - This code assumes alignment between the derived class and base class around gte/lte
                return [{"start": pd.Timestamp(hour["gte"]), "end": pd.Timestamp(hour["lte"])} for hour in
                        trading_hours], self.partial_trading_days[day].get('reason', "Partial Trading Day")
            else:
                # 'trading_hours' is None, so return default partial hours
                # TODO: BRITTLE - This code assumes alignment between the derived class and base class around gte/lte
                return [{"start": pd.Timestamp(hour["gte"]), "end": pd.Timestamp(hour["lte"])} for hour in
                        self.default_partial_trading_hours], "Partial Trading Day"
        elif day_of_week in self.regular_trading_days:
            # TODO: exclude anticipated future holidays, beyond the hard-coded ones
            # If it isn't a partial or a non-trading day, it's a regular trading day, return regular hours
            return self.regular_trading_hours, "Regular Trading Day"
        else:
            # If it's not a regular trading day, return an empty list and "Non-Standard Trading Day" as the reason
            return [], "Non-Regular Trading Day"

    @staticmethod
    def _convert_temp_days_to_final_format(temp_dict):
        final_dict = {}
        for reason, date_dict in temp_dict.items():
            for mm_dd, years in date_dict.items():
                for year in years:
                    final_dict[f"{year}-{mm_dd}"] = {"reason": reason}

        # Return an unsorted dictionary since additional elements may be appended later
        return final_dict
