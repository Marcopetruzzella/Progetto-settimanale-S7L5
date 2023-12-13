let autkey= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWY0YjI2NzYxNDAwMTgzYzJlY2UiLCJpYXQiOjE3MDIzODc1MzIsImV4cCI6MTcwMzU5NzEzMn0.M9RbWAXZ1p8PJMLRd8DUMik8rIh6Hx_Uod6BwsW2gQo"
let dataToSend = {
    
    nome: 'Marco'};

  document.addEventListener('DOMContentLoaded', () => {
    let obj = {
        name: "Mario Rossi",
        description : "Mariolino",
        brand: "motorola",
        imageUrl: "http://mariorossi.com",
        price: 25
    }
        console.log(JSON.stringify(obj))
    
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
            //createPhotosCard(json.photos);
        })
        .catch(error => console.log(error))
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
    
       document.querySelector('.btn-primary').addEventListener('click', () => { creaOggetto ()})
      
      

})

