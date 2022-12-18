

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
  spiner.open = true;
  let state = JSON.parse(sessionStorage.state);
  let total = 0;
  
  // transaction_id returned from the server.
  let transaction_id = "111345656734";
  
  // reset receipt content.
  table.replaceChildren();
  
  for (let item of state) {
    let price = Number(item.price) * Number(item.quantity);
    total += price;
    
    let p = document.createElement('p');
    
    let span1 = document.createElement('span');
    span1.innerHTML = item.description + "(" + item.quantity + ")";
    p.append(span1);
    
    let span2 = document.createElement('span');
    span2.className = "floatR";
    span2.innerHTML = "$" + price;
    p.append(span2);
    
    table.append(p);
  }
 
 
 // generate barcode from transaction_id.
 JsBarcode("#barcode > img", transaction_id, {
   displayValue: false,
 });
 
  totalSpan.innerHTML = "$" + total;
  // show receipt modal.
  setTimeout(() => {
    //receiptDom.open=true;
    //backdropB.style.visibility = "visible";
    not_found.showModal();
    not_found.children[0].innerHTML = "Transaction failed, try again!";
    spiner.open = false;
  }, 3000);
  
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
     
  if (state.length > 0) {
   itemCount.style.display = 'none';
   process.style.opacity = 1;
   process.style.pointerEvents = "auto ";
   
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
   } else {
     itemCount.style.display = 'block';
     process.style.opacity = 0.7;
     process.style.pointerEvents = "none";
  }
  
  Tgoods.innerHTML = total_goods;
  Tprice.innerHTML = "$" + total_price;
}
  
  
  
function pushState(item) {
  // set state by pushing new item to the state.
  // or update already existing items.
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
  let value = input.value.trim();
  if (value.length == 0) {
    let validate = document.querySelector("#validate");
    validate.style.display = "block";
    return null;
  }
  loadItem.style.animationPlayState = "running";
  let info = data[value];
  if (!info) {
    setTimeout(() => {
      not_found.showModal();
      resetAnime(loadItem);
    }, 3000);
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
  
  setTimeout(() => {
     item.showModal();
     resetAnime(loadItem);
    }, 3000);
  quantity.value = 1;
  add.style.pointerEvents = "auto";
  add.style.opacity = 1;
}



function resetAnime(e) {
  let elem = e.target ?? e;
  elem.style.animation = "none";
  elem.offsetWidth;
  elem.style.animation = null;
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
  // call pushState with an itam as argument.
  let id = item_info['id'].innerHTML;
  let mugshot = item_info['mugshot'].src;
  let name = item_info['name'].innerHTML;
  let price = item_info['price'].innerHTML;
  let quantity = Number(item_info['quantity'].value);
  let description = item_info['description'].innerHTML;
  let size = item_info['size'].innerHTML;
  
  
  let item = {id, mugshot, name, price, quantity, size, description}
  
  // call pushState to update state.
  pushState(item);
  
  item_info['mugshot'].src = "";
}



// simulation of data from the server.
const data = {
  
  '111': {
    'id': '111',
    'available': 70,
    'name': 'eden',
    'category': 'beauty',
    'size': '200ltrs',
    'price': 200,
    'mugshot': 'glycerin.jpg',
    'description': 'Eden mosturing beauty soap, 250geghrbdbxhduiehdbcbxbjdieidjbdbxjdudiidrjbdbxhxjdiierjnxnxjxieiejndndbchxjurieiej',
  },
  
  '112': {
    'id': '112',
    'available': 15,
    'name': 'airtel',
    'category': 'gadget',
    'size': 'none',
    'price': 1000,
    'mugshot': 'mifi.jpg',
    'description': 'Airtle 4g wifi modem, with ethenet usb cable',
  },
  
  '113': {
    'id': '113',
    'available': 25,
    'name': 'jumpo-ori',
    'category': 'beauty',
    'size': 'big',
    'price': 100,
    'mugshot': 'jumpo_ori.jpg',
    'description': 'jumpo ori african black body-soap, natural exfoliant, 150g',
  },
  
  '114': {
    'id': '114',
    'available': 40,
    'name': 'st-ives',
    'category': 'beauty',
    'size': 'big',
    'price': 500,
    'mugshot': 'st_ives.jpg',
    'description': 'St.ives softening body lotion, coconut & orchid, 500g',
  },
  
  '115': {
    'id': '115',
    'available': 50,
    'name': 'body treat',
    'category': 'beauty',
    'size': 'none',
    'price': 500,
    'mugshot': 'st_ives.jpg',
    'description': 'Body treat, clarifying skin beautifying milk, 350g',
  }
  
};
