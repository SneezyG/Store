
  // get the dom element this script depend on.
  const body = document.querySelector("body");
  const style = document.querySelector("#fullScreen");
  const span = document.querySelectorAll('#span > span');
  const firstSpan = document.querySelector("#first");
  const links = document.querySelectorAll("#nav > li");
  const article = document.querySelectorAll('article');
  
  
  // set a default style for report "1 week" button
  firstSpan.style.backgroundColor = "rgb(219, 87, 25)";
  firstSpan.style.borderColor = "rgb(219, 87, 25)";
  firstSpan.style.color = "white";
  
  // call setScreen to enable/disable fullScreen.
  setScreen();
  
  // style the span button and call clickedAnime to animate it.
  for (let elem of span) {
    elem.addEventListener('click', () => {
      for (let elem of span) {
        elem.style.backgroundColor = "none";
        elem.style.color = "none";
        elem.style.borderColor = 'none'
        elem.offsetWidth;
        elem.style.backgroundColor = null;
        elem.style.color = null;
        elem.style.borderColor = null;
      }
      elem.style.backgroundColor = "rgb(219, 87, 25)";
      elem.style.color = "white";
      elem.style.borderColor = "rgb(219, 87, 25)";
      clickAnime(elem);
    });
  }
  
  
 // activate/deactivate fullScreen style.
  window.onresize = setScreen;
  
  function setScreen() {
      style.disabled = true;
      let innerHeight = window.innerHeight;
      let screenHeight = screen.height;
      
      // enable fullScreen style on full screen mode
      if (innerHeight == screenHeight) {
        fullScreen.disabled = false;
      }
  }
  
 for (let elem of links) {
    elem.addEventListener("click", (e) => {
      let elem = e.target;
      let children = elem.parentElement.children;
      for (let child of children) {
        if (child == elem) {
           child.id = "active";
           window.location.assign(child.dataset.url);
        }else {
           child.id = "";
        }
      }
    });
  }
  
  
 // animate and reset report duration button
  function clickAnime(e) {
   let elem = e.target ?? e;
   elem.style.animationPlayState = "running";
   elem.addEventListener('animationend', () => {
       elem.style.animation = "none";
       elem.offsetWidth;
       elem.style.animation = null;
       // call visual function
       visual();
   });
  }
  
 // animate and set visual components
 function visual() {
   for (let elem of article) {
     elem.style.animationPlayState = "running";
     elem.addEventListener('animationend', () => {
       elem.style.animation = "none";
       elem.offsetWidth;
       elem.style.animation = null;
     }, {once:true});
   }
 }