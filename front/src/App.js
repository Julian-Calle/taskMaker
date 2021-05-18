import './App.css';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Pages/Home';
import Tasks from './Pages/Tasks';

function App() {
  return (
    <Router>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/tasks">
          <Tasks />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
