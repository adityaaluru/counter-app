import React, { Component } from "react";
import FormInput from "./form/input";
import Joi from "joi-browser";

class RegisterUserForm extends Component {
  // Example code for creating references
  userId = React.createRef();
  password = React.createRef();

  state = {
    account: {
      userId: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    userId: Joi.string().email().required().label("User id"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().min(3).label("User name"),
  };

  // Utility functions

  isSubmitDisabled = () => {
    //validate form data
    let errors = this.validateForm();

    if (errors == null) {
      return false;
    } else {
      return true;
    }
  };

  // Validation functions

  validateForm = () => {
    const errors = {};

    const options = { abortEarly: false };
    const validationResult = Joi.validate(
      this.state.account,
      this.schema,
      options
    );
    if (validationResult.error != null) {
      for (let item of validationResult.error.details) {
        errors[item.context.key] = item.message;
      }
      return errors;
    } else {
      return null;
    }
  };

  validateInput = (name, value, errors) => {
    let foundErrs = false;
    if (this.schema[name]) {
      const validationResult = Joi.validate(value, this.schema[name]);
      if (validationResult.error != null) {
        for (let item of validationResult.error.details) {
          errors[name] = item.message;
          foundErrs = true;
        }
      }
    }
    if (!foundErrs) {
      delete errors[name];
    }
  };

  // Event handler functions

  handleSubmit = (e) => {
    e.preventDefault();

    //validate form on submit
    let errors = this.validateForm();

    if (errors == null) {
      errors = {};
    }

    this.setState({ errors });

    //Access DOM elements using Ref
    //console.log(this.userId.current.value);
    //console.log(this.password.current.value);
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    this.validateInput(e.currentTarget.id, e.currentTarget.value, errors);

    const account = { ...this.state.account };
    account[e.currentTarget.id] = e.currentTarget.value;

    this.setState({ account, errors });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            id="userId"
            type="text"
            autoFocus
            onChange={this.handleChange}
            value={this.state.account.userId}
            labelText="User ID"
            error={this.state.errors}
          />
          <FormInput
            id="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.account.password}
            labelText="Password"
            error={this.state.errors}
          />
          <FormInput
            id="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.account.name}
            labelText="Name"
            error={this.state.errors}
          />
          <button
            disabled={this.isSubmitDisabled()}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterUserForm;
