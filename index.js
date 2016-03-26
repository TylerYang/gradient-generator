var _ = require('underscore');

//start end
//step: the step of gradient
function getGradientIterator(start, end, step) {
    var colors = genGradientColors.apply(null, arguments);
    //iterator
    return _iterate(colors);
}

function genGradientColors(startC, endC, step) {
    step -= 2;
    var startArr = _convertToRGB(startC);
    var endArr = _convertToRGB(endC);
    var alpha = 0.0;

    var gradientColors = [];
    for (var i = 0; i < step; i++) {
        var c = [];
        alpha += (1.0 / (step + 1));
        var c = _.map(startArr, function(val, j) {
            var val = endArr[j] * alpha + (1 - alpha) * startArr[j];
            var c = parseInt(val);
            if (isNaN(val)) {
                return 0;
            }
            return Math.round(Math.min(Math.max(0, c), 255));
        });
        gradientColors.push(_convertToHex(c));
    }
    gradientColors.unshift(startC);
    gradientColors.push(endC);

    return gradientColors;
}

function _iterate(arr) {
    var idx = 0;
    return function() {
        if (idx < arr.length) {
            return arr[idx++];
        } else {
            return null;
        }
    };
}

//Convert Integer to Hex
//10 => 0A  254 => 255
function _hex(n) {
    var str = n.toString(16).toUpperCase();
    return str.length == 2 ? str : '0' + str;
}

//[254, 10, 9] => #FE0A09
function _convertToHex(rgbArr) {
    if (rgbArr.toString() !== '[object Array]' && rgbArr.length != 3) {
        console.error('rgbArr should be an array with length equals to 3.');
        throw new Error('Invalid parameter');
    }
    var hex = _(rgbArr).map(_hex).reduce(function(prev, curr) {
        return prev + curr;
    });
    return '#' + hex;
}

//#FCD => [15, 12, 13]
//#FF0C0D => [255, 12, 13]
function _convertToRGB(hex) {
    if (_.isString(hex) == false || hex.charAt(0) !== '#') {
        console.error('hex should be a string start with \'#\'.');
        throw new Error('Invalid parameter');
    }

    var colors = null;
    if (hex.length === 4) {
        //abc =>  ['a','b','c'] => ['aa', 'bb', 'cc']
        colors = hex.slice(1).match(/.{1,1}/g).map(colors, function(val) {
            return val + val;
        });
    } else if (hex.length === 7) {
        colors = hex.slice(1).match(/.{1,2}/g);
    } else {
        console.error('hex should be a string with length equals to 4 or 7');
        throw new Error('Invalid parameter');
    }
    return colors.map(function(val) {
        return parseInt(val, 16);
    });
}

module.exports = {
    genGradientColors: genGradientColors,
    getGradientIterator: getGradientIterator
};
