import React, { Component, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
export const AlertContext = createContext();

class AlertContextProvider extends Component {
  state = {
    alerts: [],
  };

  //Set Alert
  setAlert = (msg, type, timeout = 5000) => {
    console.log(msg);
    const id = uuidv4();

    this.setState({ alerts: [...this.state.alerts, { msg, type, id }] });
    setTimeout(() => {
      this.removeAlert(id);
    }, timeout);
  };

  //   Remove Alert
  removeAlert = (id) => {
    this.setState({
      alerts: this.state.alerts.filter((alert) => alert.id !== id),
    });
  };
  render() {
    return (
      <AlertContext.Provider value={{ ...this.state, setAlert: this.setAlert }}>
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}

export default AlertContextProvider;
