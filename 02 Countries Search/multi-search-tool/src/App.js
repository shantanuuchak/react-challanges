import axios from "axios";
import React, { Component } from "react";
// import "./App.css";

class App extends Component {
  state = {
    countries: [],
    searchCountry: "",
    searchCapital: "",
  };

  fetchCountries = () => {
    axios
      .get(
        "https://cdn.jsdelivr.net/gh/mledoze/countries@master/countries.json"
      )
      .then((response) => {
        this.setState({ countries: response.data });
      });
  };

  componentDidMount() {
    this.fetchCountries();
  }

  searchByCountryHandler = (event) => {
    this.setState({ searchCountry: event.target.value });
  };

  searchByCapitalHandler = (event) => {
    this.setState({ searchCapital: event.target.value });
  };



  render() {
    const { countries, searchCountry, searchCapital } = this.state;

    const countriesArray = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchCountry.toLowerCase());
    });

    const capitalArray = countries.filter((country) => {
      return country.capital[0].toLowerCase().includes(searchCapital.toLowerCase());
    });

    const filteredCountries = [...countriesArray, ...capitalArray];

    return (
      <div className="App">
        <h1>Working</h1>

        <input
          type="search"
          placeholder="Country"
          value={searchCountry}
          onChange={this.searchByCountryHandler}
        />

        <input
          type="search"
          placeholder="Capital"
          value={searchCapital}
          onChange={this.searchByCapitalHandler}
        />

        <ul>
          {filteredCountries.map((country) => {
            return (
              <li key={country.name.common}>
                Country: {country.name.official} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                Capital: {country.capital[0]}
              </li>
            );
          })}
        </ul>

      </div>
    );
  }
}

export default App;
