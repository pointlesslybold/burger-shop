var allSlideTimers = [];
var allSliders = [];
const slideTime = 5;

window.addEventListener('DOMContentLoaded', function(){
    initializeSliders();

    document.getElementById("find-location").onclick = function(){
        scrollViewTo("where-to-find-us");
    }
    document.getElementById("goto-menu").onclick = function(){
        scrollViewTo("menu");
    }
});

function scrollViewTo(id){
    var target = document.getElementById(id);
    var targetY = target.getBoundingClientRect().top;

    window.scrollTo({
        top: targetY - 64,
        left: 0,
        behavior: 'smooth'
    });
}

function initializeSliders(){
    allSliders = Array.from(document.querySelectorAll(".slides-container")).slice();

    for(var i=0; i<allSliders.length; i++){
        var slider = allSliders[i];

        slider.dataset.index = i;

        var slideUnits = Array.from(slider.querySelectorAll(".slide"));
        var dotsBlock = slider.querySelector(".dots");

        for(var j=0; j<slideUnits.length; j++){
            var progressDot = document.createElement("DIV");
            progressDot.className = "slide-dot";
            progressDot.dataset.slideIndex = j;

            progressDot.addEventListener("click", function(){
                gotoSlide(this.closest(".slides-container"), this.dataset.slideIndex);
            });

            dotsBlock.appendChild(progressDot);
        }

        gotoSlide(slider, slider.dataset.default || 0);
    }
}

function gotoSlide(slider, targetSlide = -1){
    var slideUnits = Array.from(slider.querySelectorAll(".slide"));
    var allDots = Array.from(slider.querySelectorAll(".slide-dot"));

    if(targetSlide < 0){
        var nextSlide = slider.dataset.current + 1;
        slider.dataset.current = nextSlide % slideUnits.length;
    }
    else{
        slider.dataset.current = targetSlide;
    }

    var sliderIndex = slider.dataset.index;
    if(allSlideTimers[sliderIndex] != null){
        clearTimeout(allSlideTimers[sliderIndex]);
    }

    allSlideTimers[sliderIndex] = setTimeout(function(index){
        gotoSlide(allSliders[index]);
    }, slideTime * 1000, sliderIndex);
    

    for(var i=0; i<slideUnits.length; i++){
        if(i == slider.dataset.current){
            slideUnits[i].className = "slide";
            allDots[i].className = "slide-dot active";
        }
        else{
            slideUnits[i].className = "slide hidden";
            allDots[i].className = "slide-dot";
        }
    }
}