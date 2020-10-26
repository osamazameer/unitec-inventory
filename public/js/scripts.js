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

  // prodID = document.getElementById("productId").value;
  qty = document.getElementById("qty").value;
  unit = document.getElementById("unit").value;
  unitPrice = document.getElementById("unitPrice").value;
  // purchasedPrice = document.getElementById("purchasedPrice").value;
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
    // nameAddress: nameAddress,
    refNo: refNo,
    ref: ref,
  };
  //console.log(data);
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
      console.error("Error:", error);
    });
  await ClearFields();

  //await renderProducts();

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


//Removes ReadOnly from input fields in DATABASE TABLE
function letChange() {
  console.log("Hello  ")
  //element.buttonClicked("editButton", function () { alert("Hello World!"); });
  // console.log("HELLO")
  // await document.getElementById(`remove${nth}`).removeAttribute('readonly');


}

function myClick(id) {
  console.log("working")
  document.getElementById(id).addEventListener('click', async () => {

    name = document.getElementById("productName" + id).value;
    // prodID = document.getElementById("productId").value;
    qty = document.getElementById("qty" + id).value;
    unit = document.getElementById("unit" + id).value;
    unitPrice = document.getElementById("unitPrice" + id).value;
    // purchasedPrice = document.getElementById("purchasedPrice").value;
    partyName = document.getElementById("partyName" + id).value;
    personToContact = document.getElementById("personToContact" + id).value;
    address = document.getElementById("address" + id).value;
    telephone = document.getElementById("telephone" + id).value;
    mobile = document.getElementById("mobile" + id).value;
    email = document.getElementById("email" + id).value;
    website = document.getElementById("website" + id).value;
    refNo = document.getElementById("refNo" + id).value;
    ref = document.getElementById("ref" + id).value;

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
      // nameAddress: nameAddress,
      refNo: refNo,
      ref: ref,
    };
    console.log(data);
    await fetch(`http://localhost:8000/inventory/${id}`, {
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
        console.error("Error:", error);
      });

  })
}

// To Render Products on DATABASE TABLE
async function renderProducts() {
  let a = await API();

  let html = "";
  a.forEach((product, i) => {
    console.log(product._id);
    let myId = product._id
    let htmlSegment = `
            <tr class="singleRow">
              <th scope="row">${i + 1}</th>
              <td><input style="border: 0px;" type="text" id="refNo${myId}" value="${product.refNo}"/></td>
              <td><input style="border: 0px;" type="text" id="ref${myId}" value="${product.ref}"/></td>
              <td><input style="border: 0px;" type="text" id="productName${myId}" value="${product.name}"/></td>
              <td><input style="border: 0px;" type="text" id="qty${myId}" value="${product.qty}"/></td>
              <td><input style="border: 0px;" type="text" id="unit${myId}" value="${product.unit}"/></td>
              <td><input style="border: 0px;" type="text" id="unitPrice${myId}" value="${product.unitPrice}"/></td>
              <td><input style="border: 0px;" type="text" id="personToContact${myId}" value="${product.personToContact}"/></td>
              <td><input style="border: 0px;" type="text" id="partyName${myId}" value="${product.partyName}"/></td>
              <td><input style="border: 0px;" type="text" id="mobile${myId}" value="${product.mobile}"/></td>
              <td><input style="border: 0px;" type="text" id="telephone${myId}" value="${product.telephone}"/></td>
              <td><input style="border: 0px;" type="text" id="email${myId}" value="${product.email}"/></td>
              <td><input style="border: 0px;" type="text" id="website${myId}" value="${product.website}"/></td>
              <td><input style="border: 0px;" type="text" id="address${myId}" value="${product.address}"/></td>
              <td><button class="editButton btn btn-primary" id="${product._id}" onclick=myClick("${myId}")>Edit</button></td>
              </tr>
            `;

    html += htmlSegment;
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
    return alert("Please enter a valid date");
  }
  let myData = {
    ReferenceNo: fetchingRefNo,
  };

  await fetch("http://localhost:8000/inventory/find", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData),
  })
    .then((response) => response.json())
    .then((data) => {
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
  //console.log(items);
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

// function searchTable() {
//   document.getElementById("search-input").addEventListener("keyup", () => {
//     let value = this.value;
//     console.log(value);
//   });

// }

// $(document).ready(function () {
//   $("#database-table").DataTable();
// });
