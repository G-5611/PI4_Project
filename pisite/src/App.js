import './App.css';
import { Login } from "./Screens/Login"
import { LoginCompany } from "./Screens/LoginCompany"
import { BrowserRouter, Switch, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/logincompany" component={LoginCompany} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
