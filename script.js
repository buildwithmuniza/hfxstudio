let words = document.querySelectorAll(".word");
words.forEach((word)=>{
   let letters = word.textContent.split("");
   word.textContent="";
   letters.forEach((letter)=>{
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
 });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let changeText =()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i*80);
    });

    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000)


// =================================
// SKILLS SECTION REPEAT ANIMATION
// =================================

const skillsSection = document.querySelector("#skills");

const circles = document.querySelectorAll(".circle");

// Create professional skill dots only once
circles.forEach(elem => {

    const dots = Number(elem.getAttribute("data-dots"));

    const rotate = 360 / dots;

    let points = "";

    for (let i = 0; i < dots; i++) {

        points += `<div class="points"
            style="--i:${i}; --rot:${rotate}deg">
        </div>`;

    }

    elem.innerHTML = points;

});

function resetSkillsAnimation() {

    if (!skillsSection) return;

    // Remove animation class
    skillsSection.classList.remove("animate-skills");

    // Reset circular skill dots
    circles.forEach(elem => {

        const points = elem.querySelectorAll(".points");

        points.forEach(point => {
            point.classList.remove("marked");
        });

    });

}

function startSkillsAnimation() {

    if (!skillsSection) return;

    resetSkillsAnimation();

    // Force browser to restart CSS animations
    void skillsSection.offsetWidth;

    // Start technical bars
    skillsSection.classList.add("animate-skills");

    // Start professional circles
    circles.forEach(elem => {

        const dots = Number(elem.getAttribute("data-dots"));

        const marked = Number(elem.getAttribute("data-percent"));

        const percent = Math.floor(dots * marked / 100);

        const points = elem.querySelectorAll(".points");

        points.forEach((point, index) => {

            if (index < percent) {
                point.classList.add("marked");
            }

        });

    });

}

// Detect when Skills section enters/leaves viewport

const skillsObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startSkillsAnimation();

        } else {

            resetSkillsAnimation();

        }

    });

}, {
    threshold: 0.25
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

  
// active menu /////////////
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');


function activeMenu(){
    let len = section.length;
   while (--len && window.scrollY + 97 < section[len].offsetTop) {}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll",activeMenu);

// sticky navbar ////////
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY > 50)
})

// toggle icon navbar ////////////
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}


window.onscroll = ()=>{
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}

// parallax////////////
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show-items");
      }else{
        entry.target.classList.remove("show-items");
      }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));


function toggleAbout(event) {
  event.preventDefault();

  const moreAbout = document.getElementById("more-about");
  const readMoreBtn = document.getElementById("read-more-btn");

  if (moreAbout.style.display === "none") {
    moreAbout.style.display = "block";
    readMoreBtn.textContent = "Read Less!";
  } else {
    moreAbout.style.display = "none";
    readMoreBtn.textContent = "Read More!";
  }
}

function toggleService(event, button) {
  event.preventDefault();

  const serviceBox = button.closest(".service-box");
  const moreContent = serviceBox.querySelector(".service-more");

  moreContent.hidden = !moreContent.hidden;

  button.textContent = moreContent.hidden
    ? "Read More!"
    : "Read Less!";
}

// =================================
// FIXED LOADING SCREEN
// =================================

function finishLoading() {
    const loadingScreen = document.getElementById("loadingScreen");

    if (!loadingScreen || loadingScreen.dataset.finished === "true") {
        return;
    }

    loadingScreen.dataset.finished = "true";
    loadingScreen.classList.add("hide-loader");

    setTimeout(() => {
        loadingScreen.style.display = "none";
        document.body.classList.add("website-ready");
    }, 850);
}

function startLoading() {
    // Normal loader duration
    setTimeout(finishLoading, 2300);

    // Safety fallback: never keep loader indefinitely
    setTimeout(finishLoading, 5000);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startLoading);
} else {
    startLoading();
}