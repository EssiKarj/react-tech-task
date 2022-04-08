import '../AdditionalFiles/App.css';
import * as React from "react";

//This is the API url to fetch from
const API_URL = 'https://matchesfashion.com/api/products';
const TAX_RATE = 0.08;

function YourSolution() {
  //Variable to store international number formatter
  const internationalNumberFormat = new Intl.NumberFormat('en-US')
  //State that stores products array from API
  const [items, setItems] = React.useState([])

  //State that stores current page number
  const [currentPage, setCurrentPage] = React.useState(0)

  //State that stores booleans to disable buttons
  const [disableButton, setDisableButton] = React.useState({
    firstPage: true,
    lastPage: false
  })

  //Function that uses fetch to get data from API
  //Converts response from API to a JSON format
  //Stores products array from data object to items state
  const getData = async () => {
    await fetch(`${API_URL}/page=${currentPage}`)
      .then(response => response.json())
      .then(data => setItems(data.products))

  }

  //Function that calculates profit for each product order that also subtracts 0.08% tax from orders after 10 items.
  //Returns profit value with 2 decimals in international number format (e.g. 1924.234539 ~ 1,924.23)
  const calculateProfit = (quantity, retailPrice, cost) => {
    let profitPerItem = retailPrice - cost
    let profit
    const taxMultiplier = 1 - TAX_RATE

    if (quantity > 10) {
      profit = profitPerItem * 10
      profit += (quantity - 10) * profitPerItem * taxMultiplier
    } else {
      profit = profitPerItem * quantity
    }

    return internationalNumberFormat.format(profit.toFixed(2))
  }

  //useEffect that executes getData function each time currentPage state is updated
  React.useEffect(() => {
    getData()
  }, [currentPage])

  //Function that sets currentPage to first page and sets disableButton state's firstPage value to true
  const handleFirstPage = () => {
    setCurrentPage(0)
    setDisableButton({ firstPage: true, lastPage: false })
  }
  //Function that sets currentPage to last page and sets disableButton state's lastPage value to true
  const handleLastPage = () => {
    setCurrentPage(4)
    setDisableButton({ firstPage: false, lastPage: true })
  }

  //Function that handles changing of pages that is attached to click event on each button
  const handlePageChange = (e) => {

    //Conditions that check if the button clicked is First or Last and if true, executes handleFirstPage or handleLastPage function
    if (e.target.value === 'first') {
      handleFirstPage()
    } else if (e.target.value === 'last') {
      handleLastPage()
    }

    //Conditions that handle Previous button click events
    //First condition to check if the current page index is 1 which if true, executes handleFirstPage function
    //Second condition to handle page changes between page index 1 and 4 by setting currentPage value decreased by one and setting disableButton state's values to false
    if (e.target.value === 'previous' && currentPage === 1) {
      handleFirstPage()
    } else if (e.target.value === 'previous') {
      setCurrentPage(currentPage - 1)
      setDisableButton({ firstPage: false, lastPage: false })
    }


    //Conditions that handle Next button click events
    //First condition to check if the current page index is 3 which if true, executes handleLastPage function
    //Second condition to handle page changes between page index 0 and 3 by setting currentPage value increased by one and setting disableButton state's values to false
    if (e.target.value === 'next' && currentPage === 3) {
      handleLastPage()
    } else if (e.target.value === 'next') {
      setCurrentPage(currentPage + 1)
      setDisableButton({ firstPage: false, lastPage: false })
    }

  }

  return (
    <div className="App">
      <table id="products">
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Quantity Sold</th>
            <th>Sold Price</th>
            <th>Cost To Business</th>
            <th>Profit After Tax</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.brand}</td>
                <td>{item.name}</td>
                <td>{internationalNumberFormat.format(item.quantitySold)}</td>
                <td>£{internationalNumberFormat.format(item.soldPrice)}</td>
                <td>£{internationalNumberFormat.format(item.costToBusiness)}</td>
                <td>£{calculateProfit(item.quantitySold, item.soldPrice, item.costToBusiness)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button
        value='first'
        disabled={disableButton.firstPage}
        onClick={(e) => handlePageChange(e)}>
        First Page
      </button>

      <button
        value='previous'
        disabled={disableButton.firstPage}
        onClick={(e) => handlePageChange(e)}>
        Previous Page
      </button>

      <h2>Page {currentPage + 1}</h2>

      <button
        value='next'
        disabled={disableButton.lastPage}
        onClick={(e) => handlePageChange(e)}>
        Next Page
      </button>

      <button
        value='last'
        disabled={disableButton.lastPage}
        onClick={(e) => handlePageChange(e)}>
        Last Page
      </button>
    </div>
  );
}

export default YourSolution;
