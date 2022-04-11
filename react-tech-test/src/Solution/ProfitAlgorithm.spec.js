import { products } from "../AdditionalFiles/mockData";
import { calculateProfit } from "./YourSolution";
// You can use this calculateProfit function as a way of testing your algorithm,
// just put your implementation in and the tests will pass if it is correct.

// To run the test, call "npm run test" in the terminal.
describe('Tax Calculation', () => {
  it('calculates the correct amount of tax when product is under tax threshold', () => {
    const possibleAnswers = ['16384.464', '£16,384.464', '£16,384.46', '£16384.46', '£16384.464', '16,384.46', 16384.464, 16384.46];

    expect(possibleAnswers).toContain(calculateProfit(products[0].quantitySold, products[0].soldPrice, products[0].costToBusiness))
  })

  it('calculates the correct amount of tax when product is over tax threshold', () => {
    const possibleAnswers = ['833.54', '£833.54', 833.54];

    expect(possibleAnswers).toContain(calculateProfit(products[36].quantitySold, products[36].soldPrice, products[36].costToBusiness))
  })

})
