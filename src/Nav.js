import React from 'react';
import { Link } from 'react-router-dom';

export default ({ users, managers, path }) => {
  const isSelected = _path => _path === path;

  return (
    <ul>
      <li className={isSelected('/users') ? 'selected' : ''}>
        <Link to="/users"> Users ({users.length}) </Link>
      </li>
      <li className={isSelected('/managers') ? 'selected' : ''}>
        <Link to="/managers"> Managers ({managers.length}) </Link>
      </li>
      <li className={isSelected('/users/create') ? 'selected' : ''}>
        <Link to="/users/create"> Users Create </Link>
      </li>
    </ul>
  );
};
