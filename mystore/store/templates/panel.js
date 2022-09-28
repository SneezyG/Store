

  // get the necessary dom elements.
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
    const input = document.querySelector('#input');
    const look = document.querySelector('#look');
    const item = document.querySelector('#item');
    const add = document.querySelector('#add');
    const not_found = document.querySelector('#not_found');
    
   
    
   // get item-dialog elements.
   const name = document.querySelector('#name');
   const price = document.querySelector('#price');
   const available = document.querySelector('#available');
   const quantity = document.querySelector('#quantity');
   const size = document.querySelector('#size');
   const colour = document.querySelector('#colour');
   const category = document.querySelector('#category');
   const sub_catg = document.querySelector('#sub_catg');
   const description = document.querySelector('#description');
   const mugshot = document.querySelector('#mugshot');
   
   
   
   // create a list out of item-dialog elements.
   const item_info = {
     'name': name, 
     'price': price, 
     'available': available, 
     'size': size, 
     'colour': colour,
     'quantity': quantity,
     'category': category, 
     'sub_catg': sub_catg, 
     'description': description,
     'mugshot': mugshot,
   };
   
  
  
  
  /*
  attached event listenner to dom elements to kick start some dom manipulation and application processes.
  */
    drawer.addEventListener('click', Draw, {once:true});
    stack.addEventListener('click', shift, {once:true});
    look.addEventListener('click', lookup);
    add.addEventListener('click', addItem)
    window.onresize = reRender;

    for (let elem of remove) {
      elem.addEventListener('click', drop, {once:true});
    }
    
    
    
    function drop(e) {
      // remove an item article.
      let elem = e.target;
      let parent = elem.parentElement;
      parent.style.animationPlayState = "running";
      parent.addEventListener('animationend', () => parent.remove(), {once:true});
    }
    
   
   
    function Draw() {
      // draw out the hidden side section.
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
      // close back the hidden side section
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
      // shift the interface to a focus mode.
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
      // remove focus mode.
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
      // reRender some dom content on resize event.
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
    
    
    
//new

function lookup() {
  // look up item, display error/details dialog.
  let id = input.value;
  let info = data[id.trim()];
  if (!info) {
    not_found.showModal()
    return;
  }
  let keys = Object.keys(item_info);
  
  for (let key of keys) {
    let elem = item_info[key];
    if (elem.tagName == "IMG") {
      elem.src = info[key];
    } else {
     elem.innerHTML = info[key];
    }
  }
  item.showModal()
}


function addItem() {
  // add item to transaction desk.
  let mugshot = item_info['mugshot'].src;
  let name = item_info['name'].innerHTML;
  let price = item_info['price'].innerHTML;
  let quantity = item_info['quantity'].value;
  let colour = item_info['colour'].innerHTML;
  let size = item_info['size'].innerHTML;
  

  // creating items container.
  let article = document.createElement('article');
  let details = document.createElement('details');
  let ul = document.createElement('ul');
  
  let summary = document.createElement('summary');
  summary.innerHTML = name;
  details.append(summary);
  
  let span = document.createElement('span');
  span.innerHTML = "X";
  article.append(span);
  
  let img = document.createElement('img');
  img.src = mugshot;
  article.append(img);
  
  let nodes = {
    'price': price, 
    'quantity': quantity, 
    'colour': colour, 
    'size': size,
  }
  
  let node_key = Object.keys(nodes);
  for (let key of node_key) {
    let li = document.createElement('li');
    li.innerHTML = key + ": " + nodes[key]
    ul.append(li);
  }
  
  details.append(ul);
  article.append(details);
  
  span.addEventListener('click', drop, {once:true});
  contain.prepend(article);
  
  item.Modal()
}


const data = {
  'glycerin': {
    'available': 'yes',
    'name': 'eden',
    'category': 'beauty',
    'sub_catg': 'skin care',
    'colour': 'colourless',
    'size': '200ltrs',
    'description': 'skin beautifing liquid',
    'quantity': 1,
    'price': 200,
    'mugshot': 'glycerin.jpg'
  },
  
  'mifi': {
    'available': 'no',
    'name': 'airtel mifi',
    'category': 'gadget',
    'sub_catg': 'router',
    'colour': 'red',
    'size': 'none',
    'description': 'airtel 4g mifi router',
    'quantity': 1,
    'price': 1000,
    'mugshot': 'mifi.jpg'
  },
  
  'jumpo': {
    'available': 'yes',
    'name': 'jumpo-ori',
    'category': 'beauty',
    'sub_catg': 'skin care',
    'colour': 'black',
    'size': 'big',
    'description': 'jumpo-ori black soap',
    'quantity': 1,
    'price': 100,
    'mugshot': 'jumpo_ori.jpg'
  },
  
  'saint': {
    'available': 'yes',
    'name': 'st-ives',
    'category': 'beauty',
    'sub_catg': 'skin care',
    'colour': 'white',
    'size': 'big',
    'description': 'st-ives nourishing body cream',
    'quantity': 1,
    'price': 500,
    'mugshot': 'st_ives.jpg'
  },
  
  'treat': {
    'available': 'yes',
    'name': 'body treat',
    'category': 'beauty',
    'sub_catg': 'skin care',
    'colour': 'white',
    'size': 'small',
    'description': 'bodytreat exfoliating body cream',
    'quantity': 1,
    'price': 500,
    'mugshot': 'st_ives.jpg'
  }
  
};










    