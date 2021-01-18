// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    // Initialize an array called changes to store the value and the id of the elements that changed 
    let change = d3.select(this)
    console.log(change)

    // 4b. Save the value that was changed as a variable.
    // Extract the value of the element that changed and store in a variable called changedValues
    let changedValue= change.property("value")
    console.log(changedValue)

    // 4c. Save the id of the filter that was changed as a variable.
    // Extract the id of the element that changed and store in an variable called idOfchangedValue
    let idOfchangedValue = change.attr("id")
    console.log(idOfchangedValue)
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (changedValue){
      filters[idOfchangedValue] = changedValue
    }
    else{
      delete filters[idOfchangedValue]
    }
 
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    
    let filterEntries = Object.entries(filters)
    for (var i = 0; i < filterEntries.length; i++){
      
      filterId = filterEntries[i][0]
      filterValue = filterEntries[i][1]

      filteredData = filteredData.filter(row => row[filterId] === filterValue);
     }
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData)
  }
  
  // 2. Attach an event to listen for changes to each filter
  // Select which input elements have changed on the html page and when they change, call function updateFilters
  d3.selectAll("input").on("change", updateFilters)
  
  
  // Build the table when the page loads
  buildTable(tableData);
