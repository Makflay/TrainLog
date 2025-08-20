import { useState, useEffect } from 'react';
import style from './ui/CardBody.module.css';
import editButton from './ui/SubmitButton.module.css';
import container from './ui/CardBodyContainer.module.css';
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
        console.log('data', data)
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
      const newDay = await createDay('New Day', 'Muscle Group');
      setWeek(prevWeek => ({
        ...prevWeek,
        days: [...prevWeek.days, newDay]
      }));
    }
  };

  const removeCard = async (id) => {
    const {dayId: deletedId} = await deleteDay(id);
    setWeek(prevWeek => ({
    ...prevWeek,
    days: prevWeek.days.filter(day => day._id !== deletedId)
  }));
  };

  const editCard = async (id, newData) => {
    const updatedDay = await updateDay(id, newData);
    setWeek(prevWeek => ({
      ...prevWeek,
      days: prevWeek.days.map(el =>
        el._id === id
          ? { ...el, ...updatedDay }
          : el
      )
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={container.container}>
      <div className={style.container}>
        {week.days.map((card) => (
          <Card
            key={card._id}
            data={card}
            onRemove={() => removeCard(card._id)}
            onUpdate={(newData) => editCard(card._id, newData)}
            setWeek={setWeek}
          />
        ))}
      </div>
      <button onClick={addCard} className={editButton.submit}>Add Day(max 7)</button>
    </div>

  );
};

export default CardBody;