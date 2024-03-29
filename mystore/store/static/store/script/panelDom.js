
// get the necessary dom elements.
const style = document.querySelector("#fullScreen");
const section = document.querySelector('section');
const drawer = document.querySelector('#hide');
const backdropA = document.querySelector('#backdropA');
const backdropB = document.querySelector('#backdropB');
const stack = document.querySelector('#stack');
const nav = document.querySelector('#nav');
const mainleft = document.querySelector('#mainleft');
const hint = document.querySelector("#hint")
const preview = document.querySelector("#preview");
const contain = document.querySelector('#contain');
const input = document.querySelector('#input');
const lookupForm = document.querySelector('#utility > form');
const loadItem = document.querySelector('#loadItem > img');
const item = document.querySelector('#item');
const add = document.querySelector('#add');
const exit = document.querySelector('#exit');
const not_found = document.querySelector('#not_found');
const notFoundBtn = document.querySelector('#not_found button');
const itemCount = document.querySelector("#itemCount");
const Tgoods = document.querySelector("#Tgoods");
const Tprice = document.querySelector("#Tprice");
const checkout = document.querySelector("#checkout");
const process = document.querySelector("#process");
const cancel = document.querySelector("#cancel")
const receiptDom = document.querySelector("#receipt");
const receipt = document.querySelector("#receipt > main");
const table = document.querySelector("#table");
const printButton = document.querySelector("#print");
const totalSpan = document.querySelector("#totalSpan");
const spiner = document.querySelector("#spiner");


let oldScreen = window.innerWidth;

// call setScreen to enable/disable fullScreen.
setScreen();


/*
attached event listenner to dom elements to kick start some dom manipulation and application processes.
*/
drawer.addEventListener('click', Draw, {once:true});
stack.addEventListener('click', shift, {once:true});



input.addEventListener("focus", () => {
  let validate = document.querySelector("#validate");
  validate.style.display = "none";
});


notFoundBtn.addEventListener('click', (e) => {
  backdropB.style.visibility = "hidden";
})
  
  
printButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.print();
    receiptDom.open=false;
    backdropB.style.visibility = "hidden";
 });
 
window.onresize = reRender;

    
// get item-dialog elements.
const id = document.querySelector('#id');
const name = document.querySelector('#name');
const price = document.querySelector('#price');
const available = document.querySelector('#available');
const quantity = document.querySelector('#quantity');
const size = document.querySelector('#size');
const category = document.querySelector('#category');
const description = document.querySelector('#description');
const mugshot = document.querySelector('#mugshot');

// create an Object of item-dialog elements.
const item_info = {
 'id': id,
 'name': name, 
 'price': price, 
 'available': available, 
 'size': size,
 'quantity': quantity,
 'category': category, 
 'mugshot': mugshot,
 'description': description,
};

   

// add an eventListenner to validate quantity.
quantity.addEventListener('input', (e) => {
 const pattern =  /[^0-9]/;
 
 let value = e.target.value;
 let stock = Number(available.innerHTML);
 if (value.length == 0 || value == 0 || value > stock) {
   add.style.pointerEvents = "none";
   add.style.opacity = 0.6;
   return null;
 }
 
 let find = pattern.test(value);
 if (find) {
   add.style.pointerEvents = "none";
   add.style.opacity = 0.6;
 }
 else {
   add.style.pointerEvents = "auto";
   add.style.opacity = 1;
 }
})

   
   
function Draw() {
  // draw out the hidden side section.
  section.style.width = "70%";
  backdropA.style.visibility = "visible";
  drawer.style.right = "70%";
  drawer.addEventListener('click', Close, {once:true});

  setTimeout(() => {
  contain.style.visibility = "visible";
  preview.style.display = "block";
  checkout.style.display = "inline";
  itemCount.style.visibility = "visible";
  }, 400)

}


    
function Close() {
  // close back the hidden side section
  section.style.width = "11%";
  backdropA.style.visibility = "hidden";
  preview.style.display = "none";
  checkout.style.display = "none";
  drawer.style.right = "11%";
  drawer.addEventListener('click', Draw, {once:true});
  contain.style.visibility = "hidden";
  itemCount.style.visibility = "hidden";

}


    
function shift() {
  // shift the interface to a focus mode.
  section.style.width = "57%";
  nav.style.display = "none";
  hint.style.visibility = "hidden";
  mainleft.style.width = "60%";
  stack.style.right = "57%";
  stack.addEventListener('click', still, {once:true});
  preview.style.display = "block";
  contain.style.visibility = "hidden";

  setTimeout(() => {
  contain.style.visibility = "visible";
  }, 400);

}

    
    
function still() {
  // remove focus mode.
  section.style.width = "36%";
  mainleft.style.width = "95%";
  nav.style.display = "block";
  nav.style.visibility = "hidden";
  stack.style.right = "36%";
  stack.addEventListener('click', shift, {once:true});
  preview.style.display = "none";
  contain.style.visibility = "hidden";

  setTimeout(() => {
  contain.style.visibility = "visible";
  hint.style.visibility = "visible";
  nav.style.visibility = "visible";
  }, 300)
  
}

    

function reRender() {
  // reRender some dom content on window resize
  let newScreen = window.innerWidth;
  
  // call setScreen to enable/disable fullScreen.
  setScreen();
  
  // only rerender when there is a change in window width.
  if (newScreen == oldScreen) {
    return null;
  }
  
  oldScreen = newScreen;
  section.style.width =  newScreen <= 800 ? "11%" : "36%";
  drawer.style.right =  newScreen <= 800 ? "11%" : "36%";
  stack.style.right =  newScreen <= 800 ? "11%" : "36%";
  checkout.style.display = newScreen <= 800 ? "none" : "inline";
  nav.style.display = "block";
  mainleft.style.width = "95%";
  hint.style.visibility = "visible";
  backdropA.style.visibility = "hidden";
  preview.style.display = "none";
  
  contain.style.marginTop = "none";
  contain.style.visibility = "none";
  itemCount.style.visibility = "none";
  contain.offsetWidth;
  itemCount.offsetWidth;
  contain.style.marginTop = null;
  contain.style.visibility = null;
  itemCount.style.visibility = null;

  //remove drawers event listenner.
  drawer.removeEventListener('click', Close, {once:true});
  stack.removeEventListener('click', still, {once:true});
  
  //re-add drawer event listenner.
  drawer.addEventListener('click', Draw, {once:true});
  stack.addEventListener('click', shift, {once:true});
}

   
// activate/deactivate fullScreen style.
function setScreen() {
    style.disabled = true;
    let innerHeight = window.innerHeight;
    let screenHeight = screen.height;
    
    // enable fullScreen style on full screen mode
    if (innerHeight == screenHeight) {
      fullScreen.disabled = false;
    }
}

    
    
 













    