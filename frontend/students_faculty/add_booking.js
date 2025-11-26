// store bookings in Local Storage
var BOOKINGS_KEY = "studentBookings";

// base URL for backend API
var API_BASE = "http://localhost:8000";

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

// load available resources based on selected category
function loadResourcesByCategory(category){
    var resourceSelect = document.getElementById("resource");

    // keep default option
    resourceSelect.innerHTML = '<option value="" disabled selected> Select a resource</option>';

    var endpoint = "";

    // figure out which endpoint to 
    if(category ==="labs"){
        endpoint = "/admin/labs";
    }
    else if(category ==="rooms"){
        endpoint = "/admin/rooms";
    }
    else if(category ==="equipment"){
        endpoint="/admin/equipment";
    }


    // fetch from backend
    fetch(API_BASE + endpoint)
    .then(function(res){return res.json();})// convert backend response into JS array
    .then(function(items){
        // reset dropdown
        resourceSelect.innerHTML = '<option value="" disabled selected>Select a resource</option>';
        // loop through all items and add all of them
        for(var i = 0; i< items.length; i++){
            var item = items[i];
            var opt = document.createElement("option");// create option tag for each
           
            // format value and text
            if(category === "labs"){
                opt.value = "Lab: " + item.name;
                opt.textContent = item.name + " (" + item.location + ")";
            }
            else if (category === "rooms"){
                opt.value = "Room: " + item.name;
                opt.textContent = item.name + " (" + item.location + ")";
            }
            else if(category === "equipment"){
                opt.value = "Equipment: " + item.name;
                opt.textContent = item.name + " (" + item.location + ")";
            }

            // if not available, disable
            if(item.available === 0 || item.available === false){
                opt.disabled = true;
                opt.className = "unavailable";
                opt.textContent = opt.textContent + " - UNAVAILABLE";
            }

            resourceSelect.appendChild(opt);
        }

        // if no items found at all 
        if(resourceSelect.options.length ===1){
            resourceSelect.innerHTML = '<option value"" disabled selected> No resources found</option>';
        }
    })// handle error 
    .catch(function(err){
        console.error("Error loading labs:", err);
        resourceSelect.innerHTML = '<option value"" disabled selected> Error loading resources </option>';
    });
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


    // when category changes, load resources for that category
    var categorySelect = this.document.getElementById("category");
    categorySelect.onchange =function(){
        var category = categorySelect.value;
        loadResourcesByCategory(category);
    }

    // get submit button
    var submitLink = document.getElementById("submit-booking");

    // add click event to submit button
    submitLink.addEventListener("click", function(event){
        event.preventDefault();// stop browser from going to main page directly, save data first
    
        // read values from form
        var category = document.getElementById("category").value;
        var resource = document.getElementById("resource").value;
        var date = document.getElementById("date").value;
        var start = document.getElementById("start").value;
        var end = document.getElementById("end").value;
    
        // simple validation to make sure fields are not empty
        if(!category || !resource || !date || !start || !end){
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
            status: "Future", // new bookings are future
            available: false
        };

        // function to check if chosen resource is a lab, room or equipment use string 
        if(resource.includes("Lab")){

            // PUT to labs booking API
            fetch(API_BASE + "/admin/labs", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBooking)
            })
            .then(function(res){ return res.json(); })
            .then(function(data){
                console.log("Lab booking saved:", data);
                
                // add new booking to the list
                bookings.push(newBooking);
                saveBookingForAdd(bookings);

                alert("Lab booking confirmed!");
                window.location.href = "mainPage.html";
            })
            .catch(function(err){
                console.error("Error saving lab booking:", err);
                alert("Failed to save lab booking");
            });
        }
        else if(resource.includes("Room")){
            
            // PUT to rooms booking API
            fetch(API_BASE + "/admin/rooms", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBooking)
            })
            .then(function(res){ return res.json(); })
            .then(function(data){
                console.log("Room booking saved:", data);

                // add new booking to the list
                bookings.push(newBooking);
                saveBookingForAdd(bookings);

                alert("Room booking confirmed!");
                window.location.href = "mainPage.html";
            })
            .catch(function(err){
                console.error("Error saving room booking:", err);
                alert("Failed to save room booking");
            });
        }
        else if(resource.includes("Equipment")){

            // PUT to equipment booking API
            fetch(API_BASE + "/admin/equipment", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBooking)
            })
            .then(function(res){ return res.json(); })
            .then(function(data){
                console.log("Equipment booking saved:", data);

                // add new booking to the list
                bookings.push(newBooking);
                saveBookingForAdd(bookings);
                
                alert("Equipment booking confirmed!");
                window.location.href = "mainPage.html";
            })
            .catch(function(err){
                console.error("Error saving equipment booking:", err);
                alert("Failed to save equipment booking");
            });
        }
    });
};