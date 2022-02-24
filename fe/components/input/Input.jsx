import React from 'react';
const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      name={props.name}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
      className={props.customStyle ? props.customStyle : null}
    />
  );
};

export default Input;
