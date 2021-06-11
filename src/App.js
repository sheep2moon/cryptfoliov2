import './styles/app.scss';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CryptoProvider from './contexts/cryptoContext';
import CoinsList from './components/CoinsList';
import SingleCoin from './components/SingleCoin';

function App() {
  return (
    <>
      <Router>
        <CryptoProvider>
          <Sidebar />
          <div className='app-container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/coins-list' component={CoinsList} />
              <Route exact path='/about' component={About} />
              <Route path='/coin/:id' component={SingleCoin} />
            </Switch>
          </div>
        </CryptoProvider>
      </Router>
    </>
  );
}

export default App;
