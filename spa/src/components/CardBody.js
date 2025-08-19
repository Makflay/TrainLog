import { useState, useEffect } from 'react';
import Card from './Card';
import createDay from '../api/createDay';
import getDayExercise from '../api/getDayExercise';

function CardBody() {
  const [week, setWeek] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDayExercise();
        console.log('useEffect data', data)
        console.log('useEffect data.days', data.days.length)
        setWeek(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching week:', err);
      }
    }
    fetchData()
  }, []);

  const addCard = async () => {
    if (week.days.length < 7) {
      await createDay("New Day", "Muscle Group");
      const data = await getDayExercise();
      setWeek(data);
    }
  };

  const removeCard = (index) => {
    //req delete!
    setWeek(week.days.filter((_, i) => i !== index));
  };

  const editCard = (index, newData) => {
    const updated = [...week];
    updated[index] = { ...updated[index], ...newData };
    setWeek(updated);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {week.days.map((card) => (
        <Card
          key={card._id}
          data={card}
          onRemove={() => removeCard(card._id)}
          onUpdate={(newData) => editCard(card._id, newData)}
        />
      ))}
      <button onClick={addCard}>Add Day(max 7)</button>
    </div>
  );
};

export default CardBody;