# [![JDLT](https://jdlt.co.uk/jdlt_500px_light.png "JDLT")](https://jdlt.co.uk) full-stack developer challenge

## Brief

**Please demonstrate:**
* Selecting suppliers and products in drop-downs
* A round-trip to a server pulling back prices
* Displaying the returned data in the grid
* Anything else you'd like to show us or ideas you have 🤔

---

## Installation

* Clone or download the Repository
* From the project root folder, enter the following commands into the terminal:

```
<!-- Install all the packages listed in the package.json: -->
$ yarn
<!-- Build the Mongo Database from the seeds file -->
$ yarn seed
<!-- Run the front-end: -->
$ yarn start:front
<!-- Run the back-end: -->
$ yarn start:back
```

## Technologies Use

* MongoDB
* Express
* React
* Node.js
* Axios
* SCSS
* Mocha
* Chai
* Robo 3T

## Website Discussions

### Overview

The website presents a list of wongles from two different suppliers and allows users to filter the product list by supplier, product name and min/max price. It is a full-stack app, written using Node.js, with Express on the back-end and React on the front-end.

### Back-End Details

* Two models: Supplier and Product
* API built from seeds file where sample data is inputted
* Mocha and Chai used for testing of both Supplier and Product index controllers. Use ```yarn run test``` to make sure that the 12 tests in total all pass.

### Sample Data

| Supplier    | Product      | Price (£) |
| ------------|--------------|-----------|
| New Co Ltd  | Small wongle | 5         |
| New Co Ltd  | Large wongle | 8         |
| New Co Ltd  | Super wongle | 12        |
| Old Co Ltd  | Mini wongle  | 4         |
| Old Co Ltd  | Small wongle | 6         |
| Old Co Ltd  | Large wongle | 9         |
| Old Co Ltd  | Super wongle | 13        |

### Front-End Details

* HTTP requests to the server made using axios and rendered on the page using React
* Data presented in a table and filtered using Supplier, Product and Min/Max Price inputs.
* Supplier and Product dropdowns instantaneously update in line with parameters being set in the other inputs, prior to clicking the search button. For example, if a price of £10 is entered into the minimum price input, only the Super wongle is available to choose from the Product dropdown.
* Styling using SCSS and Flexbox for layout

## Reflections

### Wins

* Controllers passing all tests
* Dropdowns instantaneously update in line with the parameters set in the other inputs
* Page styling is mobile-responsive
* Having fun building the app and learning some new things along the way

### Challenges

* Learning that in order to populate the products with their supplier details (i.e. the supplier name as well as just the ID), the supplier model also requires an index controller, regardless of whether the front-end explicitly makes any HTTP requests to the suppliers route.
* Building out the logic that enables the Supplier and Product dropdowns to update upon other input parameters being set, before the Search button is clicked, was the biggest challenge of the project. In particular, programming the dropdowns so that they reflect the minimum and maximum price inputs was a challenge. The functionality works by checking the values after an onBlur event away from min/max price inputs. If a specific supplier or product has already been chosen which is then outside of the given price range, this input defaults back to 'All'.

### Future Features

If this project was to be taken forward further, the following features could be added in next:
* When a price range is given that invalidates a chosen Supplier or Product input, provide a message and/or highlight the invalid input, to inform the user that there were no products within their price range and therefore the parameter has defaulted back to "All".
* Add product and supplier show pages
* A range slider for the min/max price
* Ability for suppliers to register, login and add new products to their listing