import React from "react";
import "./index.css"

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

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
