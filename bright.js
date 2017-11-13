var Bright = function() {
    var delay;
    var epilepsyDelay;
    var inProgress = false;
    var brandName = "bright";
    var inEpilepsy = false;

    var customStyles = 
    `.bright {
        width: 100% !important;
        height: 100% !important;
    } .bright div {
        position: absolute !important;
    }     

    .bright-bg-color-first {
        background-color: pink;
        animation: bg-first 0.1s infinite;
        -webkit-animation: bg-first 0.1s infinite;
      }
      
      @-webkit-keyframes bg-first {
        0% { background-color: pink; }
        20% { background-color: yellow; }
        40% { background-color: red; }
        60% { background-color: cyan; }
        80% { background-color: greenyellow; }
        100% { background-color: orange; }
      }
      
      @keyframes bg-first {
        0% { background-color: pink; }
        20% { background-color: yellow; }
        40% { background-color: red; }
        60% { background-color: cyan; }
        80% { background-color: greenyellow; }
        100% { background-color: orange; }
      }

      .bright-bg-color-second {
        background-color: cyan;
        animation: bg-second 0.1s infinite;
        -webkit-animation: bg-second 0.1s infinite;
      }
      
      @-webkit-keyframes bg-second {
        0% { background-color: cyan; }
        20% { background-color: pink; }
        40% { background-color: greenyellow; }
        60% { background-color: orange; }
        80% { background-color: red; }
        100% { background-color: yellow; }
      }
      
      @keyframes bg-second {
        0% { background-color: cyan; }
        20% { background-color: pink; }
        40% { background-color: greenyellow; }
        60% { background-color: orange; }
        80% { background-color: red; }
        100% { background-color: yellow; }
      }

      .bright-bg-color-third {
        background-color: red;
        animation: bg-third 0.1s infinite;
        -webkit-animation: bg-third 0.1s infinite;
      }
      
      @-webkit-keyframes bg-third {
        0% { background-color: red; }
        20% { background-color: pink; }
        40% { background-color: cyan; }
        60% { background-color: greenyellow; }
        80% { background-color: orange; }
        100% { background-color: yellow; }
      }
      
      @keyframes bg-third {
        0% { background-color: red; }
        20% { background-color: pink; }
        40% { background-color: cyan; }
        60% { background-color: greenyellow; }
        80% { background-color: orange; }
        100% { background-color: yellow; }
      }
    `;

    function init() {
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = customStyles;
        document.body.appendChild(style);
    };

    function process() {
        foreach(document.querySelectorAll('.' + brandName), (element) => {
            generateBrightContent(element);
        });
        setTimeout(inProgress ? process : () => {}, delay);
    }

    function generateBrightContent(bright) {
        var newLayout = "";
        for (var i = 0, j = getRandomNumber() * 10; i < j; i++) {
            newLayout += '<div class="' + getRandomColorClass('-bg') + '" style="top: ' + getRandomNumber() * 10 + 'px; left: ' + getRandomNumber() * 10 + 'px; width: ' + getRandomNumber() * 10 + '%; height: ' + getRandomNumber() * 10 + '%; "></div>'
        }
        bright.innerHTML = newLayout;
    }

    function epilepsify(newDelay) {
        epilepsyDelay = newDelay;
        var elements = document.querySelectorAll('*');
        inEpilepsy = true;
        epilepsy(elements)
        //inEpilepsy ? () => { inEpilepsy = false } : () => { inEpilepsy = true; epilepsy(elements) };
    }

    function epilepsy(elements) {
        foreach(elements, (element) => {
            replaceColorClass(element, '-bg');
            // replaceColorClass(element);
        });
        //setTimeout(inEpilepsy ? () => { epilepsy(elements) } : () => {}, epilepsyDelay);
    }

    function replaceColorClass(element, modifier) {
        modifier = modifier || '';
        try {
            element.className = element.className.split(' ').filter(cl => cl.indexOf(brandName + modifier + '-color') == -1).join(' ') + ' ' + getRandomColorClass(modifier);
        } catch(ex) {}
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

    function getRandomColorClass(modifier) {
        modifier = modifier || '';
        switch(Math.floor(getRandomNumber()/3)) {
            case 1: return brandName + modifier + '-color-first';
            case 2: return brandName + modifier + '-color-second';
            case 3: default:  return brandName + modifier + '-color-third';
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
        init: init,
        start: start,
        stop: stop,
        epilepsify: epilepsify
    }
}();