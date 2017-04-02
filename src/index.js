/**
 * Created by jamesbillinger on 4/2/17.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import Login from 'components/login';
//import Register from 'components/register';
import Dashboard from 'components/dashboard';
import config from '../config.json';
import firebase from 'firebase';


class App extends Component {
  state = {
    loading: true,
  };

  componentWillMount() {
    this.firebaseApp = firebase.initializeApp(config.firebase);
    this.database = this.firebaseApp.database();
    this.firebaseRef = this.database.ref();
    this.auth = this.firebaseApp.auth();
  }

  componentDidMount() {
    let newState = {
      loading: false
    };
    if (this.firebaseApp.auth().currentUser) {
      newState.loggedIn = true;
    }
    this.setState(newState);
  }

  logout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.setState({loggedIn: undefined});
    }, (error) => {
      console.log(error);
    });
  }
  
  onLoggedIn() {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    const { loading, loggedIn } = this.state;
    if (loading) {
      return (
        <div>
          Loading
        </div>
      );
    } else {
      return (
        <BrowserRouter>
          <div style={{height:'100%', display:'flex', flexDirection:'column', width:'100%'}}>
            <div style={{flex: '0 0 50px', display: 'flex', alignItems:'center', borderBottom:'1px solid #eee',
                         backgroundColor:'#f9f9f9', padding:'0px 10px'}}>
              <div style={{flex:'1 0 auto'}}>
                <h2>MPG</h2>
              </div>
              {loggedIn &&
                <button style={{border: 'none', background: 'transparent'}} onClick={::this.logout}>
                  {this.auth.currentUser.displayName}: Logout
                </button>
              }
            </div>
            <div style={{flex:'1 0 auto', width:'100%', display:'flex', flexDirection:'column'}}>
              <Switch>
                <Route path='/login' exact={true} render={(props) => {
                  if (loggedIn) {
                    return <Redirect to='/' />;
                  } else {
                    return <Login {...props} onLoggedIn={::this.onLoggedIn} />;
                  }
                }} />
                <Route path='/' render={(props) => {
                  if (!loggedIn) {
                    return <Redirect to='/login' />;
                  } else {
                    return <Dashboard {...props} firebaseRef={this.firebaseRef} auth={this.auth} />;
                  }
                }} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      );
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);