import unittest
from exchanges.venue import Venue
import pandas as pd

class TestVenue(unittest.TestCase):
    def setUp(self):
        self.venue = Venue('../exchanges/nyse.yml')

    def test_is_trading_time(self):
        timestamp = pd.Timestamp('2022-01-03 10:00:00')  # A Monday within trading hours
        self.assertTrue(self.venue.is_trading_time(timestamp))

    def test_is_regular_trading_day(self):
        day = pd.Timestamp('2022-01-03')  # A Monday
        self.assertTrue(self.venue.is_regular_trading_day(day))

    def test_is_non_trading_day(self):
        day = pd.Timestamp('2022-01-01')  # A Saturday
        self.assertTrue(self.venue.is_non_trading_day(day))

    def test_is_regular_non_trading_day(self):
        day = pd.Timestamp('2022-01-01')  # A Saturday
        self.assertTrue(self.venue.is_regular_non_trading_day(day))

    def test_is_irregular_non_trading_day(self):
        day = pd.Timestamp('2022-01-01')  # A Saturday
        self.assertFalse(self.venue.is_irregular_non_trading_day(day))

    def test_is_partial_trading_day(self):
        day = pd.Timestamp('2022-01-01')  # A Saturday
        self.assertFalse(self.venue.is_partial_trading_day(day))

    def test_get_trading_hours(self):
        day = pd.Timestamp('2022-01-03')  # A Monday
        trading_hours, reason = self.venue.get_trading_hours(day)
        self.assertEqual(reason, "Regular Trading Day")

if __name__ == '__main__':
    unittest.main()
