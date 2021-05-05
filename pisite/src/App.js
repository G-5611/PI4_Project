import './App.css';
import { Login } from "./Screens/Login"
import { LoginCompany } from "./Screens/LoginCompany"
import { HashRouter, Switch, Route } from "react-router-dom"
import { StartPage } from './Screens/StartPage';
import { Cadastrocompany } from './Screens/Cadastrocompany';
import { Cadastrouser } from './Screens/Cadastrouser';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/loginuser" component={Login} />
          <Route exact path="/logincompany" component={LoginCompany} />
          <Route exact path="/registercompany" component={Cadastrocompany} />
          <Route exact path="/registeruser" component={Cadastrouser} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
