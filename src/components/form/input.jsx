import React, { Component } from "react";

class FormInput extends Component {
  isInputValid = (error, id) => {
    if (error[id]) {
      return false;
    }
    return true;
  };
  render() {
    const { id, type, onChange, value, labelText, error, ...restprops } =
      this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <input
          {...restprops}
          value={value}
          onChange={onChange}
          type={type}
          className={
            this.isInputValid(error, id)
              ? "form-control"
              : "form-control is-invalid"
          }
          id={id}
        />
        <small className="invalid-feedback">{error[id]}</small>
      </div>
    );
  }
}

export default FormInput;
