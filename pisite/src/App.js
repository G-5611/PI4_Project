import './App.css';
import { Login } from "./Screens/Login"
import { LoginCompany } from "./Screens/LoginCompany"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { StartPage } from './Screens/StartPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/loginuser" component={Login} />
          <Route exact path="/logincompany" component={LoginCompany} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
