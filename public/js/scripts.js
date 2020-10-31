function onSlideMenu() {
  document.getElementById("menu").style.width = "250px";
  document.getElementById("slide").style.visibility = "hidden";
}
function closeSlideMenu() {
  document.getElementById("menu").style.width = "0";
  document.getElementById("slide").style.visibility = "visible";
}

let name, prodID, qty, unitPrice, unit, purchasedPrice;
let partyname,
  personToContact,
  address,
  telephone,
  mobile,
  email,
  website,
  refNo,
  ref,
  nameAddress;
let fetchingDate;

// POST data of Product & Customer
async function submitData() {
  console.log("HEY");
  name = document.getElementById("productName").value;
  qty = document.getElementById("qty").value;
  unit = document.getElementById("unit").value;
  unitPrice = document.getElementById("unitPrice").value;
  partyName = document.getElementById("partyName").value;
  personToContact = document.getElementById("personToContact").value;
  address = document.getElementById("address").value;
  telephone = document.getElementById("telephone").value;
  mobile = document.getElementById("mobile").value;
  email = document.getElementById("email").value;
  website = document.getElementById("website").value;
  refNo = document.getElementById("refNo").value;
  ref = document.getElementById("ref").value;
  data = {
    name: name,
    qty: qty,
    unit: unit,
    unitPrice: unitPrice,
    partyName: partyName,
    personToContact: personToContact,
    address: address,
    telephone: telephone,
    mobile: mobile,
    email: email,
    website: website,
    refNo: refNo,
    ref: ref,
  };
  await fetch("http://localhost:8000/inventory", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      alert("Error Occured")
      console.error("Error:", error);
    });
  await ClearFields();

 

}

// Fetching API (Products)
async function API() {
  console.log("API Called");
  await fetch("http://localhost:8000/inventory")
    .then((response) => response.json())
    .then((json) => {
      return (data = json);
    });
  return data;
}

async function GETPARTYINFO() {
  let partyData = await API();

  let options = "";
  partyData.forEach((partyData) => {
    let htmlSegment = `
    <option value="${partyData.partyName}">
            `;

    options += htmlSegment;
  });

  let productsRow = document.querySelector("#buyers");
  productsRow.innerHTML = options;
}



async function myClick(id) {
  sessionStorage.setItem("edit_id", id)
  console.log(id)

    
    
    
}

// To Render Products on DATABASE TABLE
async function renderProducts() {
  let a = await API();

  let html = "";
  a.forEach((product, i) => {
   
    let myId = product._id
    const table = `
    <tr class="singleRow">
    <th scope="row">${i + 1}</th>
    <td>${product.refNo}</td>
    <td>${product.ref}</td>
    <td>${product.name}</td>
    <td>${product.qty}</td>
    <td>${product.unit}</td>
    <td>${product.unitPrice}</td>
    <td>${product.personToContact}</td>
    <td>${product.partyName}</td>
    <td>${product.mobile}</td>
    <td>${product.telephone}</td>
    <td>${product.email}</td>
    <td>${product.website}</td>
    <td>${product.address}</td>
    <td><button class="editButton btn btn-primary" id="${myId}"><a href="/edit/${myId}" onclick=myClick("${myId}") class="my-btn-link">Edit</a></button></td>
    </tr>
    `
    // onClick=myClick("${myId}")
    html += table;
  });




  let productsRow = document.querySelector(".products-row");
  productsRow.innerHTML = html;

  //DataTable
  $("#database-table").DataTable();
  ///REMOVE TABLE ROW

  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", function (event) {
      var buttonClicked = event.target.parentElement.parentElement.remove();
    });
  }
}



async function fetchDate() {
  ref = document.getElementById("ref").value;
  refNo = document.getElementById("refNo").value;
  nameAddress = document.getElementById("nameAddress").value;
  let GenInfo = {
    nameAddress: nameAddress,
    ref: ref,
    refNo: refNo,
  };
  fetchingRefNo = document.getElementById("refNo").value;
  if (fetchingRefNo == "" || fetchingRefNo == null) {
    return alert("Please enter a valid Reference No. ");
  }
  let myData = {
    refNo: fetchingRefNo,
  };
  await fetch("http://localhost:8000/inventory/findRef", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      sessionStorage.setItem("slip", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  sessionStorage.setItem("GetInfo", JSON.stringify(GenInfo));
  window.location.href = "/the-slip";
}

async function renderSlip() {
  let GetFinalInfo = JSON.parse(sessionStorage.getItem("GetInfo"));
  let GetRefNoID = document.getElementById("refNoID");
  GetRefNoID.innerHTML = `<p>${GetFinalInfo.refNo}</p>`;
  let GetRefID = document.getElementById("refID");
  GetRefID.innerHTML = `<p>Ref: ${GetFinalInfo.ref}</p>`;
  let GetAddressNameID = document.getElementById("addressNameID");
  GetAddressNameID.innerHTML = `<p>${GetFinalInfo.nameAddress}</p>`;
  let items = JSON.parse(sessionStorage.getItem("slip"));
  let html = "";
  items.forEach((item, index) => {
    let htmlSegment = `
            <tr>
            
            <th scope="row">${index + 1}</th>
            <td>${item.name}</td>

            <td>${item.unit}</td>
              <td>${item.qty}</td>
              <td>${item.unitPrice}</td>
            </tr>
            `;

    html += htmlSegment;
  });

  let productsRow = document.querySelector(".slip-products-row");
  productsRow.innerHTML = html;
  deleteItems();
}

async function ClearFields() {

  document.getElementById("productName").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("unit").value = "KG";
  document.getElementById("unitPrice").value = "";

}

async function deleteItems() {
  await sessionStorage.clear();
}

async function callBuyerInfo() {
  var NameOfParty = document.getElementById("partyName").value;

  let getPartyInfo = {
    partyName: NameOfParty,
  };
  await fetch("http://localhost:8000/inventory/getParty", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getPartyInfo),
  })
    .then((response) => response.json())
    .then((Partydata) => {
      console.log("Success:", Partydata);
      document.getElementById("personToContact").value =
        Partydata.personToContact;
      document.getElementById("address").value = Partydata.address;
      document.getElementById("telephone").value = Partydata.telephone;
      document.getElementById("mobile").value = Partydata.mobile;
      document.getElementById("email").value = Partydata.email;
      document.getElementById("website").value = Partydata.website;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function editRender() {
  
  
  const id = await sessionStorage.getItem("edit_id")
  console.log(id)
  const editData = await fetch(`http://localhost:8000/inventory/${id}`)
    .then((response) => response.json())
    .then((json) => {
      return (data = json);
    });
  console.log(editData)

  document.getElementById('refNo').value = editData.refNo
  document.getElementById('address').value = editData.address
  document.getElementById('ref').value = editData.ref
  document.getElementById('address').value = editData.address
  document.getElementById('productName').value = editData.productName
  document.getElementById('qty').value = editData.qty
  document.getElementById('unit').value = editData.unit
  document.getElementById('unitPrice').value = editData.unitPrice
  document.getElementById('partyName').value = editData.partyName
  document.getElementById('personToContact').value = editData.personToContact
  document.getElementById('personToContact').value = editData.personToContact
  document.getElementById('telephone').value = editData.telephone
  document.getElementById('mobile').value = editData.mobile
  document.getElementById('email').value = editData.email
  document.getElementById('website').value = editData.website

  }


  async function submitEditData() {
    const id = await sessionStorage.getItem("edit_id")
    console.log("HEY");
    name = document.getElementById("productName").value;
  
   
    qty = document.getElementById("qty").value;
    unit = document.getElementById("unit").value;
    unitPrice = document.getElementById("unitPrice").value;
  
    partyName = document.getElementById("partyName").value;
    personToContact = document.getElementById("personToContact").value;
    address = document.getElementById("address").value;
    telephone = document.getElementById("telephone").value;
    mobile = document.getElementById("mobile").value;
    email = document.getElementById("email").value;
    website = document.getElementById("website").value;
    refNo = document.getElementById("refNo").value;
    ref = document.getElementById("ref").value;
  
    data = {
      name: name,
      qty: qty,
      unit: unit,
      unitPrice: unitPrice,
      partyName: partyName,
      personToContact: personToContact,
      address: address,
      telephone: telephone,
      mobile: mobile,
      email: email,
      website: website,
      refNo: refNo,
      ref: ref,
    };
    await fetch(`http://localhost:8000/inventory/${id}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        alert("Data has been successfully Edited!")
        return response.json()})
      .then((data) => {
        
        window.location.replace("http://localhost:8000/database");

        console.log("Success:", data);
      })
      
      .catch((error) => {
        console.error("Error:", error);
      });
    
  
   
  
  }