const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector("nav");
const slideElements = document.querySelectorAll(".slide");

menu.addEventListener("click", () => {
    nav.classList.add("open-nav");
})

close.addEventListener("click", () => {
    nav.classList.remove("open-nav");
})

function debounce(func, wait = 17, immediate = true) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
          
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait); 

      if (callNow) func.apply(context, args);
    };
  };

var getElemDistance = function ( elem ) {
    var location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};

function slide(e){
    slideElements.forEach(element => {
        const scrollDist = (window.scrollY + window.innerHeight).toFixed() - element.clientHeight / 2 + 80;
        //const elementDist = element.offsetTop + element.clientHeight;

        if(scrollDist > getElemDistance(element))
            element.classList.add("slideIn");
        if(scrollDist <  getElemDistance(element))
            element.classList.remove("slideIn");
    });
}


window.addEventListener('scroll', debounce(slide));

window.onload = setTimeout( () => { slide(); }, 2000);