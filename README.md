# Financial Calendar

Market holidays and trading hours.

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
    
### Parameters

#### extended
a boolean flag indicating if the call applies to regular trading hours (false) or extended trading hours (true)
    
#### date
a javascript date, a date string, a unix offset, or a valid moment object

### Advanced

    // Array of valid locales
    var locales = fincal.locales;

    fincal.import("Someplace", { ... });
    
    // Calendar data
    console.log(calendar.name); // > "New York"
    console.log(calendar.locale); // > [Object]
    
    // Localize a date
    calendar.localize([date]);

## License

Copyright (c) 2015, Jonathan Hollinger

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.