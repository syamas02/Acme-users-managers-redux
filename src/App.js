import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Users from './Users';
import Managers from './Managers';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  loadUsers() {
    axios
      .get('/api/users')
      .then(response => response.data)
      .then(users => this.setState({ users }));
  }
  componentDidMount() {
    this.loadUsers();
  }
  findManagers() {}
  render() {
    const { users } = this.state;
    const _usersWithManagers = users.filter(user => user.managerId !== null);
    const managers = Array.from(
      new Set(
        _usersWithManagers.map(_userWithManager =>
          users.find(user => user.id === _userWithManager.managerId)
        )
      )
    );

    const renderNav = ({ location }) => {
      return <Nav path={location.pathname} users={users} managers={managers} />;
    };

    const renderUsers = () => {
      return <Users users={users} />;
    };

    const renderManagers = () => {
      return <Managers managers={managers} />;
    };
    return (
      <Router>
        <div>
          <Route render={renderNav} />
          <Route path="/users" render={renderUsers} users={users} />
          <Route path="/managers" render={renderManagers} managers={managers} />
        </div>
      </Router>
    );
  }
}
