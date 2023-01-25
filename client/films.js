let button = document.getElementById("get")
let submit = document.getElementById("rating")
let table = document.getElementById("getTable")

button.addEventListener('click', async function(event){
    try {
        let response = await fetch('http://127.0.0.1:8090/random')
        let body = await response.json()
        document.getElementById("image").src = body[1]
        document.getElementById('name').innerHTML = body[0]
        document.getElementById('submitRating').style.display = "block"
        document.getElementById('myRating').innerHTML = ""
        document.getElementById('yours').innerHTML = ""
        document.getElementById("yourRating").value = ""
        document.getElementById("table").innerHTML = ""
    } catch(e) {
        alert(e)
    }
  })

submit.addEventListener('click', async function(event){
    event.preventDefault()
    try {
        let response = await fetch(`http://127.0.0.1:8090/submit?yourRating=${document.getElementById("yourRating").value}&film=${document.getElementById("name").innerHTML}`)
        let body = await response.text()
        document.getElementById('myRating').innerHTML = body
        document.getElementById('yours').innerHTML = "Your rating: " + document.getElementById("yourRating").value
    } catch(e) {
        alert(e)
    }
}
)

table.addEventListener('click', async function(event){
    try {
        let response = await fetch('http://127.0.0.1:8090/table')
        let body = await response.json()
        let tab = "<tr><th>Film ID</th><th>Film Name</th><th>Image</th><th>My Rating</th><th>Your Rating</th></tr>"
        for (let film in body){
            tab += `<tr><td>${body[film]["id"]}</td><td><button class="name">${film}</button></td><td><img src="${body[film]["path"]}" style:"width:300px"></td><td>${body[film]["myRating"]}</td><td>`
            if (body[film]["flag"]){
                tab += `${body[film]["yourRating"]}</td></tr>`
            } else{
                tab += `Unrated</td></tr>`
            }
        }
        document.getElementById("table").innerHTML = tab

        let names = document.getElementsByClassName("name")
        for (let x of names){
            x.addEventListener('click', async function(event){
                try {
                    let response = await fetch(`http://127.0.0.1:8090/specific?name=${x.innerHTML}`)
                    let body = await response.json()
                    document.getElementById("image").src = body[1]
                    document.getElementById('name').innerHTML = body[0]
                    document.getElementById('submitRating').style.display = "block"
                    if (body[2]){
                        document.getElementById('myRating').innerHTML = body[3]
                        document.getElementById('yours').innerHTML = body[4]
                    } else{
                        document.getElementById('myRating').innerHTML = ""
                        document.getElementById('yours').innerHTML = ""
                    }
                    document.getElementById("yourRating").value = ""
                    document.getElementById("table").innerHTML = ""
                } catch(e) {
                    alert(e)
                }
            })
        }
    } catch(e) {
        alert(e)
    }
  })

