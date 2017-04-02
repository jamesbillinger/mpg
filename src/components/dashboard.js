/**
 * Created by jamesbillinger on 4/2/17.
 */
import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import Vehicle from './vehicle';

export default class Dashboard extends Component {
  state = {
    vehicles: []
  };

  componentDidMount() {
    const { firebaseRef, auth } = this.props;
    const { selectedVehicle } = this.state;
    firebaseRef.child('/users/' + auth.uid).on('value', (snap) => {
      let vehicles = [];
      snap.forEach((child) => {
        vehicles.push(Object.assign({}, child.val(), {key: child.key}));
      });
      let newState = {vehicles};
      if (typeof selectedVehicle === 'undefined') {
        newState.selectedVehicle = 0;
      }
      this.setState(newState)
    }, (error) => {
      console.log(error);
    });
  }

  selectVehicle(vi) {
    const { vehicles } = this.state;
    this.setState({
      selectedVehicle: vehicles[vi]
    });
  }

  render() {
    const { vehicles, selectedVehicle } = this.state;

    return (
      <div style={{flex:'1 0 auto', width:'100%', display:'flex'}}>
        <div style={{width:'200px', borderRight:'1px solid #eee'}}>
          {vehicles.map((v, vi) => {
            return (
              <Link to={`vehicle/${vi}`}>
                <div key={vi} style={{backgroundColor:'#222', height:'80px', borderBottomColor:'#999', color:'white'}}
                     onClick={this.selectVehicle.bind(this, vi)}>
                  {v.name}
                </div>
              </Link>
            );
          })}
          <div style={{textAlign:'center', padding:'10px 0px'}}>
            <button>Add New Vehicle</button>
          </div>
        </div>
        <div style={{flex:'1 0 auto', padding:'10px'}}>
          {vehicles.length === 0 &&
            <div>Click "Add New Vehicle" to get started</div>
          }
          <Route path='/vehicle/:vehicleid' component={Vehicle} />
        </div>
      </div>
    );
  }
}