import React from 'react';

export default ({ users }) => {
  return (
    <ul>
      {users.map(user => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </ul>
  );
};
