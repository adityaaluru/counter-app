import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

class CounterApp extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
    ],
    initState: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
    ],
  };

  onDelete = (counterId) => {
    this.setState({
      counters: this.state.counters.filter(
        (counter) => counter.id !== counterId
      ),
    });
  };

  onIncrement = (counterId) => {
    const counters = [...this.state.counters];
    const countersUpdated = counters.map((counter) => {
      if (counter.id === counterId) {
        counter.value = counter.value + 1;
      }
      return counter;
    });
    this.setState({ counters: countersUpdated });
  };

  onDecrement = (counterId) => {
    console.log("Decrement called!");
    const counters = [...this.state.counters];
    const countersUpdated = counters.map((counter) => {
      if (counter.id === counterId) {
        counter.value = counter.value - 1;
      }
      return counter;
    });
    this.setState({ counters: countersUpdated });
  };

  onReset = () => {
    const initState = JSON.parse(JSON.stringify(this.state.initState));
    this.setState({ counters: initState });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onIncrement={this.onIncrement}
            onDecrement={this.onDecrement}
            onDelete={this.onDelete}
            onReset={this.onReset}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default CounterApp;
