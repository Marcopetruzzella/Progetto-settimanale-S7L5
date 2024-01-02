let autkey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWY0YjI2NzYxNDAwMTgzYzJlY2UiLCJpYXQiOjE3MDM4ODI2NzAsImV4cCI6MTcwNTA5MjI3MH0.jSQpncHxbr8wO8FhCgN7XVtYWDQI1JPLl3tt9Lcs1lI"


document.addEventListener('DOMContentLoaded', () => {


  function scrivoApi(obj) {
    fetch("https://striveschool-api.herokuapp.com/api/product", {

      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        'Authorization': autkey, "Content-Type": "application/json",
      },
    })
  }

  function leggopai() {
    let url = `https://striveschool-api.herokuapp.com/api/product`;
    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': autkey }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        let prodlist = document.querySelector('.prod-list')
        prodlist.textContent = ""





        json.forEach(json => {
          console.log(json)
          let div = document.createElement('div')
          div.classList = "w-25"
          div.innerHTML = ` 
                
                <div class="card m-1 col-3 " style="width: 18rem; " >
                <img src="${json.imageUrl}"  class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${json.name}</h5>
                 
                  <p class="card-text">Prezzo: <span class="price">${json.price} Euro</span></p>
                  <p class="card-text">Brand: <span class="brand">${json.brand}</span></p>
                  <a href="#" class="btn btn-primary">Acquista</a>
                  <button type="button" class="btn btn-primary btninfo" id="${json._id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Maggiori info</button>
                </div>
              </div></div>
              `








          prodlist.appendChild(div)

        });
      });


  }


  function creaOggetto() {
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let brand = document.getElementById('brand').value;
    let imageUrl = document.getElementById('imageUrl').value;
    let price = document.getElementById('price').value;

    let oggettoDati = {
      name: name,
      description: description,
      brand: brand,
      imageUrl: imageUrl,
      price: price
    };

    console.log(oggettoDati);
    scrivoApi(oggettoDati)
    leggopai()
  }






  document.querySelector('.btn-primary').addEventListener('click', () => { creaOggetto() })
  leggopai()

  document.querySelector('.btn-danger').addEventListener('click', () => { rimuoviogg() })

})



function confirmReset() {
  if (confirm("Sei sicuro di voler resettare il modulo?")) {
    document.getElementById("myForm").reset();
  }
  else { }
}
function confirmdelete() {
  if (confirm("Sei sicuro di vole cancellare il prodotto dal database?")) {
    {
      let iddel = document.querySelector('#idprod').value;
      console.log(iddel);

      fetch(`https://striveschool-api.herokuapp.com/api/product/${iddel}`, {
        method: "DELETE",
        headers: {
          'Authorization': autkey,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Errore nella richiesta di eliminazione');
          }
          return response.json();
        })
        .then(data => {
          console.log('Elemento eliminato con successo', data);

        })
        .catch(error => {
          console.error('Si è verificato un errore durante la cancellazione:', error);

        });
    }

  }
  else { }
}

if (window.location.pathname === "/backoffice.html") {
  document.querySelector("form#myForm button.btn-secondary").addEventListener("click", () => { confirmReset() });
  document.querySelector("form#deletorm button ").addEventListener("click", () => { confirmdelete() });
}

document.querySelector(".prod-list").addEventListener("click", (e) => {
  if (e.target.innerHTML === "Maggiori info") {
    console.log(e.target.id)
    let url = `https://striveschool-api.herokuapp.com/api/product/${e.target.id}`;
    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': autkey }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        let modal = document.querySelector("#exampleModal");
        modal.innerHTML = `   
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"> ${json.name}</h1>
                
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <div class="w-100"><img src="${json.imageUrl}" width="50%"></div>
              <p class="card-text">Prezzo: <span class="price">${json.price} Euro</span></p>
                  <p class="card-text">Brand: <span class="brand">${json.brand}</span></p>
                  
              <p class="card-text">${json.description}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                <button type="button" class="btn btn-primary">Aggiungi al carrello</button>
              </div>
            </div>
          </div>`;
      });
  }
});

