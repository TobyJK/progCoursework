let button = document.getElementById("get")

button.addEventListener('click', async function(event){
    try {
        let response = await fetch('http://127.0.0.1:8090/random')
        let body = await response.json()
        console.log(body)
        document.getElementById("image").src = body[1]
        document.getElementById('name').innerHTML = body[0]
    } catch(e) {
        alert(e)
    }
  });