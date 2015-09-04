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
    
    // Array of valid locales
    var locales = fincal.locales;
    
    // Instantiate a locale
    var locale = fincal.calendar("new_york") = fincal["new_york"] = fincal.new_york;
    
    // Current moment in locale
    locale.currentTime();
    
    // Is a regular trading day? (Usually Monday to Friday.)
    locale.isRegularTradingDay([date]);
    
    // Is a partial trading day? (Often the day before or after a full holiday.)
    locale.isPartialTradingDay([date]);
    
    // Is a holiday? (No trading.)
    locale.isHoliday([date]);
    
    // Is within regular trading hours (independent of date).
    locale.isRegularTradingHours([date]);
    
    // Is within extended trading hours (independent of date).
    locale.isExtendedTradingHours([date]);
    
    // Is within partial trading hours (independent of date).
    locale.isPartialTradingHours([date]);
    
    // Is a trading day?
    locale.areMarketsOpenOn(new Date());
    locale.areMarketsOpenToday();
    
    // Is a trading day and within applicable trading hours?
    locale.areMarketsOpenAt(new Date(), [extended=true|false]);
    locale.areMarketsOpenNow([extended=true|false]);
    
    // Trading time in milliseconds
    locale.totalTradingTimeOn(new Date(), [extended=true|false]);
    locale.totalTradingTimeToday([extended=true|false]);
    
    // Elapsed and remaining time today
    locale.timeElapsedInTradingDay([extended=true|false]);
    locale.timeRemainingInTradingDay([extended=true|false]);
    
    // Some markets trade multiple sessions in a day
    locale.totalTimeInCurrentSession([extended=true|false]);
    locale.timeElapsedInCurrentSession([extended=true|false]);
    locale.timeRemainingInCurrentSession([extended=true|false]);

## License

Copyright (c) 2015, Jonathan Hollinger

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.