# Import the NYSE class from its module
from exchanges.nyse import NYSE
import datetime

# Create an instance of the NYSE class
nyse = Venue('exchanges/nyse.yml')


# Objective 1: Be able to "query" for specific events (open/close) for a particular exchange, for a particular day
# Note: Intermediate pauses in trading should be represented as "trading paused" + reason

# Objective 2: For any nanosecond-resolution datetime stamp, determine whether NYSE was open for trading at that time
# note, the exchange typically opens at 9:00am, and is CLOSED at 4:00pm (meaning 4pm should return false)


# Call the is_regular_trading_day method on this instance
# You will need to pass in a datetime object representing the day you want to check
day_to_check = datetime.datetime.now()  # This checks for the current day
# result = nyse.is_non_trading_day(day_to_check)
result = nyse.is_regular_trading_day(day_to_check)

# Now 'result' holds a boolean value indicating whether the day to check is a regular trading day
print(result)
