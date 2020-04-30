import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link
} from 'react-router-dom';
import ThreeRoute from './ThreeRoute';
import { Scratch, Spiral } from './scenes';
import './styles/App.css';


function App() {
  let [collapsed, setCollapse] = useState(false);
  let Menu = () => (
    <ul>
      <li>
        <Link to="/">Scratch</Link>
      </li>
      <li>
        <Link to="/spiral">Spiral</Link>
      </li>
    </ul>
  );
  return (
    <Router>
      <div className="router">
        <button onClick={() => setCollapse(!collapsed)}>
          <span role="img" aria-label="hamburger">🍔</span>
        </button>
        {collapsed ? <Menu /> : <></>}
      </div>
      <Switch>
        <ThreeRoute exact path="/" component={Scratch} />
        <ThreeRoute path="/spiral" component={Spiral} />
      </Switch>
    </Router>
  );
}

export default App;
