// store profile in Local Storage
var PROFILE_KEY = "studentProfile";

// load existing bookings from local storage
function loadProfile(){
    var stored = localStorage.getItem(PROFILE_KEY);

    if(stored){
        // convert JSON string to JavaScript array
        return JSON.parse(stored);
    }
    else{
        // if nothing saved yet, return empty list
        return null
    }
}

//save profile onto local Storage
function saveProfile(profileObj){
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profileObj));
}

// run when page loads
window.onload = function(){

    // get form inputs
    var firstNameInput = document.getElementById("first-name");
    var lastNameInput= document.getElementById("last-name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var avatarInput = document.getElementById("avatar");

    var saveLink = this.document.getElementById("save-profile");

    // load profile and fill form
    var existingProfile = loadProfile();

    if(existingProfile){
        firstNameInput.value = existingProfile.firstName || "";
        lastNameInput.value = existingProfile.lastName || "";
        emailInput.value = existingProfile.email || "";
        phoneInput.value = existingProfile.phone ||"";
    }

    // save profile on click
    saveLink.addEventListener("click", function(event){
        // stop page from redirecting immediately
        event.preventDefault();

        // read inputs
        var firstName = firstNameInput.value;
        var lastName = lastNameInput.value;
        var email = emailInput.value;
        var phone = phoneInput.value;

        // make sure all fields are filled 
        if(!firstName || !lastName || !email || !phone){
            alert("Please fill in all the fields before submitting.");
            return;
        }

        // check email format
        var emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if(!emailPattern.test(email)){
            alert("Please enter a valid email address");
            return;
        }

        // check phone format
        var phonePattern = /^[0-9]{10}$/;
        if(!phonePattern.test(phone)){
            alert("Please enter a valid 10 digit phone number");
            return;
        }

        // profile object
        var profile = {
            firstName: firstName,
            lastName:lastName,
            email: email,
            phone: phone
        };

        // save into local storage
        saveProfile(profile);

        // go back to main page
        window.location.href = "mainPage.html";
    });
};