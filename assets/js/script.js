let autkey= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWY0YjI2NzYxNDAwMTgzYzJlY2UiLCJpYXQiOjE3MDIzODc1MzIsImV4cCI6MTcwMzU5NzEzMn0.M9RbWAXZ1p8PJMLRd8DUMik8rIh6Hx_Uod6BwsW2gQo"


  document.addEventListener('DOMContentLoaded', () => {
   /*  let obj = {
        name: "Mario Rossi",
        description : "Mariolino",
        brand: "motorola",
        imageUrl: "http://mariorossi.com",
        price: 25
    }
        console.log(JSON.stringify(obj)) */
    
        function scrivoApi (obj) {fetch("https://striveschool-api.herokuapp.com/api/product", {
            // Chiamata di tipo POST
            method: "POST", // Method della chiamata - Salvataggio di una risorsa
            body: JSON.stringify(obj), // nel body della richiesta invio il dato al server
            headers: {
                'Authorization' : autkey, "Content-Type": "application/json",  // il tipo del contenuto che sto inviando
            },
          })}
    
    function leggopai( ) {
        let url = `https://striveschool-api.herokuapp.com/api/product`;
        fetch(url, {
            method: 'GET', 
            headers: { 'Authorization': autkey }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            let prodlist = document.querySelector('.prod-list')
            
            prodlist.textContent="";
            console.log(prodlist)
            json.forEach(function(numero, indice) {
                let div = document.createElement('div')
                div.classList = 'd-flex w-auto'
                div.innerHTML = ` <div class="card m-1 col-3 p-3" style="width: 18rem; " >
                <img src="${json[indice].imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${json[indice].name}</h5>
                 
                  <p class="card-text">${json[indice].description}.</p>
                  <p class="card-text">Prezzo: <span class="price">${json[indice].price}</span></p>
                  <p class="card-text">Brand: <span class="brand">${json[indice].brand}</span></p>
                  <a href="#" class="btn btn-primary">Acquista</a>
                  <h5 class="idscheda"">id=${json[indice]._id}</h5>
                </div>
              </div>`
                prodlist.appendChild(div)
                });
              });
           
        
    }
  /*   leggopai()
    scrivoApi()
    leggopai() */
    
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
        scrivoApi (oggettoDati)
        leggopai()
      }
      function rimuoviogg() {
        let iddel = document.querySelector('#idprod').value; // Assicurati di usare '#idprod' se è un ID o '.idprod' se è una classe
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




        
       document.querySelector('.btn-primary').addEventListener('click', () => { creaOggetto ()})
       leggopai()

       document.querySelector('.btn-danger').addEventListener('click', () =>  { rimuoviogg()})
       
})

