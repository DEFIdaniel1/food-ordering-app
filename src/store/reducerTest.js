import {useReducer} from 'react';

const initialState = {
    initialCount: 0
}; 

const reducerFn = (state, action) => { //action is dispatch function
    switch (action.type) {
        case 'increment':
            return {initialCount: state.initialCount + action.value}
            //returns newState value
        case 'decrement':
            return {initialCount: state.initialCount - action.value}
        default:
            return state;
    }
};//function output becomes new "count" state in useReducer function

const Counter = () => {
    const [count, dispatch] = useReducer(reducerFn, initialState);

    const addOne = () => {
        dispatch({type: 'increment', value: 1})
    };
    const subtractOne = () => {
      dispatch({ type: "decrement", value: 1 });
        };
    const addFive = () => {
        dispatch({ type: "increment", value: 5 });
    };
    const subtractFive = () => {
        dispatch({ type: "decrement", value: 5 });
    };
    const reset = () => {
        dispatch({type: 'reset', value: 0});
    };


    return (
      <div>
        <button onClick={addOne}>Increment</button>
        <button onClick={subtractOne}>Decrement</button>
        <span>{count}</span>
        <button onClick={reset}>Reset</button>
        <button onClick={addFive}>Increment 5</button>
        <button onClick={subtractFive}>Decrement 5</button>
      </div>
    );
};

export default Counter;