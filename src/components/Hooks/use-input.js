import {useState} from 'react';

const useInput = (validationFunction) => {
    const [inputValue, setInputValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validationFunction(inputValue);
    const hasError = !isValid && isTouched;

    const onChangeHandler = (event) => {
        setInputValue(event.target.value);
    };
    const onBlurHandler = () => {
        setIsTouched(true);
    }
    const reset = () => {
        setIsTouched(false);
        setInputValue("");
    };

    return {
        inputValue,
        hasError,
        isValid,
        onChangeHandler,
        onBlurHandler,
        reset
    }
};

export default useInput;