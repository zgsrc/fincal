from datetime import datetime
import pytz
from dateutil.parser import parse

class FinancialCalendar:
    def __init__(self, timezone):
        self.timezone = pytz.timezone(timezone) # Set your local timezone here

    def here(self, date=None):
        self.timezone = date
        if date:
            if isinstance(date, datetime):
                local_date = date.astimezone(self.timezone)
                return local_date.astimezone(self.timezone)
            elif isinstance(date, str):
                parsed_date = parse(date)
                local_date = parsed_date.astimezone(self.timezone)
                return local_date.astimezone(self.timezone)
            elif isinstance(date, (int, float)):
                local_date = datetime.fromtimestamp(date, self.timezone)
                return local_date.astimezone(self.timezone)
            elif isinstance(date, dict):
                local_date = datetime(**date).astimezone(self.timezone)
                return local_date.astimezone(self.timezone)
            else:
                raise ValueError(f"Unrecognized date {str(date)}")
        else:
            local_date = datetime.now(self.timezone)
            return local_date.astimezone(self.timezone)

    @staticmethod
    def there(date, timezone):
        if not date:
            return datetime.now(tz=pytz.timezone(timezone))
        tz = pytz.timezone(timezone)
        if isinstance(date, datetime):
            return date.astimezone(tz)
        elif isinstance(date, str):
            date_obj = parse(date)
            return date_obj.astimezone(tz)
        elif isinstance(date, int):
            date_obj = datetime.fromtimestamp(date)
            return date_obj.astimezone(tz)
        elif isinstance(date, dict):
            date_obj = datetime(**date)
            return date_obj.astimezone(tz)
        else:
            raise TypeError(f"Unrecognized date {date}")

    @staticmethod
    def set_timezone_here(tz):
        pytz.default_timezone = tz

    def areMarketsOpenToday(self):
        return self.isTradingDay()

    def areMarketsOpenOn(self, date):
        return self.isTradingDay(date)

    def areMarketsOpenNow(self, extended=False):
        return self.isTradingSession(extended=extended)

    def areMarketsOpenAt(self, datetime, extended=False):
        return self.isTradingSession(datetime, extended)
