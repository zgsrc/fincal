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
    
    // Simple interface
    calendar.areMarketsOpenToday();
    calendar.areMarketsOpenOn([date]);
    calendar.areMarketsOpenNow();
    calendar.areMarketsOpenAt([date], [extended]);
    
    // Examples
    calendar.areMarketsOpenOn("next monday");
    calendar.areMarketsOpenOn({ year: 2015, month: 1, day: 1 });
    calendar.areMarketsOpenAt("Sep 1st, 2015 8:35am", true);
    calendar.areMarketsOpenAt(new Date("December 17, 1995 03:24:00"));
    calendar.areMarketsOpenAt(calendar.here("Sep 1st, 2015 8:35am"));
    
#### Parameters

##### date
> Flexible-format anchor date for the calculation.  When optional and omitted, calls use currentTime().  
Absolute datetime formats are converted to the local timezone of the calendar.  Relative datetime formats 
are interpreted as in the local timezone of the calendar.

> Value can be:

> * Javascript date (i.e. new Date() or equivalent)
> * Unix time (milliseconds since the epoch)

> Javascript dates and unix timestamps have implicit timezones and will be converted to the calendar timezone,
changing the display time (e.g. January 1st 11pm in New York is January 2nd 4am in London).

> * [Sugar-y date string](http://sugarjs.com/dates) (e.g. "Monday", "Last Friday in July", "Sep 1 2015 4:00pm")
> * Valid [date structure](http://momentjs.com/docs/#/parsing/object/) (e.g. { year: 2015, month: 1: day: 1 })

> Strings and date structures are interpreted as local to the calendar timezone (e.g. "Tuesday" means midnight on Tuesday there).

> * [Moment](http://momentjs.com/docs/#/parsing/)
> * [Moment with Timezone](http://momentjs.com/timezone/docs/#/using-timezones/) 

> Moments and moments with timezones have explicit timezones and are converted to the calendar timezone.

> **TIP:** Use strings and objects to talk about relative and absolute times "over there".  Use javascript dates and unix offsets 
to convert dates and times "here".  For advanced control, use moments ([described below](#moments-and-timezones)).


##### extended
> A boolean flag indicating whether the call applies to regular trading hours (false or omitted) or extended trading hours (true).


#### Moments and Timezones
Locally, dates and times are separate things.  Across timezones, they are inextricably linked
and the logic gets complicated.  Fincal uses [sugar](http://sugarjs.com/dates) 
and [moment](http://momentjs.com/) to simplify and enhance date parsing and comprehension.

Examples of moment creation:

    // Current time in locale
    calendar.currentTime();
    
    // Create a moment here
    calendar.here([date]);
    fincal.here([date]);
    
    // Create a moment there
    calendar.there([date]);
    calendar.there() == calendar.currentTime();
    
    // Maybe the code is running somewhere else than "here".
    fincal.setTimezoneHere("America/Chicago");
    
    // Examples
    calendar.here("Sep 1 2015 4:00 pm");
    calendar.there("Monday 9:30am");
    calendar.there({ year: 2015, month: 1, day: 1 });
    calendar.there(calendar.here("Sep 1 2015 4:00 pm"));
    
    // Relative Formats
    calendar.here("Monday 9:30am").toDate() != calendar.there("Monday 9:30am").toDate();
    calendar.here({ year: 2015, month: 1, day: 1 }).toDate() != calendar.there({ year: 2015, month: 1, day: 1 }).toDate();
    
    // Universal Formats
    var offset = (new Date()).getTime();
    calendar.here(offset).toDate() == calendar.there(offset).toDate();
    calendar.here("Sep 1 2015 4:00 pm").toDate() == calendar.there(calendar.here("Sep 1 2015 4:00 pm")).toDate();
    calendar.here(new Date()).toDate() == calendar.there(new Date()).toDate();



## How do I extend it?

The Calendar class consumes a standard market locale object interface.

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

To create a custom calendar, you just need to supply the Calendar constructor or fincal.import() method 
with a compatible Locale object.

A locale begins by defining a timezone.  Then regular trading days and regular trading hours are defined.  
There are days and times trading USUALLY (but not necessarily) takes place.  Outside of regular trading 
hours, extendedTradingHours specifies additional sessions (usually with limited participation).  Some 
regular trading days are holidays, and trading does not occur.  In some markets, days before or after 
holidays are partialTradingDays that observe partialTradingHours.

##### Example

    var locale = {
    
        /* The timezone for the locale in format [Continent]/[City]. */
        timezone: "America/New_York",
        
        /* The base assumption of what constitutes a trading day. */
        regularTradingDays: "Weekday",
        
        /* The base assumption of what constitutes regular trading hours. */
        regularTradingHours: [
            { from: "9:00 am", to: "5:30 pm" }
        ],
        
        /* Extended trading hours on full trading days. */
        extendedTradingHours: [
            { from: "4:00 am", to: "9:30 am" },
            { from: "4:00 pm", to: "8:00 pm" }
        ],
        
        /* Days on which different hours than regularTradingHours are observed. */
        partialTradingDays: {
            2015: {
                November: [ 27 ],
                December: [ 24 ]
            }
        },
        
        /* Trading hours used on a partial trading day. */
        partialTradingHours: [
            { from: "9:30 am", to: "1:00 pm" }
        ],
        
        /* Days on which no trading takes place.  These dates may otherwise be regularTradingDays. *.
        holidays: {
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