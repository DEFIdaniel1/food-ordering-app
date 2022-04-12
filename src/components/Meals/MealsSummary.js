import classes from './MealsSummary.module.css';


const MealsSummary = props => {
    return (
      <section className={classes.summary}>
        <h2>Food for the Heroes We Deserve</h2>
        <p>
          Choose your favorite meal from our  
          selection of superhero-friendly meals.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients 
          by experienced kitchen heroes!
        </p>
      </section>
    );
};


export default MealsSummary;