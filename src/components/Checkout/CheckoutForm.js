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

  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
//   const lastNameClasses = lastNameIsValid
//     ? classes["input-form"]
//     : classes["input-form invalid"];
  const emailClasses = emailIsValid 
    ? classes["input-form"] 
    : classes["input-form invalid"];

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
        <form onSubmit={submitFormHandler}>
          <div className={firstNameClasses}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
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
          <div className="form-control">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
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
          <div className={emailClasses}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onBlur={emailBlurHandler}
              onChange={emailChangeHanlder}
              value={emailValue}
            />
            {emailHasError && (
              <p className={classes["error-text"]}>
                Please input a valid email.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="address">Billing Address</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="creditCard">Credit Card Number</label>
            <input type="text" />
          </div>
          <button disabled={!formIsValid} onClick={props.onClose}>Submit</button>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
        </form>
    </Modal>
  );
};

export default CheckoutForm;

//on "order" button push, popup modal checkout form
//ensure it has all the fields needed with validation built-in
//console.log info for now, but will be sent to server
