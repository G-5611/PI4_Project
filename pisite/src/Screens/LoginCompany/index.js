import React, { useState } from "react";
import "./index.css"
import { Link } from "react-router-dom"
import axios from "axios";
import env from "./../../env.json"

export const LoginCompany = (props) => {

  const [Cnpj, setCnpj] = useState("");
  const [Senha, setSenha] = useState("");
  const [Erro, setErro] = useState("");

  async function doLoginCompany(e) {
    e.preventDefault();
    setErro("");
    try {
      const body = {
        cnpj: Cnpj,
        senha: Senha
      }

      const res = await axios.post(env.apiUrl + "logincompany", body);

      props.history.push(`/profilecompany/${res.data.id}`);
    }
    catch (err) {
      const erro = err.response ? err.response.data.err : err;
      setErro(erro ? erro : "Houve um erro ao logar.");
    }
  }



  return (
    <div className="panel-login-empresa">
      <div>
        <img src={"./assets/Logo.png"} alt="logosite" />
      </div>

      <form>
        <div className="form-group">
          <input className="form-control" id="cnpj-input" placeholder="CNPJ" value={Cnpj} onChange={(e) => setCnpj(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="passowrd-input" placeholder="Password" type={"password"} value={Senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <br />

        <button type="submit" className="btn btn-primary" onClick={doLoginCompany}>Login</button>
        <br />

        <Link className="btn btn-link" to="/">Voltar</Link>
        {Erro && <div className="alert alert-danger">{Erro}</div>}

      </form>
    </div>
  )
}