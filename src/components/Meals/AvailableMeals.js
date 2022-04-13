import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
   
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Raw fish for your fingers. Fresh from Aquaman.',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'Hydra\'s favorite. Eat with caution.',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'All-American. Captain America approves.',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Green and healthy. Hulk like.',
    price: 18.99,
  },
];


const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;