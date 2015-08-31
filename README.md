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
    
    // New York
    fincal.new_york.currentTime();
    fincal.new_york.isEquityMarketHoliday();
    fincal.new_york.isEquityMarketPartialTradingDay();
    fincal.new_york.areMarketsOpenNow();
    
    // London (LSE)
    fincal.london.currentTime();
    fincal.london.areMarketsOpenNow();
    
    // Paris (Euronext)
    fincal.paris.currentTime();
    fincal.paris.areMarketsOpenNow();
    
    // Frankfurt
    fincal.frankfurt.currentTime();
    fincal.frankfurt.areMarketsOpenNow();
    
    // Hong Kong
    fincal.hong_kong.currentTime();
    fincal.hong_kong.areMarketsOpenNow();
    
    // Shanghai
    fincal.shanghai.currentTime();
    fincal.shanghai.areMarketsOpenNow();
    
    // Tokyo
    fincal.tokyo.currentTime();
    fincal.tokyo.areMarketsOpenNow();
    
    // Syndey
    fincal.sydney.currentTime();
    fincal.sydney.areMarketsOpenNow();

## License

Copyright (c) 2015, Jonathan Hollinger

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.