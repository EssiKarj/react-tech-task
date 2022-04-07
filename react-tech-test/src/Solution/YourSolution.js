import '../AdditionalFiles/App.css';
import * as React from "react";

//This is the API url to fetch from
//const API_URL = 'https://matchesfashion.com/api/products';
//const TAX_RATE = 0.08;

function YourSolution() {
  //State to store page number
  const [currentPage, setCurrentPage] = React.useState(0)

  //State to store booleans to diable buttons
  const [disableButton, setDisableButton] = React.useState({
    firstPage: true,
    lastPage: false
  })

  //Function that handles first page
  const handleFirstPage = () => {
    setCurrentPage(0)
    setDisableButton({ firstPage: true, lastPage: false })
  }
  //Function that handles last page
  const handleLastPage = () => {
    setCurrentPage(4)
    setDisableButton({ firstPage: false, lastPage: true })
  }

  //Function that handles changing pages
  const handlePageChange = (e) => {

    if (e.target.value === 'first') {
      handleFirstPage()
    } else if (e.target.value === 'last') {
      handleLastPage()
    }

    if (e.target.value === 'previous' && currentPage === 1) {
      handleFirstPage()
    } else if (e.target.value === 'previous') {
      setCurrentPage(currentPage - 1)
      setDisableButton({ firstPage: false, lastPage: false })
    }

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
          </tr>
        </thead>
        <tbody>
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
