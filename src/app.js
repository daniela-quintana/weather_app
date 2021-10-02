import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/login/login';
import Weather from './pages/weather/weather';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/pronostico-por-region" component={Weather} />
      </div>
    </Router>
  );
}

export default App;