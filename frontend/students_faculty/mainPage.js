// store bookings in Local Storage
var BOOKINGS_KEY = "studentBookings";

// array that will hold all bookings in memory
var bookings = [];

// load existing bookings from local storage
function loadBookings(){
    var stored = localStorage.getItem(BOOKINGS_KEY);

    if(stored){
        // convert JSON string to JavaScript array
        bookings = JSON.parse(stored);
    }
    else{
        // if nothing saved yet, return empty list
        bookings =[];
    }
}

// saved updated booking list into local Storage
function saveBookings(){
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

// helper function chekcs if booking date is in the past
function isPastBooking(dateStr){
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1// 1-12
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

    var todayString = year + "-"+ month + "-" + day;

    // compare strings in yyy-mm-dd format
    return dateStr < todayString;
}
// display all bookings as rows inside table body
function renderBookings(){
    var tbody = document.getElementById("booking-body");

    // remove any old rows from table
    tbody.innerHTML = "";

    // update status past future for each booking
    for(var k=0; k< bookings.length; k++){
        if(isPastBooking(bookings[k].date)){
            bookings[k].status = "Past";
        }
        else{
            bookings[k].status = "Future";
        }
    }

    // save updated status 
    saveBookings();

    //if no bookings 
    if(bookings.length ===0){
        var emptyRow = document.createElement("tr");
        emptyRow.innerHTML = '<td colspan=5> No Bookings yet</td>';
        tbody.appendChild(emptyRow);
        return
    }

    // loop through each booking, create row for each one
    for(var i = 0; i< bookings.length; i++){
        var b = bookings[i];
        var row = document.createElement("tr");

        // build HTML for the row
        var html = "";

        // resource column
        html += "<td>" + b.resource + "</td>";

        // date column 
        html += "<td>" + b.date + "</td>";

        // time column
        html += "<td>" + b.start + " - " + b.end + "</td>";

        // status column
        html += "<td>" + b.status + "</td>";

        // disable checkbox for past bookings
        if(b.status ==="Past"){
            html += '<td> <input type="checkbox" disabled> </td>';
        }
        else{// can be selected for cancel
            html += '<td> <input type = "checkbox" class="select-booking" data-id="' + b.id + '"></td>';
        }

        // put html in row and add it to table
        row.innerHTML = html;
        tbody.appendChild(row);
    }
}

// remove bookings function
function setupCancelButton(){
    var btn = document.getElementById("cancel-selected");

    // when button clicked
    btn.addEventListener("click", function(){
        // confirm before cancelling
        var confirmDelete = confirm("Are you sure you want to cancel the selected bookings?");
        if(!confirmDelete){
            return;// user clicked cance;
        }


        // get all checkboxes
        var checkboxes = document.getElementsByClassName("select-booking");
        var idsToRemove = [];

        // go through all checkboxes and collect ids
        for(var i=0; i< checkboxes.length; i++){
            if(checkboxes[i].checked){
                var idStr = checkboxes[i].getAttribute("data-id");
                var idNum = parseInt(idStr);
                idsToRemove.push(idNum);
            }
        }

        // if nothing selected
        if(idsToRemove.length===0){
            alert("Please select at least one booking to cancel.");
            return;
        }

        // build new list of bookings without ones we want to remove
        var newList = [];
        for(var j=0; j< bookings.length; j++){
            var currentBooking = bookings[j];
            
            // never cancel past bookings
            if(currentBooking.status === "Past"){
                newList.push(currentBooking);
                continue;
            }


            var keep = true;
            // check if this booking's id is in idsToRemove
            for(var k=0; k< idsToRemove.length; k++){
                if(currentBooking.id === idsToRemove[k]){
                    keep = false; // do not keep 
                }
            }

            // if we can keep booking, send to new List
            if(keep) {
                newList.push(currentBooking);
            }
        }

        // replace old bookings list with new one
        bookings = newList;

        // save updated list to local storage
        saveBookings();

        // refresh tablle to show changes
        renderBookings();
    })
}

// run when page loads
window.onload = function(){
    loadBookings();
    renderBookings();
    setupCancelButton();
}