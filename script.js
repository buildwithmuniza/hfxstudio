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

// circle skill ///////////
const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360 / dots;


    for(let i = 0 ; i < dots ; i++){
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
   elem.innerHTML = points;

   const pointsMarked = elem.querySelectorAll('.points');
   for(let i = 0; i<percent ; i++){
    pointsMarked[i].classList.add('marked');
   }
})
 //Mixitup Potfolio////////
var mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.port-box'
    },
    animation: {
        duration: 400
    }
});
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

// ================= LOADING SCREEN =================

window.addEventListener("load", () => {

    const loadingScreen = document.getElementById("loadingScreen");

    if (!loadingScreen) return;

    setTimeout(() => {

        // Start loader fade-out
        loadingScreen.classList.add("hide-loader");

        // Reveal website after loader disappears
        setTimeout(() => {

            loadingScreen.style.display = "none";
            document.body.classList.add("website-ready");

        }, 1200);

    }, 3000);

});

// ================= PORTFOLIO POPUP =================

const portfolioPopup = document.getElementById("portfolioPopup");
const popupMedia = document.getElementById("popupMedia");
const popupClose = document.getElementById("popupClose");

const portfolioGallery = document.querySelector(".portfolio-gallery");

// Open popup when clicking an image or video project link
portfolioGallery.addEventListener("click", function (event) {

    const link = event.target.closest(".port-content a");

    if (!link) return;

    const fileURL = link.href;
    const filePath = new URL(fileURL).pathname.toLowerCase();

    const isVideo = /\.(mp4|webm|ogg)$/.test(filePath);
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/.test(filePath);

    // Website links and other links will work normally
    if (!isVideo && !isImage) return;

    event.preventDefault();

    popupMedia.innerHTML = "";

    if (isVideo) {
        const video = document.createElement("video");

        video.src = fileURL;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;

        popupMedia.appendChild(video);
    }

    if (isImage) {
        const image = document.createElement("img");

        image.src = fileURL;
        image.alt = "Portfolio Project";

        popupMedia.appendChild(image);
    }

    portfolioPopup.classList.add("active");
});

// Close popup function
function closePortfolioPopup() {
    portfolioPopup.classList.remove("active");

    const video = popupMedia.querySelector("video");

    if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
    }

    popupMedia.innerHTML = "";
}

// Close button
popupClose.addEventListener("click", closePortfolioPopup);

// Close when clicking outside popup content
portfolioPopup.addEventListener("click", function (event) {
    if (event.target === portfolioPopup) {
        closePortfolioPopup();
    }
});

// Close with Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePortfolioPopup();
    }
});

const navLinks = document.querySelectorAll('.navlist a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});