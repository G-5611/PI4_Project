import './App.css';
import { Login } from "./Screens/Login"
import { LoginCompany } from "./Screens/LoginCompany"
import { HashRouter, Switch, Route } from "react-router-dom"
import { StartPage } from './Screens/StartPage';
import { Cadastrocompany } from './Screens/Cadastrocompany';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/loginuser" component={Login} />
          <Route exact path="/logincompany" component={LoginCompany} />
          <Route exact path="/cadastrocompany" component={Cadastrocompany} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
