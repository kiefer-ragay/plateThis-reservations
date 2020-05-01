import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar.jsx';
import $ from 'jquery';

const serverURL = 'http://localhost:3000'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  getScheduleData (e) {
    e.preventDefault();
    $.ajax({
      url: serverURL + '/reservations'
    })
  }





  render () {
    return (
      <div>Testing
        <br></br>
        <button>Get Data</button>
      <Calendar />
      </div>
    )

  }





}


ReactDOM.render(<App />, document.getElementById('app'));