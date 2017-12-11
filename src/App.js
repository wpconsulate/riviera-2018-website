import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Snackbar from 'material-ui/Snackbar';
import SingleEvent from './components/SingleEvent';
import Home from './components/Home';
import './App.css';
import Events from './components/Events';

class App extends Component {

  closeSnackbar=()=>{
    this.props.hideMessage();
    console.log("hideMessage");
  }
  render() {
    var snackbarOpen=false;
    var snackbarMessage="";
    if(typeof this.props.message.payload !=='undefined' && this.props.message.payload.show==true){
      snackbarOpen=this.props.message.payload.show
      snackbarMessage = this.props.message.payload.message;
    }
    return (
      <div className="app-wrap">

        <Route exact path='/' component={Home}/>
        <Route exact path='/events/pillow-fight' component={SingleEvent}/>
        <Route exact path='/events' component={Events}/>


        <Snackbar
          open ={snackbarOpen}
          message={snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={()=>this.closeSnackbar()}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    message:state.message
  };
}

export default connect(mapStateToProps,actions)(App);
