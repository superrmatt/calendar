$(document).ready(function(e){

    /*
    * Global: holds value of todays date, as instance of Date()
    */
    today = new Date();

    /*
    * Globals: hold values of current month and current year, respectively.
    */
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();

    /*
    * Globals: selectors for year and month.
    */
    selectYear = document.getElementById("year");
    selectMonth = document.getElementById("month");
    
    /*
    * Global array of strings. Each value represents the shorthand version of a month
    */
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    /*
    * Global selector for month and year id
    */
    monthAndYear = document.getElementById("monthAndYear");
    buildCalendar(currentMonth, currentYear);
    
    /*
    * listener for next id. updates to show the next month on the calendar
    */
    $("#next").click(function(e) {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        buildCalendar(currentMonth, currentYear);
    });
    
    /*
    * listener for previous id. updates to show the previous month on the calendar
    */
    $("#previous").click(function(e) {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        buildCalendar(currentMonth, currentYear);
    });
    
    /*
    * listener for jump class. updates to show the selected month or year in dropdown menus.
    */
    $(".jump").on("change", function(e) {
        currentYear = parseInt(selectYear.value);
        currentMonth = parseInt(selectMonth.value);
        buildCalendar(currentMonth, currentYear);
    });
    
    /*
    * builds the calendae to display on screen
    * @arg: month: holds value for the current month to build the calendar around.
    * @arg: year: holds value for the current year to build the calendar around.
    */
    function buildCalendar(month, year) {
    
        let firstDay = (new Date(year, month)).getDay();
    
        //body of the calendar
        tbl = document.getElementById("calendar-body"); 
    
        //clearing all previous cells
        tbl.innerHTML = "";
    
        //filing data about month and in the page via DOM.
        monthAndYear.innerHTML = months[month] + " " + year;
        selectYear.value = year;
        selectMonth.value = month;
    
        //creating all cells
        let date = 1;
        for (let i = 0; i < 6; i++) {
            //creates a table row
            let row = document.createElement("tr");
    
            //creating individual cells, populating with data.
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    cell = document.createElement("td");
                    cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > daysInMonth(month, year)) {
                    break;
                }
    
                else {
                    cell = document.createElement("td");
                    cellText = document.createTextNode(date);
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("bg-info");
                    } 
                    //highlight today's date
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
    
    
            }
    
            //appending each row into calendar body.
            tbl.append(row); 
        }
    
    }
    
    /*
    * function determines how many days in a month.
    * @arg: month: holds value of the month to determine how many days
    * @arg: year: holds value of the year to determine how many days. This only actually matters for February in leap years.
    */
    function daysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    }
});