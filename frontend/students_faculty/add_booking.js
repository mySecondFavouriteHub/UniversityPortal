// store bookings in Local Storage
var BOOKINGS_KEY = "studentBookings";

// load existing bookings from local storage
function loadBookingForAdd(){
    var stored = localStorage.getItem(BOOKINGS_KEY);

    if(stored){
        // convert JSON string to JavaScript array
        return JSON.parse(stored); 
    } 
    else{
        // if nothing saved yet, return empty list
        return [];
    }
}

// saved updated booking list into local Storage
function saveBookingForAdd(arr){
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(arr));
}

// helper method to avoid end time being before start time
function timeToMinutes(timeStr){
    var parts = timeStr.split(":");// will split between hours and minutes ["hour", "minutes"]
    var hours = parseInt(parts[0]); // string to int
    var minutes = parseInt(parts[1]); // string to int
    return hours*60 + minutes // convert to minutes 
}

// runs after page is fully loaded
window.onload = function() {

    // set minimum date to today
    var dateInput = document.getElementById("date");
    var today = new Date();

    var year = today.getFullYear();
    var month = today.getMonth() + 1;// 1-12
    var day = today.getDate();
    
    // format date and month to always have 2 digits
    if(month <10){
        month ="0" + month;
    }
    else{
        month = "" + month // turn nbr into string
    }

    if(day<10){
        day = "0" + day;
    }
    else{
        day = "" + day// turn nbr into string
    }
    var todayString = year + "-" + month + "-" + day; // final string
    dateInput.min = todayString; //set min allowed to current date


    // get submit button
    var submitLink = document.getElementById("submit-booking");

    // add click event to submit button
    submitLink.addEventListener("click", function(event){
        event.preventDefault();// stop browser from going to main page directly, save data first
    
        // read values from form
        var resource = document.getElementById("resource").value;
        var date = document.getElementById("date").value;
        var start = document.getElementById("start").value;
        var end = document.getElementById("end").value;
    
        // simple validation to make sure fields are not empty
        if(!resource || !date || !start || !end){
            alert("Please fill in all fields before submitting.");
            return;
        }

        // extra check user can;t chose date before today
        if(date < todayString){
            alert("You cannot select a date in the past.")
            return;
        }

        // convert start and end time string
        var startMinutes = timeToMinutes(start);
        var endMinutes = timeToMinutes(end);

        if(endMinutes <=startMinutes){
            alert("End time must be after start time");
            return;
        }

        // load existing bookings
        var bookings = loadBookingForAdd();

        // create new booking object
        var newBooking = {
            id: new Date().getTime(),
            resource: resource,
            date: date,
            start: start, 
            end: end,
            status: "Future" // new bookings are future
        };

        // add new booking to the list
        bookings.push(newBooking);

        // save updated list into local Storage
        saveBookingForAdd(bookings);

        // go back to main oage
        window.location.href = "mainPage.html";
   
    });

}