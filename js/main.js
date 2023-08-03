
let Sitename = document.querySelector("#SiteName");
let SiteURL = document.querySelector("#SiteURL");

let button = document.querySelector('#submit');
var bookMarkList = [];
let nameinput = document.querySelector(".nameinput");
let URLinput = document.querySelector(".URLinput");

if (localStorage.getItem("bookMarkList") == null) {
  var bookMarkList = [];

} else {
  
  bookMarkList = JSON.parse(localStorage.getItem("bookMarkList"));
  Display(bookMarkList);

}

button.addEventListener("click", function () {

  if (validateName() && validateURL()) {
    let site = {
      name: Sitename.value,
      url: SiteURL.value
    };

    bookMarkList.push(site);
    Display(bookMarkList);
    clear();
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList))
  }
});

function Display(sites) {

  let blackbox = '';
  for (let i = 0; i < sites.length; i++) {

    blackbox += ` <tr>

   <td> ${i + 1}</td>
    <td>${sites[i].name}</td>
    <td><a href="${sites[i].url}" target="_blank" class="btn btn-sm btn-info">
    <i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
    <td><button onclick="Delete(${i})"  class=" btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
  </tr>`

  }
  document.getElementById("tbody").innerHTML = blackbox;

}


function clear() {

  Sitename.value = ""
  SiteURL.value = ""

}
function Delete(index) {

  bookMarkList.splice(index, 1)
  localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList))
  Display(bookMarkList);
}


nameinput.addEventListener("input", validateName)
function validateName() {

  var regex = /^[A-Z][a-zA-Z]{3,9}$/; // Changed the regex pattern to allow both uppercase and lowercase letters

  if (regex.test(nameinput.value)) { // Use nameinput.value instead of Sitename.value
    nameinput.style = "border: 3px solid green";
    return true;
  } else {
    nameinput.style = "border: 3px solid red";
    return false;
  }
};



URLinput.addEventListener("input", validateURL)

function validateURL() {
  var regex = /^https:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z]{2,6}(\/\S*)?$/;

  if (regex.test(SiteURL.value)) {
    SiteURL.style = "border: 3px solid green";
    return true;
  } else {
    SiteURL.style = "border: 3px solid red";
    return false;
  }
}