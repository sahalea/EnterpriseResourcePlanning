var NUMBER2TEXT = {
    ones: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    tens: ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    sep: ['', ' thousand ', ' million ', ' billion ', ' trillion ', ' quadrillion ', ' quintillion ', ' sextillion ']
};

(function (ones, tens, sep) {

    convert = function (value) {
        var val = value,
            arr = [],
            str = '',
            i = 0;

        if (val.length === 0) {
            return;
        }

        val = parseInt(val, 10);
        if (isNaN(val)) {
            return;
        }

        while (val) {
            arr.push(val % 1000);
            val = parseInt(val / 1000, 10);
        }

        while (arr.length) {
            str = (function (a) {
                var x = Math.floor(a / 100),
                    y = Math.floor(a / 10) % 10,
                    z = a % 10;

                return (x > 0 ? ones[x] + ' hundred ' : '') +
                       (y >= 2 ? tens[y] + ' ' + ones[z] : ones[10 * y + z]);
            })(arr.shift()) + sep[i++] + str;
        }

        return str;
    };

})(NUMBER2TEXT.ones, NUMBER2TEXT.tens, NUMBER2TEXT.sep);
