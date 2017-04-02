/**
 * Created by jamesbillinger on 4/2/17.
 */
import React, { Component } from 'react';

export default class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (!props.params || !props.params.vehicleid) {
      this.state.mode = 'add';
      this.state.form = {};
    }
    /*if (props.vehicles && props.params && props.params.vehicleid) {

    }*/
  }

  render() {
    const { params } = this.props;
    const { mode, vehicle } = this.state;
    console.log(params);
    if (mode) {
      return (
        <div>
          add/edit mode
        </div>
      );
    } else {
      return (
        <div>
          view mode
        </div>
      );
    }
  }
}