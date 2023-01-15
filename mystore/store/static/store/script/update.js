 
  // get the necessary dom elements.
  const style = document.querySelector("#fullScreen");
  const button = document.querySelector('#process');
  const dropbox = document.querySelector('article');
  const error = document.querySelector('#error');
  const fileElem = document.querySelector('#fileElem');
  const filename = document.querySelector('#filename');
  const body = document.querySelector('body');
  const success = document.querySelector("#success");
  const cancelBtns = document.querySelectorAll(".cancel");
  const spiner = document.querySelector("#spiner");
  const not_found = document.querySelector("#not_found");
  
  // call setScreen to enable/disable fullScreen.
  setScreen();
  
  
  for (let elem of cancelBtns) {
    elem.addEventListener('click', () => {
       body.style.overflow = "auto";
    });
  }

 
  
  fileElem.addEventListener('change', checkmate);
  button.addEventListener('click', process);
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragleave", dragleave, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);

  
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
  
  
  
  
  // set some constraints on expected input files.
  // expected file format
  const fileType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];
  // expected file size
  const maxSize = 3 * 1048576;
  
  
 
  function process() {
    // validate the input file and call the upload/process function.
    let fileList = fileElem.files;
    
    if (fileList.length > 1) {
      error.innerHTML = "error: too many files";
      error.style.visibility = "visible";
      return;
    }
    
    let file = fileList[0];
    if (file) {
      if (!fileType.includes(file.type)) {
        error.innerHTML = "error: unsupported file format";
        error.style.visibility = "visible";
      } 
      else if (file.size >= maxSize) {
        error.innerHTML = "error: file is too large, max is 3mb";
        error.style.visibility = "visible";
      }
      else {
       spiner.open = true;
       body.style.overflow = "hidden";
       setTimeout(() => {
         spiner.open = false;
         not_found.showModal();
         //success.showModal();
       }, 5000);
    }
  } 
    
    else {
      error.innerHTML = "error: no file was selected ";
      error.style.visibility = "visible";
    }
}
  
 
  
  function dragenter(e) {
    // do some Dom manipulation during dragenter event on dropbox(article elements).
    e.stopPropagation();
    e.preventDefault();
    error.style.visibility = "hidden";
    filename.style.visibility = "hidden";
    
    let childNodes = dropbox.children;
    let img = childNodes[1];
    let span = childNodes[2];
    img.style.opacity = 0.6;
    span.style.opacity = 0.6;
    img.style.marginTop = "20px";
  }
  
  
  function dragleave(e) {
    // do some Dom manipulation during dragleave event on dropbox(article elements).
    e.stopPropagation();
    e.preventDefault();
    
    let childNodes = dropbox.children;
    let img = childNodes[1];
    let span = childNodes[2];
    img.style.opacity = 1;
    span.style.opacity = 1;
    img.style.marginTop = 0;
  }
  
  
  
  function drop(e) {
    // do some Dom manipulation during drop event on dropbox(article elements).
    e.stopPropagation();
    e.preventDefault();
    
    let childNodes = dropbox.children;
    let img = childNodes[1];
    let span = childNodes[2];
    img.style.marginTop = 0;
    img.style.opacity = 1;
    span.style.opacity = 1;
    
    const dt = e.dataTransfer;
    fileElem.files = dt.files;
    checkmate();
  }


  function dragover(e) {
    // do some Dom manipulation during dragover event on dropbox(article elements).
    e.stopPropagation();
    e.preventDefault(); 
  }


  function checkmate() {
    // validate the number of files on drop event on dropbox(article elements).
    filename.style.visibility = "hidden";
    error.style.visibility = "hidden";
    let fileList = fileElem.files;
    
   if (fileList.length > 1) {
      error.innerHTML = "error: too many files";
      error.style.visibility = "visible";
      return;
   }
   let file = fileList[0];
   
   if (file) {
     filename.innerHTML = file.name;
     filename.style.visibility = "visible";
   }
  }
  