


const section = document.querySelector('section');
    const drawer = document.querySelector('#hide');
    const backdrop = document.querySelector('#backdrop');
    const stack = document.querySelector('#stack');
    const nav = document.querySelector('#nav');
    const mainleft = document.querySelector('#mainleft');
    const hint = document.querySelector("#hint")
    const preview = document.querySelector("#preview");
    const remove = document.querySelectorAll('article > span');
    const contain = document.querySelector('#contain');
    
    drawer.addEventListener('click', Draw, {once:true});
    stack.addEventListener('click', shift, {once:true});
    window.onresize = reRender;

    for (let elem of remove) {
      elem.addEventListener('click', () => elem.parentElement.remove(), 
      {once:true});
    }
    
   
    function Draw() {
      section.style.width = "70%";
      backdrop.style.visibility = "visible";
      preview.style.visibility = "visible";
      drawer.addEventListener('click', Close, {once:true});
      contain.style.visibility = "hidden";

      setTimeout(() => {
      contain.style.visibility = "visible";
      }, 400)

    }
    
    function Close() {
      screen = window.innerWidth;
      section.style.width =  screen <= 800 ? "0" : "30%";
      backdrop.style.visibility = "hidden";
      preview.style.visibility = "hidden";
      mainleft.style.width = "95%";
      nav.style.display = "block";
      drawer.addEventListener('click', Draw, {once:true});
      contain.style.visibility = "hidden";

      setTimeout(() => {
      contain.style.visibility = "visible";
      }, 400)

    }
    
    function shift() {
      section.style.width = "55%";
      nav.style.display = "none";
      backdrop.style.visibility = "hidden";
      preview.style.visibility = "hidden";
      mainleft.style.width = "60%";
      stack.addEventListener('click', still, {once:true});
      contain.style.visibility = "hidden";

      setTimeout(() => {
      contain.style.visibility = "visible";
      }, 400)

    }
    
    function still() {
      section.style.width = "30%";
      nav.style.display = "block";
      mainleft.style.width = "95%";
      backdrop.style.visibility = "hidden";
      preview.style.visibility = "hidden";
      stack.addEventListener('click', shift, {once:true});
      contain.style.visibility = "hidden";

      setTimeout(() => {
      contain.style.visibility = "visible";
      }, 400)
      
    }


    function reRender() {
      screen = window.innerWidth;
      section.style.width =  screen <= 800 ? "0" : "30%";
      nav.style.display = "block";
      mainleft.style.width = "95%";
      backdrop.style.visibility = "hidden";
      preview.style.visibility = "hidden";
      contain.style.visibility = "hidden";

      setTimeout(() => {
        contain.style.visibility = "visible";
      }, 400)

    }
    