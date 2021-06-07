import './App.css';
import { Login } from "./Screens/Login"
import { LoginCompany } from "./Screens/LoginCompany"
import { HashRouter, Switch, Route } from "react-router-dom"
import { StartPage } from './Screens/StartPage';
import { Cadastrocompany } from './Screens/Cadastrocompany';
import { Cadastrouser } from './Screens/Cadastrouser';
import { Profileuser } from './Screens/Profileuser';
import { Profilecompany } from './Screens/PorfileCompany';
import { VagaCreate } from './Screens/VagaCreate';
import { RecuperarSenha } from './Screens/RecoverPassword'

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
          <Route exact path="/profileuser" component={Profileuser} />
          <Route path="/profileuser/:id" component={Profileuser} />
          <Route exact path="/profilecompany" component={Profilecompany} />
          <Route path="/profilecompany/:id" component={Profilecompany} />
          <Route exact path="/criarvaga" component={VagaCreate} />
          <Route path="/criarvaga/:id" component={VagaCreate} />
          <Route exact path="/recuperarsenha" component={RecuperarSenha} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
