
//currency number formatting
const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
};
    

/*
attached event listenner to dom elements to kick start some dom manipulation and application processes.
*/
lookupForm.addEventListener('submit', lookup);
add.addEventListener('click', addItem)


exit.addEventListener('click', () => {
  item_info['mugshot'].src = "";
  quantity.disabled = false;
  add.style.pointerEvents = "auto";
  add.style.opacity = 1;
});


cancel.addEventListener('click', () => {
 // clear item desk
 sessionStorage.state = JSON.stringify([]);
 useState();
 console.log("clearing desk");
});

process.addEventListener('click', processTransaction);

async function processTransaction() {
  /* process sale and clear item desk if transaction is successful */
  spiner.open = true;
  let state = JSON.parse(sessionStorage.state);
  let total = 0;
  
  let sold_items = [];
  for (let item of state) {
    let obj = {
      'id': item.id,
      'quantity': item.quantity
    }
    sold_items.push(obj)
  }
  
  let response = await fetch('/processTransaction/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8',
         'X-CSRFToken': getCSRFToken()
       },
       body: JSON.stringify(sold_items)
     });
  
  if (response.ok) {
    let data = await response.json();
    let transaction_id = data.transaction_id;
    //console.log(transaction_id);
    
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
      span2.innerHTML = "$" + price.toLocaleString('en-US', options);
      p.append(span2);
      
      table.append(p);
    }
   
    // generate barcode from transaction_id.
    JsBarcode("#barcode > img", transaction_id, {
      displayValue: false,
    });
   
    totalSpan.innerHTML = "$" + total.toLocaleString('en-US', options);
    
    // show receipt modal.
    setTimeout(() => {
      sessionStorage.state = JSON.stringify([]);
      useState();
      spiner.open = false;
      receiptDom.open=true;
      backdropB.style.visibility = "visible"
    }, 1000);
  
  }
  else {
    spiner.open = false;
    not_found.showModal();
    not_found.children[0].innerHTML = "Transaction failed, try again!";
  }
  
}



if(typeof(Storage) !== "undefined") {
  if (!sessionStorage.state) {
    //reset state if state does not exist.
    sessionStorage.state = JSON.stringify([]);
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
    total_goods += Number(item.quantity);
    total_price += Number(item.price) * Number(item.quantity);
    
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
    img.dataset.id = item.id;
    img.addEventListener('click', fullDetails)
    article.append(img);
  
    let nodes = [
      `price($) : ${Number(item.price).toLocaleString('en-US', options)}`, 
      `quantity : ${item.quantity}`, 
      `size : ${item.size}`,
    ]
  
    for (let node of nodes) {
      let li = document.createElement('li');
      li.innerHTML = node;
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
  Tprice.innerHTML = total_price.toLocaleString('en-US', options);
}
  
  
  
function pushState(item) {
  // set state by pushing new item to the state.
  // or update already existing items.
  let state = JSON.parse(sessionStorage.state);
  
  let index = 0;
  for (let obj of state) {
    if (item.id == obj.id) {
      state.splice(index, 1);
      item.quantity = Number(item.quantity) + Number(obj.quantity);
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

 


async function lookup(e) {
  // look up item, display error/details dialog.
  e.preventDefault();
  let value = input.value.trim();
  if (value.length == 0) {
    let validate = document.querySelector("#validate");
    validate.style.display = "block";
    return null;
  }
  
  // item information
  let info;
  
  let state = JSON.parse(sessionStorage.state);
  let found = false;
  for (let item of state) {
     if (item.id == value) {
       info = item;
       found = true;
       quantity.value = 1;
       break;
     }
  }
  
  if (!found) {
    loadItem.style.animationPlayState = "running";
    let response = await fetch('/item/', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json;charset=utf-8',
           'X-CSRFToken': getCSRFToken()
         },
         body: JSON.stringify({'serial_no':value})
       });
       
    if (!response.ok) {
      setTimeout(() => {
        not_found.showModal();
        resetAnime(loadItem);
      }, 1000);
      return null;
    }
    
    let data = await response.json();
    info = data.item;
    
    quantity.value = 1;
    if (data.success == "out of stock") {
      quantity.value = 0;
      quantity.disabled = true;
      add.style.pointerEvents = "none";
      add.style.opacity = 0.6;
    }
    
  }
  
  let keys = Object.keys(item_info);
  
  for (let key of keys) {
    let elem = item_info[key];
    if (key == "mugshot") {
      elem.src = info[key];
    } 
    else if (key == 'price') {
      elem.innerHTML = Number(info[key]).toLocaleString('en-US', options);
    }
    else if (key == 'quantity') {
      continue;
    }
    else {
     elem.innerHTML = info[key];
    }
  }
  
  setTimeout(() => {
     item.showModal();
     resetAnime(loadItem);
    }, 1000);
    
}



function fullDetails(e) {
  let id = e.target.dataset.id;
  let info;
  
  let state = JSON.parse(sessionStorage.state);
  let index = 0;
  for (let item of state) {
     if (item.id == id) {
       info = item;
       //console.log(info);
       break;
     }
     index ++;
  }
  
  let keys = Object.keys(item_info);
  
  for (let key of keys) {
    let elem = item_info[key];
    if (key == "mugshot") {
      elem.src = info[key];
    } 
    else if (key == 'price') {
      elem.innerHTML = Number(info[key]).toLocaleString('en-US', options);
    }
    else {
     elem.innerHTML = info[key];
    }
  }
  
  item.showModal();
  quantity.value = info.quantity;
  quantity.disabled = true;
  add.style.pointerEvents = "none";
  add.style.opacity = 0.6;
  
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
  let price = parseFloat(item_info['price'].innerHTML.replace(/,/g, ''));
  let quantity = item_info['quantity'].value;
  let description = item_info['description'].innerHTML;
  let size = item_info['size'].innerHTML;
  let category = item_info['category'].innerHTML;
  let available = Number(item_info['available'].innerHTML) - Number(item_info['quantity'].value);
  
  
  let item = {id, mugshot, name, price, quantity, size, description, category, available};
  
  // call pushState to update state.
  pushState(item);
  
  item_info['mugshot'].src = "";
}


function getCSRFToken() {
    const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    return null;
 }
 


