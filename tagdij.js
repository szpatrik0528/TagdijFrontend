document.addEventListener("DOMContentLoaded", function() {
    const CreateButton = document.createElement('create');
    const ReadButton = document.createElement('read');
    const UpdateButton = document.createElement('update');
    const DeleteButton = document.createElement('delete');
    CreateButton.addEventListener('click', async function(){
        let baseUrl="http://localhost/Tagdijbackend/index.php";
        let dataJSON = {
            "nev": document.getElementById("nev").value,
            "irszam": document.getElementById("irszam").value,
            "szulev": document.getElement("szulev").value,
            "orsz": document.getElement("orsz").value,
        };
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)
        };
        let response = await fetch(baseUrl, options);
        let data = await response.json();
            console.log(data)
    })
});