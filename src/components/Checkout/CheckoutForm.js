import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./CheckoutForm.module.css";
import CartContext from "../../store/cart-context";
import useInput from "../Hooks/use-input";

const CheckoutForm = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const inputNotEmpty = (value) => value.trim() !== "";
  const emailValidation = value => value.includes("@");

  const {
    inputValue: firstNameValue,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    onChangeHandler: firstNameChangeHanlder,
    onBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(inputNotEmpty);

  const {
    inputValue: lastNameValue,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    onChangeHandler: lastNameChangeHanlder,
    onBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(inputNotEmpty);

    const {
      inputValue: emailValue,
      hasError: emailHasError,
      isValid: emailIsValid,
      onChangeHandler: emailChangeHanlder,
      onBlurHandler: emailBlurHandler,
      reset: resetEmail,
    } = useInput(emailValidation);

  // const firstNameClasses = firstNameHasError
  //   ? "form-control invalid"
  //   : "form-control";
//   const lastNameClasses = lastNameIsValid
//     ? classes["input-form"]
//     : classes["input-form invalid"];
  // const emailClasses = emailIsValid 
  //   ? classes["input-form"] 
  //   : classes["input-form invalid"];

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
      formIsValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(firstNameValue);
    console.log(lastNameValue);
    
    resetFirstName();
    resetLastName();
    resetEmail();
  }

  return (
    <Modal onClose={props.onClose}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.heading}>
          <span>Billing Information</span>
        </div>
        <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="first name"
            onBlur={firstNameBlurHandler}
            onChange={firstNameChangeHanlder}
            value={firstNameValue}
          />
          {firstNameHasError && (
            <p className={classes["error-text"]}>
              Please input a valid first name.
            </p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="last name"
            onBlur={lastNameBlurHandler}
            onChange={lastNameChangeHanlder}
            value={lastNameValue}
          />
          {lastNameHasError && (
            <p className={classes["error-text"]}>
              Please input a valid last name.
            </p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onBlur={emailBlurHandler}
            onChange={emailChangeHanlder}
            value={emailValue}
          />
          {emailHasError && (
            <p className={classes["error-text"]}>Please input a valid email.</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="street">Street</label>
          <input type="text" />
          <label htmlFor="city">City</label>
          <input type="text" />
          <label htmlFor="postal code">Postal Code</label>
          <input type="text" />
        </div>
        <div className={classes.total}>
          <span>Total: {totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className={classes.button}
            disabled={!formIsValid}
            onClick={props.onClose}
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutForm;

//on "order" button push, popup modal checkout form
//ensure it has all the fields needed with validation built-in
//console.log info for now, but will be sent to server
