/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
/* eslint-disable-next-line max-classes-per-file */
import React from 'react';

const Context = React.createContext();
export default Context;

export class Provider extends React.Component {
  state = {
    storeSetState: (state) => this.stateHandler(state),
  };

  stateHandler = (state) => {
    this.setState(state);
  };

  render() {
    const { children } = this.props;

    return (
      <>
        <Context.Provider value={{ ...this.state }}>{ children }</Context.Provider>
      </>
    );
  }
}

export function connectWithStore(ContainerComponent) {
  return class extends React.Component {
    state = {};

    render() {
      return (
        <Context.Consumer>
          {(data) => <ContainerComponent {...data} {...this.props} />}
        </Context.Consumer>
      );
    }
  };
}
