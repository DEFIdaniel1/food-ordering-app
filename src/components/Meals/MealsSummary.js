import classes from './MealsSummary.module.css';


const MealsSummary = props => {
    return (
      <section className={classes.summary}>
        <h2>Food for the Heroes We Deserve</h2>
        <p>
          Choose your favorite meal from our broad 
          selection of available superhero friendly meals.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced kitchen heroes!
        </p>
      </section>
    );
};


export default MealsSummary;