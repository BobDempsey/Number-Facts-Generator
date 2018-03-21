// Variables

let fact = document.querySelector("#fact");
let factText = document.querySelector("#factText");
let numberInput = document.querySelector("#numberInput");
let factCloseBtn = document.querySelector("#factCloseBtn");
let specificNumber = document.querySelector("#specificNumber");

// Event Listeners

if (numberInput) {
  numberInput.addEventListener("input", getFactFetch);
}

if (factCloseBtn) {
  factCloseBtn.addEventListener("click", closeFactPanel);
}

// App Functions

function getFactFetch() {
  let number = numberInput.value;
  fetch("http://numbersapi.com/" + number)
    .then(response => response.text())
    .then(data => {
      if (number != "") {
        fact.style.display = "block";
        specificNumber.innerText = number;
        factText.innerText = data;
        console.log(data);
      }
    })
    .catch(err => console.log(err));
}

// fact display panel close btn functionality

function closeFactPanel() {
  fact.style.display = "none";
}

// Backup ajax function for demo purposes

// function getFactAjax() {
//   let number = numberInput.value;
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", "http://numbersapi.com/" + number);

//   xhr.onload = function() {
//     // run if response is OK & number input isn't blank
//     if (this.status == 200 && number != "") {
//       fact.style.display = "block";
//       factText.innerText = this.responseText;
//     }
//   };
//   xhr.send();
// }

// Document ready function
$(() => {
  // Ready contact form
  submitForm();
  // Hide contact form success message
  $("#contactFormSuccess").hide();
  // Hide MailChimp Success Message
  $("#subSuccess").hide();
  // Hide Search Progress Spinner
  $("#searchSpinner").hide();
  // Form submit function
});

// Toaster Options
toastr.options = {
  closeButton: true,
  preventDuplicates: true,
  hideDuration: "100"
};

// MailChimp Sub Form
function addSubscriber() {
  let subscriberEmail = $("#mce-EMAIL").val();
  if (subscriberEmail == "") {
    toastr.error("Please Enter an Email Address");
  } else {
    $("#subscribeForm").submit();
    $("#mce-EMAIL").val("");
    $("#subSuccess").show();
  }
}

// Contact Form
function submitForm() {
  $("#contactFormSubmitBtn").click(function(e) {
    var name = $("#form-contact-name").val();
    var email = $("#form-contact-email").val();
    var phone = $("#form-contact-phone").val();
    var company = $("#form-contact-company").val();
    var message = $("#form-contact-message").val();
    // Basic Form Validation
    if (name == "" || email == "") {
      toastr["error"]("Please fill in your name & email address!");
      return false;
    } else {
      $.ajax({
        url: "https://formspree.io/bobdempsey83@gmail.com",
        method: "POST",
        data: {
          Form: "Number Facts Generator App",
          Name: name,
          Email: email,
          Phone: phone,
          Company: company,
          Message: message
        },
        dataType: "json"
      });
      // display success confirmations
      toastr["success"]("Form submission successful!");
      $("#contactFormSuccess").show();
      // clear form fields
      $("#form-contact-name").val("");
      $("#form-contact-email").val("");
      $("#form-contact-phone").val("");
      $("#form-contact-company").val("");
      $("#form-contact-message").val("");
      // do not reload page
      e.preventDefault();
    }
  });
}
