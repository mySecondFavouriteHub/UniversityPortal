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
    var usernameInput = document.getElementById("username");
    var firstNameInput = document.getElementById("first-name");
    var lastNameInput= document.getElementById("last-name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var passwordInput = document.getElementById("password");
    var confirmInput = document.getElementById("confirm-password");
    var saveLink = document.getElementById("save-profile");

    // load profile and fill form
    var existingProfile = loadProfile();

    if(existingProfile){
        usernameInput.value = existingProfile.username || "";
        firstNameInput.value = existingProfile.firstName || "";
        lastNameInput.value = existingProfile.lastName || "";
        emailInput.value = existingProfile.email || "";
        phoneInput.value = existingProfile.phone ||"";
        // do not prefill password fields for security reasons
    }

    // save profile on click
    saveLink.addEventListener("click", function(event){
        // stop page from redirecting immediately
        event.preventDefault();

        // read 
        var username = usernameInput.value;
        var firstName = firstNameInput.value;
        var lastName = lastNameInput.value;
        var email = emailInput.value;
        var phone = phoneInput.value;
        var password = passwordInput.value;
        var confirmPw = confirmInput.value;

        // make sure all required fields are filled 
        if(!username|| !firstName || !lastName || !email || !phone){
            alert("Please fill in all required fields before submitting.");
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

        // password change is optional
        if(password || confirmPw){
            // both must be filled
            if(!password || !confirmPw){
                alert("Please fill in both password fields or leave both empty");
                return;
            }

            // check if matches
            if(password !== confirmPw){
                alert("New password and Confirmation password do not match");
                return;
            }
        }

        // profile object 
        var profile = {
            username: username,
            firstName: firstName,
            lastName:lastName,
            email: email,
            phone: phone
        };

        // only update password if user filled the fields
        if(password && confirmPw){
            profile.password = password;
        }

        // save into local storage
        saveProfile(profile);

        // go back to main page
        window.location.href = "mainPage.html";
    });
};