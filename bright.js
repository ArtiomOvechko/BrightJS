var Bright = function() {
    var delay;
    var inProgress = false;
    var brandName = "bright";

    function process() {
        foreach(document.querySelectorAll('.' + brandName), (element) => {
            generateBrightContent(element);
        });
        setTimeout(inProgress ? process : () => {}, delay);
    }

    function generateBrightContent(bright) {
        var newLayout = "";
        for (var i = 0, j = getRandomNumber() * 10; i < j; i++) {
            newLayout += '<div class="' + getRandomColorClass() + '" style="top: ' + getRandomNumber() * 10 + 'px; left: ' + getRandomNumber() * 10 + 'px; width: ' + getRandomNumber() * 10 + '%; height: ' + getRandomNumber() * 10 + '%; "></div>'
        }
        bright.innerHTML = newLayout;
    }

    function start(newDelay) {
        delay = newDelay;
        inProgress = true;
        process();
    }

    function stop() {
        inProgress = false;
        foreach(document.querySelectorAll('.' + brandName), (element) => {
            element.innerHTML = '';
        });
    }

    function getRandomColorClass() {
        switch(Math.floor(getRandomNumber()/3)) {
            case 1: return brandName + '-red';
            case 2: return brandName + '-green';
            case 3: default:  return brandName + '-blue';
        }
    }

    function foreach(collection, processor) {
        for (var i = 0, j = collection.length; i < j; i++) {
            processor(collection[i]);
        }
    }

    function getRandomNumber() {
        return Math.floor((Math.random() * 10) + 1); 
    }

    return {
        start: start,
        stop: stop
    }
}();