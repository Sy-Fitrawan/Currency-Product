import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginSignUp from './component/User/LoginSignUp';

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginSignUp} />
    </Router>
  );
}

export default App;
