import classes from "./PageIntro.module.css";


const PageIntro = props => {
    return (
      <section className={classes.summary}>
        <h2>
          The Food Heroes Love
        </h2>
        <p>
          Choose your favorite meal from our selection of superhero-friendly
          meals.
        </p>
        <p>
          All our meals are cooked by experienced kitchen <em>chefs</em>!
        </p>
        <p>We're seriously not villains at all.</p>
      </section>
    );
};

export default PageIntro;