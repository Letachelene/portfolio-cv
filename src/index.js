import "./index.scss";
import "./assets/styles/style.scss";


const tweenOne = TweenLite.from(".experience-one", 0.5, {
    height: 0,
    paused: true,
    reversed: false
});

const tweenTwo = TweenLite.from(".experience-two", 0.5, {
    height: 0,
    paused: true,
    reversed: false
});

const tweenThree = TweenLite.from(".experience-three", 0.5, {
    height: 0,
    paused: true,
    reversed: false
});



document.querySelector(".toggle-one").addEventListener("mouseover", () =>{
  document.querySelector(".fadeIn").classList.add("toggleHover");
  document.querySelector(".list-overview").classList.add("toggleHover");
  doCoolStuffOne();
}, false);

//document.querySelector(".toggle-one").addEventListener("mouseover", doCoolStuffOne);

document.querySelector(".toggle-two").addEventListener("mouseover", doCoolStuffTwo);
document.querySelector(".toggle-three").addEventListener("mouseover", doCoolStuffThree);

function doCoolStuffOne() {
    tweenOne.reversed() ? tweenOne.play() : tweenOne.reverse();

}
function doCoolStuffTwo() {
    tweenTwo.reversed() ? tweenTwo.play() : tweenTwo.reverse();

}
function doCoolStuffThree() {
    tweenThree.reversed() ? tweenThree.play() : tweenThree.reverse();

}

/* Code pour l'overflow VOIR
const btn = document.querySelector(".btn-visible");
const expOne = document.querySelector(".experience-one");
const toggleOne = document.querySelector(".toggle-one");*/
//const fadeIn = document.querySelector(".fadeIn").classList.add("toggleHover");
//const list = document.querySelector(".list-overview").classList.add("toggleHover");

/*btn.addEventListener("click", (e) =>{
  expOne.style.overflow = expOne.style.overflow === "visible" ? "hidden" : "visible";
  toggleOne.style.visibility = toggleOne.style.visibility === "hidden" ? "visible" : "hidden";
  document.querySelector(".fadeIn").classList.add("toggleHover");
  document.querySelector(".list-overview").classList.add("toggleHover");
  doCoolStuffOne();
}, false);*/

/* LE CODE QUI MARCHE LE MIEUX*/

/*document.querySelector(".toggle-one").addEventListener("mouseover", () =>{
  btn.addEventListener("click", (e) =>{
    expOne.style.overflow = expOne.style.overflow === "visible" ? "hidden" : "visible";
    toggleOne.style.visibility = toggleOne.style.visibility === "hidden" ? "visible" : "hidden";
    document.querySelector(".fadeIn").classList.add("toggleHover");
    document.querySelector(".list-overview").classList.add("toggleHover");
  })
    doCoolStuffOne();
}, false);*/

 /*document.querySelector(".toggle-one").addEventListener("mouseover", () =>{
  btn.addEventListener("click", (e) =>{
    expOne.style.overflow = expOne.style.overflow === "visible" ? "hidden" : "visible";
    toggleOne.style.visibility = toggleOne.style.visibility === "hidden" ? "visible" : "hidden";
    fadeIn.style.visibility = fadeIn.style.visibility === "hidden" ? "visible" : "hidden";
    list.style.visibility = list.style.visibility === "hidden" ? "visible" : "hidden";
  })
    doCoolStuffOne();
}, false);*/


doCoolStuffOne();
doCoolStuffTwo();
doCoolStuffThree();

/*document.querySelector(".toggle-one").addEventListener("mouseover", () =>{
 btn.addEventListener("click", (e) =>{
   expOne.style.overflow = expOne.style.overflow === "visible" ? "hidden" : "visible";
   toggleOne.style.visibility = toggleOne.style.visibility === "hidden" ? "visible" : "hidden";
   fadeIn.style.visibility = fadeIn.style.visibility === "visible" ? "hidden" : "visible";
   list.style.visibility = list.style.visibility === "visible" ? "hidden" : "visible";
 })
   doCoolStuffOne();
}, false); */
