import './App.css';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Pages/Home';
import Tasks from './Pages/Tasks';
import { AuthProvider } from './shared/context/authContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <header className="navBarContainer">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/tasks">Tasks</NavLink>
        </header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/tasks">
            <Tasks />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
