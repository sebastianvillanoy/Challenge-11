 // import the data from data.js
 // note that tableData is an array of objects
const tableData = data;

// Reference the HTML table using d3
// Declare a variable, tbody and use d3.select to tell JavaScript to look for the <tbody> tags in the HTML
var tbody = d3.select("tbody");


function buildTable(data) {
   // find the <tbody> tag in the html file and clear the data under it which is the table 
    tbody.html("");
    data.forEach((dataRow)=> {
        // find the <tbody> tag within the html file and add a table row tag ("tr"). 
        // we are essentially, appending a row to the table body 
        let row = tbody.append("tr");
        // Object.values() takes in the object dataRow and returns an array of values contained in the dataRow object (aka. the values corresponding to the keys date, city, state, etc.)
        // the val in .forEach(val => ...) references every value in the aformentioned array 
        // we are essentially looping through each field in the dataRow and adding each value as a table cell
        Object.values(dataRow).forEach((val) => {
            // append the table data tag
            let cell = row.append("td");
            // Extract the text of val and add it to the table cell
            cell.text(val);

        });
    })
}

function handleClick() {

    // Find the html tag with the id called datetime, extract the date value nested in it and store in variable called date
    let date = d3.select("#datetime").property("value");
    // Set the original unfiltered table as the default value of the filetredData variable
    // Note that tableData is an array of objects 
    let filteredData = tableData;
    // Check to see if a date was entered and filter the data using using that date 
    if (date) {
        // Apply `filter` to the table data to only keep the rows where the `datetime` value matches the filter value
        // .filter() iterates through every object in filteredData (aka. a table row), accesses the value associated with the datetime key, then checks for equality with variable date
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    // Rebuild the table using the filtered data 
    // @NOTE: If no date was entered, then filteredData wil just be the original tableData.
    buildTable(filteredData)
}


// Attach an event to listen for the form button

// Select the html tag with the filter-button id
// tell D3 to execute handleClick() function when the button with an id of filter-btn is clicked. 
d3.selectAll("#filter-btn").on("click", handleClick);


// Call the buildTable function for viewers to view original table as page loads 
buildTable(tableData);