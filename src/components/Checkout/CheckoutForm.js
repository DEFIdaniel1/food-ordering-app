import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./CheckoutForm.module.css";
import CartContext from "../../store/cart-context";
import useInput from "../Hooks/use-input";

const CheckoutForm = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const inputNotEmpty = (value) => value.trim() !== "";
  const emailValidation = value => value.includes("@");
  const postalCodeValidation = (value) =>
    value.trim().length === 6 || value.trim().length === 7;

  const {
    inputValue: firstNameValue,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    onChangeHandler: firstNameChangeHanlder,
    onBlurHandler: firstNameBlurHandler,
  } = useInput(inputNotEmpty);

  const {
    inputValue: lastNameValue,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    onChangeHandler: lastNameChangeHanlder,
    onBlurHandler: lastNameBlurHandler,
  } = useInput(inputNotEmpty);

  const {
    inputValue: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    onChangeHandler: emailChangeHanlder,
    onBlurHandler: emailBlurHandler,
  } = useInput(emailValidation);

  const {
    inputValue: streetValue,
    hasError: streetHasError,
    isValid: streetIsValid,
    onChangeHandler: streetChangeHanlder,
    onBlurHandler: streetBlurHandler,
  } = useInput(inputNotEmpty);

  const {
    inputValue: cityValue,
    hasError: cityHasError,
    isValid: cityIsValid,
    onChangeHandler: cityChangeHanlder,
    onBlurHandler: cityBlurHandler,
  } = useInput(inputNotEmpty);  
  
  const {
    inputValue: postalCodeValue,
    hasError: postalCodeHasError,
    isValid: postalCodeIsValid,
    onChangeHandler: postalCodeChangeHanlder,
    onBlurHandler: postalCodeBlurHandler,
  } = useInput(postalCodeValidation);          

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid && streetIsValid && cityIsValid && postalCodeIsValid) {
      formIsValid = true;
  }

  const httpFormPost = async() => {
    setIsSubmitting(true);
    setHttpError(null);
    const userData = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            street: streetValue,
            city: cityValue,
            postalCode: postalCodeValue
    }


    try {
      const response = await fetch(
        "https://react-http-89657-default-rtdb.firebaseio.com/SMorders.json",
        {
          method: "POST",
          body: JSON.stringify({
            userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error ("Sorry... Something went wrong.")
      }
    }
    catch (error) {
      setHttpError(error.message);
    }

    cartCtx.clearCart();
    setIsSubmitting(false);
    setDidSubmit(true);
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    if(!formIsValid) {
      return;
    }

    httpFormPost();
  }

  const checkoutContent = (
    <>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.heading}>
          <span>Billing Information</span>
        </div>
        <div
          className={`${classes.control} ${
            firstNameHasError ? classes.invalid : ""
          }`}
        >
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
        <div
          className={`${classes.control} ${
            lastNameHasError ? classes.invalid : ""
          }`}
        >
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
        <div
          className={`${classes.control} ${
            emailHasError ? classes.invalid : ""
          }`}
        >
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
        <div
          className={`${classes.control} ${
            streetHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            onBlur={streetBlurHandler}
            onChange={streetChangeHanlder}
            value={streetValue}
          />
          {streetHasError && (
            <p className={classes["error-text"]}>
              Please input a valid street name.
            </p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            cityHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            onBlur={cityBlurHandler}
            onChange={cityChangeHanlder}
            value={cityValue}
          />
          {cityHasError && (
            <p className={classes["error-text"]}>Please enter a city name.</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            postalCodeHasError ? classes.invalid : ""
          }`}
        >
          {" "}
          <label htmlFor="postal code">Postal Code</label>
          <input
            type="text"
            id="postal code"
            onBlur={postalCodeBlurHandler}
            onChange={postalCodeChangeHanlder}
            value={postalCodeValue}
          />
          {postalCodeHasError && (
            <p className={classes["error-text"]}>
              Please input a valid postal code.
            </p>
          )}
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
            // onClick={props.onClose}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );

  const submittingContent = (
    <p className={classes.heading}>Sending order data...</p>
  );

  const didSubmitContnet = (
    <div className={classes.actions}>
      <p className={classes.heading}>Your order has been received!</p>
      <button className={classes.button} onClick={props.onClose}>Okay!</button>
    </div>
  );

  const errorContent = (
    <p className={`${classes["error-text"]} + ${classes.heading}`}>
      {httpError}
    </p>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !httpError && checkoutContent}
      {isSubmitting && !httpError && submittingContent}
      {!isSubmitting && didSubmit && !httpError && didSubmitContnet}
      {httpError && errorContent}
    </Modal>
  );
};

export default CheckoutForm;

//on "order" button push, popup modal checkout form
//ensure it has all the fields needed with validation built-in
//console.log info for now, but will be sent to server
