import React, { useState } from "react";
import axios from "axios";
import "./index.css"
import { Link } from "react-router-dom"
import env from "./../../env.json"

export const Login = (props) => {
  const [Cpf, setCpf] = useState("");
  const [Senha, setSenha] = useState("");
  const [Erro, setErro] = useState("");

  async function doLogin(e) {
    e.preventDefault();
    setErro("");
    try {
      const body = {
        cpf: Cpf,
        senha: Senha
      }

      const res = await axios.post(env.apiUrl + "login", body);

      localStorage.setItem("type", "user");

      props.history.push(`/profileuser/${res.data.id}`);
    }
    catch (err) {
      const erro = err.response ? err.response.data.err : err;
      setErro(erro ? erro : "Houve um erro ao logar.");
    }
  }

  return (
    <div className="panel-login">
      <div>
        <img src={"./assets/Logo.png"} alt="logosite" />
      </div>

      <form>
        <div className="form-group">
          <input className="form-control" id="cpf-input" placeholder="CPF" value={Cpf} onChange={(e) => setCpf(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="passowrd-input" placeholder="Password" type={"password"} value={Senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <br />

        <button type="submit" className="btn btn-primary" onClick={doLogin}>Login</button>

        <br />

        <Link className="btn btn-link" to="/recuperarsenha">Esqueci minha senha</Link>

        <br />

        <Link className="btn btn-link" to="/">Voltar</Link>

        {Erro && <div className="alert alert-danger">{Erro}</div>}
      </form>
    </div>
  )
}
