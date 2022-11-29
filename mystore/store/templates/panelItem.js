

// app base-state template.
let state = [];
    

/*
attached event listenner to dom elements to kick start some dom manipulation and application processes.
*/
look.addEventListener('click', lookup);
add.addEventListener('click', addItem)

exit.addEventListener('click', () => {
  item_info['mugshot'].src = "";
});

cancel.addEventListener('click', () => {
 // clear item desk
 sessionStorage.state = JSON.stringify(state);
 useState();
 console.log("clearing desk");
});

process.addEventListener('click', () => {
 /* process sale and clear item desk if transaction is successful */
 sessionStorage.state = JSON.stringify(state);
 useState();
 console.log("transaction successful")
});



if(typeof(Storage) !== "undefined") {
  if (!sessionStorage.state) {
    //reset state if state does not exist.
    sessionStorage.state = JSON.stringify(state);
  }
   
   // call use useState.
   useState()
  
} else {
  console.log("Sorry! No Web Storage support..");
}


  
function useState() {
  // use state to render some elem
  let state = JSON.parse(sessionStorage.state);
  
  let total_goods = 0;
  let total_price = 0;
  
  //console.log(state.items);
  contain.replaceChildren();
     
  if (state.length >= 1) {
   basket.style.display = 'none';
   
   for (let item of state) {
    // creating items container.
    total_goods += item.quantity;
    total_price += Number(item.price) * item.quantity;
    
    let article = document.createElement('article');
    let details = document.createElement('details');
    let ul = document.createElement('ul');
  
    let summary = document.createElement('summary');
    summary.innerHTML = item.name;
    details.append(summary);
  
    let span = document.createElement('span');
    span.innerHTML = "X";
    span.dataset.id = item.id;
    article.append(span);
  
    let img = document.createElement('img');
    img.src = item.mugshot;
    article.append(img);
  
    let nodes = {
      'price': item.price, 
      'quantity': item.quantity, 
      'size': item.size,
    }
  
    let node_key = Object.keys(nodes);
    for (let key of node_key) {
      let li = document.createElement('li');
      li.innerHTML = key + ": " + nodes[key]
      ul.append(li);
    }
  
    details.append(ul);
    article.append(details);
    contain.append(article);
    
    span.addEventListener('click', drop, {once:true});
    
    }
    
   }
    else {
       basket.style.display = 'block';
    }
    
    Tgoods.innerHTML = total_goods;
    Tprice.innerHTML = "$" + total_price;
    
  }
  
  
  
function pushState(item) {
  // set state by pushing new item to the state
  let state = JSON.parse(sessionStorage.state);
  
  let index = 0;
  for (let obj of state) {
    if (item.id == obj.id) {
      state.splice(index, 1);
      item.quantity = item.quantity + obj.quantity;
      break;
    }
    index ++;
  }
  
  state.unshift(item);
  
  sessionStorage.state = JSON.stringify(state);
  useState();
}

  
  
function popState(id) {
  // set state by popping item from the state
  let state = JSON.parse(sessionStorage.state);
  let index = 0;
  for (let item of state) {
     if (item.id == id) {
       state.splice(index, 1);
       break;
     }
     index ++;
  }
  
  
  sessionStorage.state = JSON.stringify(state);
  useState();
}

 


function lookup() {
  // look up item, display error/details dialog.
  let id = input.value.trim();
  let info = data[id];
  if (!info) {
    not_found.showModal()
    return;
  }
  let keys = Object.keys(item_info);
  
  for (let key of keys) {
    let elem = item_info[key];
    if (elem.tagName == "IMG") {
      elem.src = info[key];
      elem.dataset.id = id;
    } else {
     elem.innerHTML = info[key];
    }
  }
  item.showModal();
  quantity.value = 1;
  add.style.pointerEvents = "auto";
  add.style.opacity = 1;
}




function drop(e) {
  // remove an item article.
  let elem = e.target;
  let parent = elem.parentElement;
  parent.style.animationPlayState = "running";
  parent.addEventListener('animationend', () => {
      parent.remove();
      // call popState to update state.
      popState(elem.dataset.id)
    }, {once:true});
}
    
   


function addItem() {
  // add item to transaction desk.
  let id = item_info['mugshot'].dataset.id;
  let mugshot = item_info['mugshot'].src;
  let name = item_info['name'].innerHTML;
  let price = item_info['price'].innerHTML;
  let quantity = Number(item_info['quantity'].value);
  let size = item_info['size'].innerHTML;
  let category = item_info['category'].innerHTML;
  let available = item_info['available'].innerHTML;
  
  let item = {id, mugshot, name, price, quantity, size, category, available}
  
  // call pushState to update state.
  pushState(item);
  
  item_info['mugshot'].src = "";
}



// simulation of data from the server.
const data = {
  
  '111': {
    'available': 'yes',
    'name': 'eden',
    'category': 'beauty',
    'size': '200ltrs',
    'quantity': 1,
    'price': 200,
    'mugshot': 'glycerin.jpg'
  },
  
  '112': {
    'available': 'no',
    'name': 'airtel',
    'category': 'gadget',
    'size': 'none',
    'quantity': 1,
    'price': 1000,
    'mugshot': 'mifi.jpg'
  },
  
  '113': {
    'available': 'yes',
    'name': 'jumpo-ori',
    'category': 'beauty',
    'size': 'big',
    'quantity': 1,
    'price': 100,
    'mugshot': 'jumpo_ori.jpg'
  },
  
  '114': {
    'available': 'yes',
    'name': 'st-ives',
    'category': 'beauty',
    'size': 'big',
    'quantity': 1,
    'price': 500,
    'mugshot': 'st_ives.jpg'
  },
  
  '115': {
    'available': 'yes',
    'name': 'body treat',
    'category': 'beauty',
    'size': 'none',
    'quantity': 1,
    'price': 500,
    'mugshot': 'st_ives.jpg'
  }
  
};
