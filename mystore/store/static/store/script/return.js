
 // get the dom element this script depend on.
 const style = document.querySelector("#fullScreen");
 const process = document.querySelector('#process');
 const error = document.querySelector('#info');
 const id = document.querySelector("#id");
 const code = document.querySelector("#code");
 const no_returned = document.querySelector("#return");
 //console.log(retun.value);
 const inputs = document.querySelectorAll("input");
 const success = document.querySelector("#success");
 const failure = document.querySelector("#not_found");
 const cancelBtns = document.querySelectorAll(".cancel");
 const body = document.querySelector('body');
 const spiner = document.querySelector("#spiner");
 const total = document.querySelector("#sale > span");
 
 // call setScreen to enable/disable fullScreen.
 setScreen();
  
 
 process.addEventListener('click', Process);
 
 for (let elem of cancelBtns) {
   elem.addEventListener('click', () => {
     body.style.overflow = "auto";
   });
 }
 

 
 
 // activate/deactivate fullScreen style.
 window.onresize = setScreen;
  
 // enable and disable the fullScreen stylesheet.
 function setScreen() {
      style.disabled = true;
      let innerHeight = window.innerHeight;
      let screenHeight = screen.height;
      
      // enable fullScreen style on full screen mode
      if (innerHeight == screenHeight) {
        fullScreen.disabled = false;
      }
 }
  
  
 // reset inputs error display.
 for (let elem of inputs) {
   elem.addEventListener('focus', () => {
     error.innerHTML = "";
     error.style.visibility = "hidden";
   });
 }
 
 
 // process a returned item request.
 function Process() {
   let no_returned = Number(no_returned.value)
   
   let data = {
     item_id: id.value,
     item_code: code.value,
     no_returned: no_returned
   }
   
   if (id.value && no_returned) {
     spiner.open = true;
     body.style.overflow = "hidden";
     
     let response = await fetch('/report', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'},
       body: JSON.stringify(data)
     });
     
     if (response.ok) {
       spiner.open = false;
       success.showModal();
       let newTotal = Number(total.innerHTML.trim()) + no_returned;
       total.innerHTML = newTotal;
     }
     else {
       spiner.open = false;
       failure.showModal();
     }
     
   }
   
   else {
     error.innerHTML = "error: something went wrong, check your input and try again";
     error.style.visibility = "visible";
   }
   
 }
 
 