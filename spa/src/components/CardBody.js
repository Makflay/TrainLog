import { useState } from 'react';
import Card from './Card';

function CardBody() {
  const [week, setWeek] = useState([]);

  const addCard = () => {
    if (week.length < 7) {
      setWeek([...week, { day: "New Day", muscles: "Muscle Group", exercises: [] }]);
    }
  };

  const removeCard = (index) => {
    setWeek(week.filter((_, i) => i !== index));
  };

  return (
    <div>
      {week.map((card, index) => (
        <Card key={index} data={card} onRemove={() => removeCard(index)} />
      ))}
      <button onClick={addCard}>+ Add Day</button>
    </div>
  );
};

export default CardBody;