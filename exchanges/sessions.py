import yaml
from datetime import datetime, timedelta
import pytz
import logging
import sys
import pandas as pd
import pprint


def read_yaml_file(file_path: str):
    """
    Reads a YAML file and returns its content.

    Args:
        file_path (str): The path to the YAML file.

    Returns:
        dict: The content of the YAML file.
    """
    logging.info(f"reading file {file_path}")
    with open(file_path, "r") as file:
        data = yaml.safe_load(file)
    return data


def get_non_trading_days(data):
    """
    Extracts non-trading days from the data.

    Args:
        data (dict): The data containing non-trading days.

    Returns:
        list: A list of non-trading days.
    """
    dates_ = []
    tzinfo = pytz.timezone(data["timezone"])
    for day in data["non_trading_days"]:
        for mmdd in data["non_trading_days"][day]:
            for year in data["non_trading_days"][day][mmdd]:
                dates_.append(
                    tzinfo.localize(datetime.strptime(f"{mmdd}-{year}", "%m-%d-%Y"))
                )
    return dates_


def get_partial_trading_days(data):
    """
    Extracts partial trading days from the data.

    Args:
        data (dict): The data containing partial trading days.

    Returns:
        list: A list of partial trading days.
    """
    dates_ = []
    tzinfo = pytz.timezone(data["timezone"])
    for day in data["partial_trading_days"]:
        for mmdd in data["partial_trading_days"][day]:
            for year in data["partial_trading_days"][day][mmdd]:
                dates_.append(
                    tzinfo.localize(datetime.strptime(f"{mmdd}-{year}", "%m-%d-%Y"))
                )
    return dates_


def get_irregular_partial_trading_days(data):
    """
    Extracts irregular partial trading days from the data.

    Args:
        data (dict): The data containing irregular partial trading days.

    Returns:
        list: A list of irregular partial trading days.
    """
    dates_ = []
    tzinfo = pytz.timezone(data["timezone"])
    for yyyymmdd in data["irregular_partial_trading_days"]:
        dates_.append(
            tzinfo.localize(
                datetime.strptime(yyyymmdd.strftime("%Y-%m-%d"), "%Y-%m-%d")
            )
        )
    return dates_


def get_pause_days(data):
    """
    Extracts pause days from the data.

    Args:
        data (dict): The data containing pause days.

    Returns:
        list: A list of pause days.
    """
    dates_ = []
    tzinfo = pytz.timezone(data["timezone"])
    for yyyymmdd in data["intra_day_interruptions"]:
        dates_.append(
            tzinfo.localize(
                datetime.strptime(yyyymmdd.strftime("%Y-%m-%d"), "%Y-%m-%d")
            )
        )
    return dates_


def GetActiveSession(unix_time, filepath):
    """
    Gets the active trading session for a given Unix timestamp.
    The function calls GetSessions function and get the list of all sessions for a
    date corresponding to unix_time.

    The function then chooses one session which contains the unix_time.

    Args:
        unix_time (int): The Unix timestamp to get the session for.
        filepath (str): The path to the YAML file containing the data.

    Returns:
        dict: A dictionary representing the active trading session.
    
    Example:
        >>>GetSessions(pd.Timestamp("2000-02-16", tz="America/New_York"), "nyse.yml")
        {   'date': '2000-02-16',
            'gte': {'status': 'PAUSE', 'time': '12:00 pm'},
            'lt': {'status': 'REOPEN', 'time': '12:01 pm'},
            'session': '',
            'timezone': 'America/New_York'}
    """
    date_ = pd.Timestamp(unix_time, unit="ns", tz=pytz.utc).astimezone(
        "America/New_York"
    )
    logging.info(f"finding a session for the time stamp {date_}")
    sessions = GetSessions(date_, filepath)

    for session in sessions:
        tzinfo = pytz.timezone(session["timezone"])
        session_start = tzinfo.localize(
            datetime.strptime(
                f"{session['date']} {session['gte']['time']}", "%Y-%m-%d %I:%M %p"
            )
        )
        session_end = tzinfo.localize(
            datetime.strptime(
                f"{session['date']} {session['lt']['time']}", "%Y-%m-%d %I:%M %p"
            )
        )

        if session_start <= date_ <= session_end:
            return session
    return {}


def GetSessions(date_: datetime, filepath: str):
    """
    Gets the trading sessions for a given date.
    The function works by following the below logic.

    It checks that date_ lies in data_provided_from_date, data_provided_through_date
    and exits if date_ is out if this check fails.

    It exits if date_ lies in non_trading_days.

    It check if date_ lies on days of intra_day_interruptions and constructs PAUSE and
    REOPEN events.

    It checks if date_ lies in partial_trading_days. If it does then it constructs the
    sessions accordingly and exits.

    It checks if date_ lies in irregular_partial_trading_days. If it does then it constructs the
    sessions accordingly and exits.

    Finally if the function has still not been exited then it means that date_ is a
    regular_trading_day and it constructs the sessions accordingly and exits.

    Args:
        date_ (datetime): The date to get the sessions for.
        filepath (str): The path to the YAML file containing the data.

    Returns:
        list: A list of trading sessions for the given date.
    
    Example:
        >>> GetSessions(pd.Timestamp('2008-03-20 00:00:00-0400'), 'nyse.yaml)
        [   {   'date': '2016-04-13',
            'gte': {'status': 'OPEN', 'time': '9:00 am'},
            'lt': {'status': 'CLOSE', 'time': '11:00 am'},
            'session': 'NYSE Arca Early Trading',
            'timezone': 'America/New_York'},
        {   'date': '2016-04-13',
            'gte': {'status': 'OPEN', 'time': '11:00 am'},
            'lt': {'status': 'CLOSE', 'time': '2:00 pm'},
            'session': 'NYSE American Core Trading',
            'timezone': 'America/New_York'},
        {   'date': '2016-04-13',
            'gte': {'status': 'OPEN', 'time': '2:00 pm'},
            'lt': {'status': 'CLOSE', 'time': '4:00 pm'},
            'session': 'NYSE American Late Trading',
            'timezone': 'America/New_York'}]
    """
    sessions = []
    data = read_yaml_file(filepath)
    tzinfo = pytz.timezone(data["timezone"])
    date_ = date_.astimezone(tzinfo)
    date__ = date_.replace(hour=0, minute=0, second=0)
    data_provided_from_date = tzinfo.localize(
        datetime.strptime(data["data_provided_from_date"], "%Y-%m-%d")
    )
    data_provided_through_date = tzinfo.localize(
        datetime.strptime(data["data_provided_through_date"], "%Y-%m-%d")
    )
    # check date_ lies in overall date range
    if not data_provided_from_date <= date_ <= data_provided_through_date:
        logging.info(f"date {date_} lies outside of data range")
        return []

    # check if date_ is in non trading days
    non_trading_days = get_non_trading_days(data)
    if date__ in non_trading_days:
        logging.info(f"date {date_} falls on non trading days")
        return []

    # check for any pause and resume events
    if date__ in get_pause_days(data):
        logging.info(f"date {date_} has a pause event")
        sessions.append(
            {
                "timezone": data["timezone"],
                "date": date_.strftime("%Y-%m-%d"),
                "session": "",
                "gte": {
                    "time": data["intra_day_interruptions"][date_.date()]["hours"][0][
                        "gte"
                    ],
                    "status": "PAUSE",
                },
                "lt": {
                    "time": data["intra_day_interruptions"][date_.date()]["hours"][0][
                        "lt"
                    ],
                    "status": "REOPEN",
                },
            }
        )

    # check if date_ is in partial trading days
    if date__ in get_partial_trading_days(data):
        logging.info(f"date {date_} falls on a partial trading day")
        for partial_trading_hours in [
            "standard_partial_early_trading_hours",
            "standard_partial_regular_trading_hours",
            "standard_partial_late_trading_hours",
        ]:
            for session in data[partial_trading_hours]:
                sessions.append(
                    {
                        "timezone": data["timezone"],
                        "date": date_.strftime("%Y-%m-%d"),
                        "session": session["session"],
                        "gte": {"time": session["gte"], "status": "OPEN"},
                        "lt": {"time": session["lt"], "status": "CLOSE"},
                    }
                )
        return sessions
    # check if date is in irregular partial trading days
    if date__ in get_irregular_partial_trading_days(data):
        logging.info(f"date {date_} falls on an irregular partial trading day")
        for session in data["irregular_partial_trading_days"][date_.date()]["sessions"]:
            sessions.append(
                {
                    "timezone": data["timezone"],
                    "date": date_.strftime("%Y-%m-%d"),
                    "session": session["session"],
                    "gte": {"time": session["hours"][0]["gte"], "status": "OPEN"},
                    "lt": {"time": session["hours"][0]["lt"], "status": "CLOSE"},
                }
            )

        return sessions
    # check if date_ is on a weekday
    if date_.strftime("%A") not in data["regular_trading_days"]:
        logging.info(f"date {date_} does not fall on a weekday")
        return []
    # otherwise return a normal trading session
    logging.info(f"date {date_} falls on a regular trading day")
    for regular_trading_hours in [
        "early_trading_hours",
        "regular_trading_hours",
        "late_trading_hours",
    ]:
        for session in data[regular_trading_hours]:
            sessions.append(
                {
                    "timezone": data["timezone"],
                    "date": date_.strftime("%Y-%m-%d"),
                    "session": session["session"],
                    "gte": {"time": session["gte"], "status": "OPEN"},
                    "lt": {"time": session["lt"], "status": "CLOSE"},
                }
            )
    return sessions


def main():
    """
    The main function of the script. It prints the trading sessions for a range of dates.
    """
    pp = pprint.PrettyPrinter(indent=4)
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler(sys.stdout)
    logger.addHandler(handler)
    tz = pytz.timezone("America/New_York")
    # partial trading day
    pp.pprint(
        GetSessions(
            pd.Timestamp("2008-03-20", tz="America/New_York"), "exchanges/nyse.yml"
        )
    )
    # non trading day
    pp.pprint(
        GetSessions(
            pd.Timestamp("1996-01-15", tz="America/New_York"), "exchanges/nyse.yml"
        )
    )
    # irregular partiall trading day
    pp.pprint(
        GetSessions(
            pd.Timestamp("2016-04-13", tz="America/New_York"), "exchanges/nyse.yml"
        )
    )
    # day with pause event
    pp.pprint(
       GetSessions(
            pd.Timestamp("2000-02-16", tz="America/New_York"), "exchanges/nyse.yml"
        ) 
    )

    pp.pprint(GetActiveSession(950720410000000000, "exchanges/nyse.yml"))

    # run for full date range on xnas.yml
    date_list = pd.date_range(start="1996-01-01", end="2017-12-01").tolist()

    for date_ in date_list:
        logging.info(f"getting sessions for date {date_}")
        pp.pprint(GetSessions(tz.localize(date_), "exchanges/xnas.yml"))
    

if __name__ == "__main__":
    main()
