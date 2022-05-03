import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div class={classes.footer}>
      <div className={classes.left}>
        <h4>Location:</h4>
        <p>Nice try, Superman! </p>
      </div>
      <div className={classes.center}>
        <h4>Contact Us:</h4>
        <p>takeYourMoney@supervillains.com</p>
      </div>
      <div className={classes.right}>
        <h4>Disclaimer:</h4>
        <p>
          We are actually superVillains. All food is full of transfatty things
          will make your life shorter. Yes, it's part of our superPlan (TM
          pending).
        </p>
      </div>
    </div>
  );
};

export default Footer;
