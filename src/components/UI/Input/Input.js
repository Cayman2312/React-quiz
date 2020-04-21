import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
  const inputType = props.type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && touched && shouldValidate;
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
        autoComplete="on"
      ></input>
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Введите корректное значение'}</span>
      ) : null}
    </div>
  );
};

export default Input;
