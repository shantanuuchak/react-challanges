import axios from "axios";
import React, { Component } from "react";
// import "./App.css";

class App extends Component {
  state = {
    countries: [],
    searchTerm: ''
  }

  fetchCountries = () => {
    axios.get('https://cdn.jsdelivr.net/gh/mledoze/countries@master/countries.json').then((response) => {
      this.setState({ countries: response.data })
      console.log(response.data)
    })
  }
  
  componentDidMount(){
    this.fetchCountries();
  }

  searchHandler = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const {countries, searchTerm} = this.state;

    const filteredCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <div className="App">
        <h1>Working</h1>
        <input type="search" placeholder="search" value={searchTerm} onChange={this.searchHandler} />
        
        <ul>
        {filteredCountries.map((country) => {
          return <li key={country.name.common}>{country.name.official}</li>
        })}
        </ul>
      </div>
    );
  }
}

export default App;
