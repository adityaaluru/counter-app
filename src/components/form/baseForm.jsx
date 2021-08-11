import { Component } from "react";
import Joi from "joi-browser";

/*******
 * Any form that extends the BaseForm is expected to implement the following:
 * a. Make available a state with 'data' and 'errors' as the top level elements in it
 * b. Provide a schema object with Joi validation for every element of 'data'
 * c. Provide a flat structure for the data (the base form will be enhanced later to support nested structures)
 * d. Initialize 'errors' with a blank object
 * e. Implement a doSubmit() function which actually submits the form data (this.state.data) to any remote service
 * f. Implement the render() function which provides a JSX component
 *
 * The BaseForm provides the following functions to be used by the form extending the BaseForm
 * a. isSubmitDisabled() - validates the entire form data and provide a boolean result which controls whether the submit button is ready to submit
 * b. validateForm() - validates the entire form data. Expects the form data to be in 'this.state.data' and the schema to be in 'this.schema'
 * c. validateInput() - validates individual input value (usually triggered with onChange event on any input).
 */

class BaseForm extends Component {
  // Utility functions

  isSubmitDisabled = () => {
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

    const options = { abortEarly: false, allowUnknown: true };
    const validationResult = Joi.validate(
      this.state.data,
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

  handleSubmit = (e) => {
    e.preventDefault();

    //validate form on submit
    let errors = this.validateForm();

    if (errors == null) {
      errors = {};
    }

    this.setState({ errors });
    this.doSubmit();
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    this.validateInput(e.currentTarget.id, e.currentTarget.value, errors);

    const data = { ...this.state.data };
    data[e.currentTarget.id] = e.currentTarget.value;

    this.setState({ data, errors });
  };
}

export default BaseForm;
