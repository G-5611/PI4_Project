import React from "react";
import "./index.css"
import { Link } from "react-router-dom"

export const StartPage = () => {
  return (
    <div className="panel-start-page">
      <div>
        <img width="500" src={"./assets/Logo.png"} alt="logosite" />
      </div>

      <br />

      <button type="button" className="btn btn-primary">CADASTRE-SE JA</button>

      <br />
      <br />

      <Link className="btn btn-primary" to="/loginuser">JA POSSUO UMA CONTA</Link>
      <br />
      <Link className="btn btn-link" to="/logincompany">Sou uma empresa</Link>
    </div>
  )
}