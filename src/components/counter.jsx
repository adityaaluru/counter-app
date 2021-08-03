import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={this.incrementCounter}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={this.decrementCounter}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.disableCheck()}
          >
            -
          </button>
          <button
            onClick={this.deleteCounter}
            className="btn btn-danger btn-sm"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  incrementCounter = () => {
    this.props.onIncrement(this.props.id);
  };

  decrementCounter = () => {
    this.props.onDecrement(this.props.id);
  };

  deleteCounter = () => {
    this.props.onDelete(this.props.id);
  };

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return (classes += this.props.value === 0 ? "warning" : "primary");
  }
  formatCount() {
    return this.props.value === 0 ? "Zero" : this.props.value;
  }
  disableCheck() {
    if (this.props.value <= 0) return true;
    else return false;
  }
}

export default Counter;
