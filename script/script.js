function birthYears() {
  let today = new Date().getFullYear();
  let html = "";
  for (let i = today; i > today - 30; i--) {
    html += '<option value="' + i + '">' + i + "</option>";
  }
  document.querySelector("#birthYear").innerHTML = html;
}
birthYears();

let form = document.querySelector("form");
let nameLastname = document.querySelector("#nameLastname");
let city = document.querySelector("#city");
let adress = document.querySelector("#adress");
let birthYear = document.querySelector("#birthYear");
let male = document.querySelector("#male");
let female = document.querySelector("#female");
let messageDiv = document.querySelector(".message-div");
let container = document.querySelector(".container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    nameLastname.value.length < 5 ||
    city.value.length < 5 ||
    adress.value.length < 5
  ) {
    messageDiv.innerText = "Fields must contain at least 5 characters";
  } else {
    if (
      !isNaN(nameLastname.value) ||
      !isNaN(city.value) ||
      !isNaN(adress.value)
    ) {
      messageDiv.innerText = "Incorrect input";
    } else {
      if (
        (male.checked == false && female.checked == false) ||
        (male.checked == true && female.checked == true)
      ) {
        console.log(male.checked, female.checked);
        messageDiv.innerText = "You must choose sex ";
      } else {
        let nameLastnameValidation = nameLastname.value.trim();
        nameLastnameValidation = nameLastnameValidation.split(" ");
        if (nameLastnameValidation.length < 1) {
          messageDiv.innerText = "You must enter your name and last name";
          nameLastname.focus();
        } else {
          let data = new FormData(form);

          container.innerHTML = "";
          container.innerHTML =
            "<div class='text-center alert alert-success'>Data sent successfully</div>";

          fetch("index.php", {
            method: "post",
            body: data,
          })
            .then((res) => {
              return res.text();
            })
            .then((text) => {
              let response = JSON.parse(text);
              container.innerHTML += `<p>Name and Last Name: ${response.nameLastname}</p>`;
              container.innerHTML += `<p>City: ${response.city}</p>`;
              container.innerHTML += `<p>Address: ${response.adress}</p>`;
              container.innerHTML += `<p>Year of birth: ${response.birthYear}</p>`;
              container.innerHTML += `<p>Sex: ${
                response.male ? response.male : response.female
              }</p>`;
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    }
  }
});
