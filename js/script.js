const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector("nav");
const slideElements = document.querySelectorAll(".slide");
const listItems = document.querySelectorAll("li");
const rates = document.querySelectorAll(".rate");
const seeMoreButtons = document.querySelectorAll(".new-dsc button");

var lastScroll = 0;

menu.addEventListener("click", () => {
    nav.classList.add("open-nav");
})

close.addEventListener("click", () => {
    nav.classList.remove("open-nav");
})

function debounce(func, wait = 12, immediate = true) {
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

    let scroll = window.pageYOffset;

    if(scroll <= 0){
        document.body.classList.remove("scroll-up");
    }
    if(scroll > lastScroll && !document.body.classList.contains("scroll-down")){
        document.body.classList.add("scroll-down");
        document.body.classList.remove("scroll-up");
    }
    if(scroll < lastScroll && document.body.classList.contains("scroll-down")){
        document.body.classList.add("scroll-up");
        document.body.classList.remove("scroll-down");
    }
    lastScroll = scroll;
}

function navbar(){
    let scroll = window.pageYOffset;

    if(scroll <= 0){
        document.body.classList.remove("scroll-up");
    }
    if(scroll > lastScroll && !document.body.classList.contains("scroll-down")){
        document.body.classList.add("scroll-down");
        document.body.classList.remove("scroll-up");

    }
    lastScroll = scroll;
}

window.addEventListener('scroll',
    debounce(slide)
);

window.onload = setTimeout( () => { slide(); }, 2000);

listItems.forEach(item => {
    item.addEventListener("click", () => {
        if(nav.classList.contains("open-nav"))
            nav.classList.remove("open-nav");
    })
});

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

rates.forEach(rate =>{
    let number = parseFloat(rate.innerHTML.split('/')[0]);
    let content = ""
    if(number>4.5)
        content = "★★★★★";
    else if(number>4)
        content = "★★★★☆";
    else if(number>3)
        content = "★★★☆☆";
    else if(number>2)
        content = "★★☆☆☆";
    else
        content = "★☆☆☆☆";

    rate.setAttribute("cont", content);

})

seeMoreButtons.forEach(btn => {
    btn.addEventListener("click", () =>{
        let clone =  btn.closest(".new-image").cloneNode(true);
        clone.classList.remove("new-image");
        clone.classList.add("see-more");
        clone.classList.add("show-element");
        clone.querySelector("button").innerHTML="Where to buy?";
        let clsBtn = document.createElement('span');
        clsBtn.setAttribute('class', 'close-button');
        clone.querySelector(".new-dsc").appendChild(clsBtn);
        btn.closest(".new-models").appendChild(clone);

        clone.querySelector(".close-button").addEventListener("click", function closeSection(){
            clone.classList.remove("show-element");
            setTimeout(() => {btn.closest(".new-models").removeChild(clone);},1000);
            
        })
    })
})