import React from "react";
import "./index.css"
import { Link } from "react-router-dom"

export const LoginCompany = () => {

  return (
    <div className="panel-login-empresa">
      <div>
        <img src={"./assets/Logo.png"} alt="logosite" />
      </div>

      <form>
        <div className="form-group">
          <input className="form-control" id="cnpj-input" placeholder="CNPJ" />
        </div>

        <div className="form-group">
          <input className="form-control" id="passowrd-input" placeholder="Password" />
        </div>

        <Link className="btn btn-link" to="/">Voltar</Link>
        <br />

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}