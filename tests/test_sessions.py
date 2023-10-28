import unittest
from datetime import datetime
from pathlib import Path
from exchanges.sessions import (
    GetActiveSession,
    read_yaml_file,
    get_partial_trading_days,
    get_pause_days,
    get_irregular_partial_trading_days,
    GetSessions,
)
import yaml
import pandas as pd
import pytz


class TestReadYamlFile(unittest.TestCase):
    def test_file_not_found(self):
        with self.assertRaises(FileNotFoundError):
            read_yaml_file("non_existent_file.yaml")

    def test_valid_file(self):
        # Assuming a valid.yaml file exists in the project directory
        data = read_yaml_file(Path(__file__).with_name("valid.yaml"))
        self.assertIsInstance(data, dict)
        # Add more assertions based on the expected structure of the data


class TestGetPartialTradingDays(unittest.TestCase):
    def test_empty_data(self):
        data = {}
        with self.assertRaises(KeyError):
            result = get_partial_trading_days(data)

    def test_valid_data(self):
        # Assuming a valid.yaml file exists in the project directory
        data = read_yaml_file(Path(__file__).with_name("valid.yaml"))
        result = get_partial_trading_days(data)
        self.assertIsInstance(result, list)
        # Add more assertions based on the expected structure of the result


class TestGetIrregularPartialTradingDays(unittest.TestCase):
    def test_empty_data(self):
        data = {}
        with self.assertRaises(KeyError):
            get_irregular_partial_trading_days(data)

    def test_valid_data(self):
        # Assuming a valid.yaml file exists in the project directory
        data = read_yaml_file(Path(__file__).with_name("valid.yaml"))
        result = get_irregular_partial_trading_days(data)
        self.assertIsInstance(result, list)
        # Add more assertions based on the expected structure of the result


class TestGetPauseDays(unittest.TestCase):
    def test_empty_data(self):
        data = {}
        with self.assertRaises(KeyError):
            result = get_pause_days(data)

    def test_valid_data(self):
        # Assuming a valid.yaml file exists in the project directory
        data = read_yaml_file(Path(__file__).with_name("valid.yaml"))
        result = get_pause_days(data)
        self.assertIsInstance(result, list)
        # Add more assertions based on the expected structure of the result


class TestGetSessions(unittest.TestCase):
    def test_empty_data(self):
        with self.assertRaises(TypeError):
            result = GetSessions(datetime.now(), Path(__file__).with_name("empty.yaml"))

    def test_valid_data(self):
        # Assuming a valid.yaml file exists in the project directory
        tz = pytz.timezone("America/New_York")
        result = GetSessions(
            tz.localize(datetime.now()), Path(__file__).with_name("valid.yaml")
        )
        self.assertIsInstance(result, list)
        # check output for a partial trading day
        result = GetSessions(
            pd.Timestamp("2008-03-20", tz="America/New_York"), "exchanges/nyse.yml"
        )
        self.assertTrue(len(result) == 3)
        # check output for a non trading day
        result = GetSessions(
            pd.Timestamp("1996-01-15", tz="America/New_York"), "exchanges/nyse.yml"
        )
        self.assertTrue(len(result) == 0)
        # check output for a irregular partial trading day
        result = GetSessions(
            pd.Timestamp("2016-04-13", tz="America/New_York"), "exchanges/nyse.yml"
        )
        self.assertTrue(len(result) == 3)
        # check output for a regular trading day with pause event
        result = GetSessions(
            pd.Timestamp("2000-02-16", tz="America/New_York"), "exchanges/nyse.yml"
        )
        self.assertTrue(len(result) == 4)


class TestGetActiveSession(unittest.TestCase):
    def test_empty_data(self):
        with self.assertRaises(TypeError):
            result = GetActiveSession(
                946634400000000000, Path(__file__).with_name("empty.yaml")
            )

    def test_valid_data(self):
        # Assuming a valid.yaml file exists in the project directory
        tz = pytz.timezone("America/New_York")
        result = GetActiveSession(
            946634400000000000, Path(__file__).with_name("valid.yaml")
        )
        self.assertIsInstance(result, dict)
        # Add more assertions based on the expected structure of the result


if __name__ == "__main__":
    unittest.main()
