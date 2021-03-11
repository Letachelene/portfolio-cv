import "./index.scss";
import "./assets/styles/style.scss";

/*import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);*/


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


const togglePlay =
  TweenLite.to(".toggle-one", 0.5,
  { background: "#fff", color: "var(--primary)", reversed: true})
  .reverse();

  TweenLite.from(".toggle-one", 0.5,
  {background: "var(--primary)", color: "var(--border)", played: true})
  .play();




/*const togglePlay =
    TweenLite.from(".toggle-one", 0.5,
    { background: "#fff", color: "var(--primary)", reversed: true})
    .reverse();

const toggleReset =
  TweenLite.to(".toggle-one", 0.5,
  {background: "var(--primary)", color: "#fff", played: true})
  .play();*/




  // Trouver la formule pour changer le X en 1 dans le reverse() : cad, qd le bouton remonte, retour à toggle-one


//const togglePlay = TweenMax.to(".togglePlay", 1, { opacity: 0.25 }).reverse();


// TEST POUR CHANGER LE BOUTON AU HOVER FERME ET HOVER OUVERT
// le bouton devient vert quand la fonction est true
// donc il faut enfermer tout l'event dans une seule fonction, avec unfalse et un true

/*  document.querySelector(".toggle-one").addEventListener("mouseover", () =>{
  document.querySelector(".toggle-one").style.background = "green";
    doCoolStuffOne();
  }, true);*/




/* ANIMATION SIMPLE, pour que le PORFOLIO SE DEROULE*/
document.querySelector(".toggle-one").addEventListener("mouseover", (e) =>{
  e.preventDefault();
  document.querySelector(".fadeIn").classList.add("toggleHover");
  document.querySelector(".list-overview").classList.add("toggleHover");
  //document.querySelector(".toggle-one").classList.add("togglePlay");
  //document.querySelector(".togglePlay").style.background = "blue";
  //document.querySelector(".togglePlay").classList.add("toggleReset");
  togglePlay.reversed(!togglePlay.reversed());
  doCoolStuffOne();
}, false);



document.querySelector(".toggle-two").addEventListener("mouseover", () =>{
  document.querySelector(".fadeIn-two").classList.add("toggleHover");
  document.querySelector(".list-overview-two").classList.add("toggleHover");
  doCoolStuffTwo();
}, false);

document.querySelector(".toggle-three").addEventListener("mouseover", () =>{
  document.querySelector(".fadeIn-three").classList.add("toggleHover");
  document.querySelector(".list-overview-three").classList.add("toggleHover");
  doCoolStuffThree();
}, false);

//document.querySelector(".toggle-one").addEventListener("mouseover", doCoolStuffOne);

//document.querySelector(".toggle-two").addEventListener("mouseover", doCoolStuffTwo);
//document.querySelector(".toggle-three").addEventListener("mouseover", doCoolStuffThree);


function doCoolStuffOne() {
    tweenOne.reversed() ? tweenOne.play() : tweenOne.reverse();
    //togglePlay.reversed() ? togglePlay.play() : togglePlay.reverse();
}

function doCoolStuffTwo() {
    tweenTwo.reversed() ? tweenTwo.play() : tweenTwo.reverse();

}
function doCoolStuffThree() {
    tweenThree.reversed() ? tweenThree.play() : tweenThree.reverse();

}

/*window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.querySelector("header").style.padding = "3rem 5rem";
    document.querySelector("header").style.height = "20rem";
    document.querySelector("h1").style.fontSize = "4rem";
  }

  else {
    document.querySelector("header").style.padding = "8rem 5rem";
    document.querySelector("header").style.height = "30rem";
    document.querySelector("h1").style.fontSize = "6rem";

  }
}*/

const scrollFunction =(e) => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.querySelector("header").style.padding = "1rem 5rem";
    document.querySelector("header").style.height = "20rem";
    document.querySelector("h1").style.fontSize = "4rem";
    document.querySelector("h1").style.padding = "0rem";
    }
  else {
    document.querySelector("header").style.padding = "8rem 5rem";
    document.querySelector("header").style.height = "30rem";
    document.querySelector("h1").style.fontSize = "6rem";
    document.querySelector("h1").style.padding = "0 0 2rem 0";

}
}


let scrollEvent;
window.addEventListener('resize', () =>{
  if(window.innerWidth > 768){
    scrollEvent = window.addEventListener('scroll', scrollFunction, false);
  }
  else{
    scrollEvent = window.removeEventListener('scroll', scrollFunction, false);
  }
}, false);


/* Bouton overflow*/

const btn = document.querySelector(".btn-overflow");
const training = document.querySelector(".text-overflow");
const experience = document.querySelector(".experience-one");

btn.addEventListener("click", (e) =>{
  training.style.display = training.style.display === "" ? "flex" : "";
  experience.style.height = experience.style.height == "90rem" ? "60rem" : "90rem";
});



/* Code pour l'overflow VOIR
const btn = document.querySelector(".btn-visible");
const expOne = document.querySelector(".experience-one");
const toggleOne = document.querySelector(".toggle-one");
//const fadeIn = document.querySelector(".fadeIn").classList.add("toggleHover");
//const list = document.querySelector(".list-overview").classList.add("toggleHover");*/

/*btn.addEventListener("click", (e) =>{
  expOne.style.overflow = expOne.style.overflow === "visible" ? "hidden" : "visible";
  toggleOne.style.visibility = toggleOne.style.visibility === "hidden" ? "visible" : "hidden";
  document.querySelector(".fadeIn").classList.add("toggleHover");
  document.querySelector(".list-overview").classList.add("toggleHover");
  doCoolStuffOne();
}, false);*/

/* LE CODE QUI MARCHE LE MIEUX

document.querySelector(".toggle-one").addEventListener("mouseover", () =>{
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
scrollFunction();
//toggleReset();
