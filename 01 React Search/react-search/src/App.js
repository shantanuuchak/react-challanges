import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchTerm: "",
    };
  }

  getUsers = () => {
    axios
      .get(
        "https://gist.githubusercontent.com/anonymous/1295788c7bff052a1e8a/raw/6e109604c7a7f3efe77c8048bb2fe2f3e1cdcb7b/gistfile1.json"
      )
      .then((response) => {
        // handle success
        this.setState({ users: response.data.Reggae });
      });
  };

  componentDidMount = () => {
    this.getUsers();
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { users, searchTerm } = this.state;

    const filteredUsers = users.filter((user) =>
      user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="App">
        <Header />

        <h2>Search</h2>
        <input
          type="searchbox"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
          placeholder="Enter the search term"
        />

        {/* <List users={users} search={searchTerm}/> */}

        <ul>
          {filteredUsers.map((user, index) => (
            <li key={user + index}>{user}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
