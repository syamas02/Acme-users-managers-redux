import React from 'react';

export default ({ managers }) => {
  return (
    <ul>
      {managers.map(manager => {
        return <li key={manager.id}>{manager.name}</li>;
      })}
    </ul>
  );
};
