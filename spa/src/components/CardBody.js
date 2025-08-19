import { useState, useEffect } from 'react';
import Card from './Card';
import createDay from '../api/createDay';
import getDayExercise from '../api/getDayExercise';
import deleteDay from '../api/deleteDay';
import updateDay from '../api/updateDay';

function CardBody() {
  const [week, setWeek] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDayExercise();
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

  const removeCard = async (id) => {
    await deleteDay(id);
    const data = await getDayExercise();
    setWeek(data);
  };

  const editCard = async (id, newData) => {
    await updateDay(id, newData);
    const data = await getDayExercise();
    setWeek(data);

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