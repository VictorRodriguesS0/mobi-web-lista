import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from './store';
import HomeLoading from './screens/HomeLoading';
import ParcelamentoManual from './screens/ParcelamentoManual';

const App = () => (
  <Provider>
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* Rota pra redirecionar pro site principal */}
          {/* <Route path="/" exact component={() => { window.location.href = 'http://www.lojinhaimportados.com'; }} /> */}

          {/* Rota pra exibir a lista de produtos */}
          <Route
            path="/lista"
            component={HomeLoading}
          />

          <Route path='/calculadora' exact component={ParcelamentoManual} />

          <Route
            path="*"
            render={() => { window.location.href = '/lista'; }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;
