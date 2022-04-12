import React from 'react';

import heroFoodImage from '../../assets/wonder-fries.jpeg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return (
      <>
        <header className={classes.header}>
          <h1>Super Meals!</h1>
          <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
          <img src={heroFoodImage} alt="superhero food" />
        </div>
      </>
    );
};

export default Header; 