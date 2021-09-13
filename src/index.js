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


const togglePlayOne =
  TweenLite.to(".toggle-one", 0.5,
  { background: "#fff", color: "var(--primary)",
  animation: "scaleNumber 1.5s infinite",
  reversed: true})
  .reverse();

  TweenLite.from(".toggle-one", 0.5,
  { played: true })
  .play();

const togglePlayTwo =
  TweenLite.to(".toggle-two", 0.5,
    { background: "#fff", color: "var(--primary)",
    animation: "scaleNumber 1.5s infinite",
    reversed: true})
    .reverse();

  TweenLite.from(".toggle-two", 0.5,
    { played: true })
    .play();

const togglePlayThree =
    TweenLite.to(".toggle-three", 0.5,
      { background: "#fff", color: "var(--primary)",
      animation: "scaleNumber 1.5s infinite",
      reversed: true})
      .reverse();

    TweenLite.from(".toggle-three", 0.5,
      { played: true })
      .play();



/* ANIMATION SIMPLE, pour que le PORFOLIO SE DEROULE*/
document.querySelector(".toggle-one").addEventListener("mouseover", (e) =>{
  document.querySelector(".fadeIn-one").classList.add("toggleHover");
  document.querySelector(".list-overview").classList.add("toggleHover");
  document.querySelector(".wrapper").classList.add("toggleHover");
  togglePlayOne.reversed(!togglePlayOne.reversed());
  doCoolStuffOne();
}, false);



document.querySelector(".toggle-two").addEventListener("mouseover", () =>{
  document.querySelector(".fadeIn-two").classList.add("toggleHover");
  document.querySelector(".list-overview-two").classList.add("toggleHover");
  document.querySelector(".wrapper-two").classList.add("toggleHover");
  togglePlayTwo.reversed(!togglePlayTwo.reversed());
  doCoolStuffTwo();
}, false);

document.querySelector(".toggle-three").addEventListener("mouseover", () =>{
  document.querySelector(".fadeIn-three").classList.add("toggleHover");
  document.querySelector(".list-overview-three").classList.add("toggleHover");
  document.querySelector(".wrapper-three").classList.add("toggleHover");
  togglePlayThree.reversed(!togglePlayThree.reversed());
  doCoolStuffThree();
}, false);



function doCoolStuffOne() {
    tweenOne.reversed() ? tweenOne.play() : tweenOne.reverse();
}

function doCoolStuffTwo() {
    tweenTwo.reversed() ? tweenTwo.play() : tweenTwo.reverse();

}
function doCoolStuffThree() {
    tweenThree.reversed() ? tweenThree.play() : tweenThree.reverse();

}


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

const btnTwo = document.querySelector(".btn-overflow-two");
const eBooks = document.querySelector(".text-overflow-two");
const experienceTwo = document.querySelector(".experience-two");

btn.addEventListener("click", (e) =>{
  training.style.display = training.style.display === "" ? "flex" : "";
  experience.style.height = experience.style.height == "90rem" ? "70rem" : "90rem";
});

btnTwo.addEventListener("click", (e) =>{
  eBooks.style.display = eBooks.style.display === "" ? "flex" : "";
  experienceTwo.style.height = experienceTwo.style.height == "95rem" ? "70rem" : "95rem";
});




// BOUTONS COOKIES FONCTIONNELS


  const buttonCookieok = document.querySelector(".button-cookie-ok");
  const buttonCookieno = document.querySelector(".button-cookie-no");
  const cookieBar = document.querySelector(".cookiebar");


  buttonCookieok.addEventListener("click", (e) =>{
    cookieBar.classList.add("is-hidden");
    console.log('Yes');
  });

  buttonCookieno.addEventListener("click", (e) =>{
    cookieBar.classList.add("is-hidden");
    console.log('No');
  });


doCoolStuffOne();
doCoolStuffTwo();
doCoolStuffThree();
scrollFunction();
//extractCookies();
