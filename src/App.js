import './styles/app.scss';
import './styles/forms.scss';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/homepage/Home';
import About from './components/About';
import CryptoProvider from './contexts/cryptoContext';
import CoinsList from './components/CoinsList';
import SingleCoin from './components/singleCoinPage/SingleCoin';
import FirebaseProvider from './contexts/firebaseContext';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PrivateRoute from './PrivateRoute';
import Portfolio from './components/portfolioPage/Portfolio';

function App() {
  return (
    <>
      <Router>
        <FirebaseProvider>
          <CryptoProvider>
            <Sidebar />
            <div className='app-container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/coins-list' component={CoinsList} />
                <PrivateRoute exact path='/portfolio' component={Portfolio} />
                <Route exact path='/about' component={About} />
                <Route path='/coin/:id' component={SingleCoin} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <PrivateRoute path='/profile' component={Profile} />
              </Switch>
            </div>
          </CryptoProvider>
        </FirebaseProvider>
      </Router>
    </>
  );
}

export default App;
