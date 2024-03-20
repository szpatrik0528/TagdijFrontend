document.addEventListener("DOMContentLoaded", function () {
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");
    const deleteButton = document.getElementById("delete");
    var table = document.getElementById("ugyfellista");
    function select() {

        console.log("select");

    }
    createButton.addEventListener("click", function () {
        const formData = new FormData(document.getElementById("myForm"));
        let baseUrl = "http://localhost/TagdijBackend/index.php?ugyfel";

        let options = {
            method: "POST",
            headers: {},
            body: formData
        };

        fetch(baseUrl, options)
            .then(response => {
                if (response.ok) {
                    return response.text(); // Assuming server returns "Feltöltés kész!" as text
                } else {
                    throw new Error('Feltöltés sikertelen');
                }
            })
            .then(message => {
                // Display success message to the user
                alert(message); // You can customize this to show in a better way like a modal or a dedicated message div
                // Optionally, you can clear the form fields or perform any other action needed after successful upload
            })
            .catch(error => {
                console.error('Hiba:', error);
                // Handle error scenario, show error message to the user or perform any necessary action
            });
    })
    readButton.addEventListener("click", async function () {
        let baseUrl = "http://localhost/TagdijBackend/index.php?ugyfel";

        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };


        let response = await fetch(baseUrl, options);
        let data = await response.json();

        let tabla = `
       <table class="table table-striped">
           <thead>
               <tr>
                   <th scope="col">ID</th>
                   <th scope="col">Név</th>
                   <th scope="col">Születési év</th>
                   <th scope="col">Irányítószám</th>
                   <th scope="col">Ország</th>
                   <th scope="col">Művelet</th>
               </tr>
           </thead>
           <tbody>
   `;
        data.forEach(element => {
            tabla += `<tr><th scope='row'>` + element.azon + `</th><td>` + element.nev + `</td><td>` + element.szulev + `</td><td>` + element.irszam + `</td><td>` + element.orsz + `</td><td><Button class="btn btn-primary pick" id="` + element.azon + `">Pick</Button></td></tr>`;
        });
        tabla += `
           </tbody>
       </table>`;

        table.innerHTML = tabla;
    });
    updateButton.addEventListener("click", function () {

    });
    deleteButton.addEventListener("click", function () {
        table.innerHTML = "";
    });

    const pickButtons = document.querySelectorAll('.pick');

    // Minden "Pick" gombhoz hozzáadunk egy eseményfigyelőt
    pickButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Azonosító kinyerése a gomb azonosítójából
            let clientId = this.id;

            // Kiválasztott ügyfél keresése az azonosító alapján a data tömbben
            let selectedClient = data.find(client => client.azon === clientId);

            // Beviteli mezők kitöltése a kiválasztott ügyfél adataival
            document.getElementById('azon').value = selectedClient.azon;
            document.getElementById('nev').value = selectedClient.nev;
            document.getElementById('szulev').value = selectedClient.szulev;
            document.getElementById('irszam').value = selectedClient.irszam;
            document.getElementById('orsz').value = selectedClient.orsz;
        });
    });
});