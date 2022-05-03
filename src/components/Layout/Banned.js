import React from 'react';

import classes from './Banned.module.css';
import spiderman from "../../assets/spiderman-thief.jpeg";

const Banned = () => {
  return (
    <section className={classes.banned}>
        <div>
          <h1 className={classes.h1}>Banned for life!</h1>
          <h3 className={classes.h3}>
            Spiderman caught stealing!
          </h3>
          <img
            className={classes.img}
            src={spiderman}
            alt="spiderman stealing"
          />
          <p>If you see Spiderman, please tell him we are slandering his name here. Thank you for cooperating.</p>
        </div>
    </section>
  );
}

export default Banned