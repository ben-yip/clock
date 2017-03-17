/**
 * Created by BenYip-zt on 3/16/2017.
 */

(function () {
    var now = new Date();

    // 6 = 360° / 60
    // 30 = 360° / 12
    var sDeg = now.getSeconds() * 6,
        mDeg = now.getMinutes() * 6,
        hDeg = now.getHours() % 12 * 30 + now.getMinutes() / 60 * 30; // perform granular rotation rather than obtain a integer

    var hHand = document.querySelector('.hour-hand'),
        mHand = document.querySelector('.minute-hand'),
        sHand = document.querySelector('.second-hand');

    // rotate each hand to current time
    hHand.style.transform = 'rotate(' + hDeg + 'deg)';
    mHand.style.transform = 'rotate(' + mDeg + 'deg)';
    sHand.style.transform = 'rotate(' + sDeg + 'deg)';

    /**
     * add @keyframes animation rules to a new style sheet, and append to the document
     */
    var hHandKeyFrames = 'hHandKeyFrames',
        mHandKeyFrames = 'mHandKeyFrames',
        sHandKeyFrames = 'sHandKeyFrames';

    // for hour and minute hand
    function getHandKeyframes(name, startDeg) {
        return ' @keyframes ' + name + ' {'
            + '     0% {'
            + '         transform: rotate(' + startDeg + 'deg);'
            + '     }'
            + '     100% {'
            + '         transform: rotate(' + (startDeg + 360) + 'deg);'
            + '     }'
            + ' }';
    }

    // for second hand
    function getSecondHandKeyframes(name, startDeg) {
        var stepPercent = 1 / 60 * 100;
        var stepDeg = 6;

        var rules = '@keyframes ' + name + ' {';

        var _genStepKeyframes = function (percent, deg) {
            return percent + '% {'
                + '  transform: rotate(' + deg + 'deg);'
                + '}'
        };

        for (var i = 1; i <= 60; i++) {
            rules += _genStepKeyframes(stepPercent * i, startDeg + stepDeg * i);
        }

        return rules + '}';
    }

    // define rotate durations for each hand in one circle
    var rotateDurations = (function () {
        // unit:s
        var h = 60 * 60 * 12,
            m = 60 * 60,
            s = 60;

        return {
            hour: function (speed) {
                speed = speed | 1;
                return h / speed + 's';
            },
            minute: function (speed) {
                speed = speed | 1;
                return m / speed + 's';
            },
            second: function (speed) {
                speed = speed | 1;
                return s / speed + 's';
            }
        }
    })();

    var animationStyle = document.createElement('STYLE');
    animationStyle.innerText =
        getHandKeyframes(hHandKeyFrames, hDeg)
        + getHandKeyframes(mHandKeyFrames, mDeg)
        + getSecondHandKeyframes(sHandKeyFrames, sDeg)
        + '.hour-hand { animation: ' + hHandKeyFrames + ' ' + rotateDurations.hour() + ' infinite linear; }'
        + '.minute-hand { animation: ' + mHandKeyFrames + ' ' + rotateDurations.minute() + ' infinite linear; }'
        + '.second-hand { animation: ' + sHandKeyFrames + ' ' + rotateDurations.second() + ' infinite step-end; }'
    ;

    document.head.appendChild(animationStyle);
})();
