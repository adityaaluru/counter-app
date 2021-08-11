import React, { Component } from "react";

class FormInputDropdown extends Component {
  isInputValid = (error, id) => {
    if (error[id]) {
      return false;
    }
    return true;
  };
  render() {
    const { id, enums, onChange, labelText, value } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <select
          className="form-control"
          id={id}
          onChange={onChange}
          value={value}
        >
          {enums.map((item) => (
            <option key={item._id}>{item.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default FormInputDropdown;
