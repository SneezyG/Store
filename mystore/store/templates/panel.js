

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
    
    

  
  //attached event listenner to dom elements to kick start some dom manipulation.
    drawer.addEventListener('click', Draw, {once:true});
    stack.addEventListener('click', shift, {once:true});
    look.addEventListener('click', lookup);
    add.addEventListener('click', addItem)
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
    
    
    
//new
function lookup() {
  // alert('looking');
  item.showModal()
}

function addItem() {
  console.log("working");
  const quantity = document.querySelector('#quantity');
  alert(quantity.value)
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





    