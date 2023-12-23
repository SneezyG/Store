

  const options = {
    style: 'decimal',
    maximumFractionDigits: 2,
  };
    
  // get the dom element this script depend on.
  const body = document.querySelector("body");
  const style = document.querySelector("#fullScreen");
  const span = document.querySelectorAll('#span > span');
  const firstSpan = document.querySelector("#first");
  const summary = document.querySelectorAll('.summary');
  
  
  // set a default style for report "1 week" button
  firstSpan.style.backgroundColor = "rgb(219, 87, 25)";
  firstSpan.style.borderColor = "rgb(219, 87, 25)";
  firstSpan.style.color = "white";
  
  
  let data = Object.values(saleSummary['week_1']);
  for (let i = 0; i < summary.length; i++) {
    let elem = summary[i];
    let value = data[i];
    if (typeof(value) == 'number') {
      value = value.toLocaleString('en-US', options);
    }
    elem.childNodes[3].innerHTML = value;
  }
  
  // call setScreen to enable/disable fullScreen.
  setScreen();
  
  // style the report duration button and call clickedAnime to animate it.
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
  
 
 // animate and reset report duration button
  function clickAnime(e) {
   let elem = e.target ?? e;
   let week = elem.dataset.week;
   elem.style.animationPlayState = "running";
   elem.addEventListener('animationend', () => {
       elem.style.animation = "none";
       elem.offsetWidth;
       elem.style.animation = null;
       // call visual function
       visual(week);
   });
  }
  
  
 // animate and set visual components
 function visual(week) {
   let data = Object.values(saleSummary[week]);
   for (let i = 0; i < summary.length; i++) {
     let elem = summary[i];
     elem.style.animationPlayState = "running";
     elem.addEventListener('animationend', () => {
       let value = data[i];
       if (typeof(value) == 'number') {
        value = value.toLocaleString('en-US', options);
       }
       elem.childNodes[3].innerHTML = value;
       elem.style.animation = "none";
       elem.offsetWidth;
       elem.style.animation = null;
     }, {once:true});
   }
 }