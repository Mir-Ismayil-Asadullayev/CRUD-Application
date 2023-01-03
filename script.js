let submitButton = document.querySelector(".subbmit");
let updateButton2 = document.querySelector(".update");
let companyNameInput = document.getElementById("companyName");
let contactNameInput = document.getElementById("contactName");
let contactTitleIput = document.getElementById("contactTitle");
submitButton.addEventListener("click", addSupplier);
updateButton2.style.visibility = "hidden";
updateButton2.addEventListener("click", (e) => update(e.target.id))

function fillTable() {

    document.querySelector('tbody').innerHTML = "";

    fetch('https://northwind.vercel.app/api/suppliers')
        .then(res => res.json())
        .then(data => {
            data.unshift(data[data.length - 1]);
            data.pop();
            data.forEach(element => {

                let trElement = document.createElement('tr');
                trElement.setAttribute('id', element.id);

                let tdId = document.createElement('td');
                tdId.innerHTML = element.id;

                let tdCompanyName = document.createElement('td');
                tdCompanyName.innerHTML = element.companyName;

                let tdContactName = document.createElement('td');
                tdContactName.innerHTML = element.contactName;

                let tdContactTitle = document.createElement('td');
                tdContactTitle.innerHTML = element.contactTitle;

                let deleteButton = document.createElement('button');
                deleteButton.id = element.id;

                let updateButton = document.createElement('button');
                updateButton.id = element.id;
                updateButton.data1 = element.companyName;
                updateButton.data2 = element.contactName;
                updateButton.data3 = element.contactTitle;

                deleteButton.innerHTML = "Delete";
                deleteButton.style.backgroundColor = "darkred";
                deleteButton.style.color = "white";
                deleteButton.style.width = "100%";
                deleteButton.style.height = "45px";
                deleteButton.style.border = "1px solid white";
                deleteButton.style.outline = "none";
                deleteButton.style.cursor = "pointer";
                deleteButton.addEventListener("mouseenter", () => {
                    deleteButton.style.backgroundColor = "white";
                    deleteButton.style.color = "darkred";
                })
                deleteButton.addEventListener("mouseleave", () => {
                    deleteButton.style.color = "white";
                    deleteButton.style.backgroundColor = "darkred";
                })

                updateButton.innerHTML = "Update";
                updateButton.style.backgroundColor = "orange";
                updateButton.style.color = "white";
                updateButton.style.width = "100%";
                updateButton.style.height = "45px";
                updateButton.style.border = "1px solid white";
                updateButton.style.outline = "none";
                updateButton.style.cursor = "pointer";
                updateButton.addEventListener("mouseenter", () => {
                    updateButton.style.backgroundColor = "white";
                    updateButton.style.color = "orange";
                })
                updateButton.addEventListener("mouseleave", () => {
                    updateButton.style.color = "white";
                    updateButton.style.backgroundColor = "orange";
                })

                let deleteB = document.createElement('td');
                deleteB.appendChild(deleteButton);
                deleteB.style.padding = "0px";

                let updateB = document.createElement('td');
                updateB.appendChild(updateButton);
                updateB.style.padding = "0px";

                deleteButton.addEventListener("click", (e) => {
                    let supplierId = e.target.id;
                    removeSupplier(supplierId);
                    console.log(e.target);
                });

                updateButton.addEventListener("click", (e) => {
                    companyNameInput.value = e.target.data1;
                    contactNameInput.value = e.target.data2;
                    contactTitleIput.value = e.target.data3;
                    updateButton2.style.visibility = "visible";
                    updateButton2.id = e.target.id;
                });

                trElement.appendChild(tdId);
                trElement.appendChild(tdCompanyName);
                trElement.appendChild(tdContactName);
                trElement.appendChild(tdContactTitle);
                trElement.appendChild(deleteB);
                trElement.appendChild(updateB);
                document.querySelector('tbody').appendChild(trElement);
            });
        })

}

function update(id) {

    let confirmUpdate = confirm("Do you really want to update this data?")

    if (confirmUpdate) {

        let addSupplier = {
            companyName: companyNameInput.value,
            contactName: contactNameInput.value,
            contactTitle: contactTitleIput.value
        };

        fetch(`https://northwind.vercel.app/api/suppliers/${id}`, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addSupplier)
        }).then(data => {
            if (data.status >= 200) {
                alert("Data updated successfully");
                location.reload();
            } else {
                alert("Error occured!");
            }
        });
    }


}

function addSupplier() {

    let newSupplier = {
        companyName: companyNameInput.value,
        contactName: contactNameInput.value,
        contactTitle: contactTitleIput.value
    };

    fetch(`https://northwind.vercel.app/api/suppliers`, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSupplier)
    }).then(data => {
        if (data.status >= 200) {
            alert("Data posted successfully");
            location.reload();
        } else {
            alert("Error occured!");
        }
    });

    companyNameInput.value = "";
    contactNameInput.value = "";
    contactTitleIput.value = "";
}

function removeSupplier(id) {

    let answer = confirm("Do you really want to delete this item?");

    if (answer) {
        fetch(`https://northwind.vercel.app/api/suppliers/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.status == 200) {
                    fillTable();
                    alert("Data was deleted successfully!");
                }
            })
    }
}

fillTable();
