import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginSignUp from './component/User/LoginSignUp'
import Product from './component/Product'
import { useSelector } from 'react-redux'
import Header from './component/layout/Header/Header'

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)

  return (
    <Router>
      {isAuthenticated && <Header user={user} />}
      <Route exact path="/" component={LoginSignUp} />
      <Route exact path="/product" component={Product} />
    </Router>
  )
}

export default App
