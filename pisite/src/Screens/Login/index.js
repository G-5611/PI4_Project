import React from "react";
import "./index.css"
import { Link } from "react-router-dom"

export const Login = () => {

  return (
    <div className="panel-login">
      <div>
        <img src={"./assets/Logo.png"} alt="logosite" />
      </div>

      <form>
        <div className="form-group">
          <input className="form-control" id="cpf-input" placeholder="CPF" />
        </div>

        <div className="form-group">
          <input className="form-control" id="passowrd-input" placeholder="Password" />
        </div>

        <br />

        <button type="submit" className="btn btn-primary">Login</button>

        <br />

        <Link className="btn btn-link" to="/">Voltar</Link>
      </form>
    </div>
  )
}
