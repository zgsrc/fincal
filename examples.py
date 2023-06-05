# Import the NYSE class from its module
from exchanges.nyse import NYSE
import datetime

# Create an instance of the NYSE class
nyse = NYSE()

# Call the is_regular_trading_day method on this instance
# You will need to pass in a datetime object representing the day you want to check
day_to_check = datetime.datetime.now()  # This checks for the current day
result = nyse.is_non_trading_day(day_to_check)
# result = nyse.is_regular_trading_day(day_to_check)

# Now 'result' holds a boolean value indicating whether the day to check is a regular trading day
print(result)
