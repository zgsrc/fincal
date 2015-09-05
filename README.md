# Financial Calendar

Market calendar and trading hours.

## How do I get it?

Install with npm:

    npm install fincal

Clone repo with git:

    git clone https://github.com/triploc/fincal.git

Download over HTTPS:

    wget https://github.com/triploc/fincal/archive/master.zip
    unzip master.zip

## How do I use it?

    var fincal = require("fincal");
    
    // Get a market calendar for a locale
    var calendar = fincal.calendar("new_york") = fincal["new_york"] = fincal.new_york;
    
    // Current moment in locale
    calendar.currentTime();
    
    // Is a regular trading day? (Usually Monday to Friday.)
    calendar.isRegularTradingDay([date]);
    
    // Is a partial trading day? (Often the day before or after a full holiday.)
    calendar.isPartialTradingDay([date]);
    
    // Is a holiday? (No trading.)
    calendar.isHoliday([date]);
    
    // Is within regular trading hours? (Date is ignored.)
    calendar.isRegularTradingHours([date]);
    
    // Is within extended trading hours?  (Date is ignored.)
    calendar.isExtendedTradingHours([date]);
    
    // Is within partial trading hours?  (Date is ignored.)
    calendar.isPartialTradingHours([date]);
    
    // Is a trading day? (Time is ignored.)
    calendar.areMarketsOpenOn(date);
    calendar.areMarketsOpenToday();
    
    // Is a trading day and within applicable trading hours?
    calendar.areMarketsOpenAt(date, [extended]);
    calendar.areMarketsOpenNow([extended]);
    
    // Total trading time in milliseconds.
    calendar.totalTradingTimeOn(date, [extended]);
    calendar.totalTradingTimeToday([extended]);
    
    // Elapsed and remaining trading time today.
    calendar.timeElapsedInTradingDay([extended]);
    calendar.timeRemainingInTradingDay([extended]);
    
    // Some markets trade multiple sessions in a day.
    calendar.totalTimeInCurrentSession([extended]);
    calendar.timeElapsedInCurrentSession([extended]);
    calendar.timeRemainingInCurrentSession([extended]);
    
#### Parameters

> ##### extended
> A boolean flag indicating whether the call applies to regular trading hours (false or omitted) or extended trading hours (true).
          
> ##### date
> * Javascript date (i.e. new Date()), 
> * [Sugary date string](http://sugarjs.com/dates), 
> * Unix time (milliseconds since the epoch), 
> * [Moment](http://momentjs.com/docs/#/parsing/)
> * [Moment with Timezone](http://momentjs.com/timezone/docs/#/using-timezones/)
> * Valid [moment object](http://momentjs.com/docs/#/parsing/object/)
> When optional and omitted, calls use currentTime().
>
> Strings, unix times, and moment objects which omit a timezone will be interpreted as local to the calendar timezone.
> Javascript dates will be converted to the calendar timezone, effectively changing the time.

## How do you do it?

The Calendar class consumes a standard market locale object interface and uses [sugar](http://sugarjs.com/dates) 
and [moment](http://momentjs.com/) to parse and comprehend dates and times.

    var fincal = require("fincal");
    
    // Calendar class
    var myCalendar = fincal.Calendar("name", { ... });
    
    // Packaged locale names are put in an array and given their own root-level properties
    var locales = fincal.locales;
    var someCalendar = fincal.some_locale = fincal["some_locale"] = fincal.calendar("some_locale");
    
    // Don't like what's packaged?  Roll your own.  Will overwrite other calendars with same name.
    fincal.import("Someplace", { ... });
    var someplace = fincal.Someplace = fincal["Someplace"] = fincal.calendar("Someplace");
    
    // Calendar metadata
    console.log(calendar.name); // > "New York"
    console.log(calendar.locale); // > [Object]
    
    // Localize a date
    calendar.localize([date]);
    
### Custom Calendars

To create a custom calendar, you just need to supply the Calendar constructor or fincal.import() method 
with a compatible Locale object.

    var locale = {
        timezone = "America/New_York",
        regularTradingDays = "Weekday",
        regularTradingHours = [
            { from: "9:00 am", to: "5:30 pm" }
        ],
        extendedTradingHours = [
            { from: "4:00 am", to: "9:30 am" },
            { from: "4:00 pm", to: "8:00 pm" }
        ],
        partialTradingDays = {
            2015: {
                November: [ 27 ],
                December: [ 24 ]
            }
        },
        partialTradingHours = [
            { from: "9:30 am", to: "1:00 pm" }
        ],
        holidays = {
            2015: {
                January: [ 1 ],
                April: [ 3, 6 ],
                May: [ 1, 25 ],
                December: [ 24, 25, 31 ]
            }
        }
    };
    
    var oneOff = new fincal.Calendar("new_york", locale);
    
    fincal.import("new_york", locale);
    var loaded = fincal.new_york;

## License

Copyright (c) 2015, Jonathan Hollinger

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.