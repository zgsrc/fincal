import pytest
from exchanges.venue import Venue
import pandas as pd

@pytest.fixture
def venue():
    return Venue('correct/path/to/nyse.yml')

def test_is_trading_time(venue):
    timestamp = pd.Timestamp('2022-01-03 10:00:00')  # A Monday within trading hours
    assert venue.is_trading_time(timestamp)

def test_is_regular_trading_day(venue):
    day = pd.Timestamp('2022-01-03')  # A Monday
    assert venue.is_regular_trading_day(day)

def test_is_non_trading_day(venue):
    day = pd.Timestamp('2022-01-01')  # A Saturday
    assert venue.is_non_trading_day(day)

def test_is_regular_non_trading_day(venue):
    day = pd.Timestamp('2022-01-01')  # A Saturday
    assert venue.is_regular_non_trading_day(day)

def test_is_irregular_non_trading_day(venue):
    day = pd.Timestamp('2022-01-01')  # A Saturday
    assert not venue.is_irregular_non_trading_day(day)

def test_is_partial_trading_day(venue):
    day = pd.Timestamp('2022-01-01')  # A Saturday
    assert not venue.is_partial_trading_day(day)

def test_get_trading_hours(venue):
    day = pd.Timestamp('2022-01-03')  # A Monday
    trading_hours, reason = venue.get_trading_hours(day)
    assert reason == "Regular Trading Day"
