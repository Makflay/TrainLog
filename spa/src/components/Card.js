import React from 'react';

function Card({ data, onRemove }) {
  return (
    <div>

      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default Card;