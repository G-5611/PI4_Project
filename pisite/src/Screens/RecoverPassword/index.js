import React, { useState } from "react";
import "./index.css"
import { Link } from "react-router-dom"

import axios from "axios";

import env from "./../../env.json";

export const RecuperarSenha = () => {
  const [Email, setEmail] = useState("");
  const [Empresa, setEmpresa] = useState(false);
  const [Codigo, setCodigo] = useState("");
  const [CodigoDigitado, setCodigoDigitado] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [Erro, setErro] = useState("");

  async function checkEmail(e) {
    e.preventDefault();
    setErro("");
    setCodigo("");
    try {
      const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

      if (!regex.test(Email) || !Email) {
        setErro("Email inválido!");
        return;
      }

      let route = "profile";
      if (Empresa) {
        route = "profilecompany";
      }

      await axios.get(env.apiUrl + `user/${route}?email=${Email}`);

      setCodigo(getRandomInt(99999).toString());
    }
    catch (err) {
      const erro = err.response ? (err.response.data.err ? err.response.data.err.err : err.response.data.err) : err;
      setErro(erro ? erro : "Houve um erro ao processar seus dados.");
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function onConfirmpasswordChange(e) {
    setErro("");
    e.target.className = "form-control";

    const confirmpassword = e.target.value;

    if (confirmpassword !== Password) {
      setErro("As senhas não coincidem!");
      e.target.className = "form-control invalid-input";
    }

    setConfirmpassword(confirmpassword);
  }

  async function savePassword(e) {
    e.preventDefault();
    setErro("");
    setCodigo("");
    try {
      if (Password === "") {
        setErro('Campo "Senha" obrigatorio.')
        return;
      }

      if (Confirmpassword !== Password) {
        setErro("As senhas não coincidem!");
        return;
      }

      if (Codigo !== CodigoDigitado) {
        setErro("Codigo digidato incorreto!");
        setPassword("");
        setConfirmpassword("");
        setCodigoDigitado("");
        return;
      }

      let route = "password";
      if (Empresa) {
        route = "password/company";
      }

      const body = {
        senha: Password,
        email: Email
      }

      await axios.post(env.apiUrl + `user/profile/${route}`, body);

      alert("Senha Alterada com Sucesso.");
    }
    catch (err) {
      const erro = err.response ? (err.response.data.err ? err.response.data.err.err : err.response.data.err) : err;
      setErro(erro ? erro : "Houve um erro ao processar seus dados.");
    }
  }

  return (
    <div >
      <br />
      <h3>Recuperar Senha</h3>
      <div className='panel-recover'>
        <br />

        <div className='mb-3 '>
          <label className='form-label h5 '>Digite o email da conta para recuperar sua senha</label>
          <br />
          <br />
          <input className='form-control' placeholder='Email' Value={Email} onChange={(e) => setEmail(e.target.value)} ></input>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={Empresa} onClick={() => setEmpresa(!Empresa)} id="defaultCheck1" />
            <label className="form-check-label" for="defaultCheck1">
              {"Sou uma Empresa"}
            </label>
          </div>
        </div>

        {Erro && <div className="alert alert-danger">{Erro}</div>}

        {Codigo && (<>
          <div className="alert alert-info">{`Seu Codigo: ${Codigo}`}</div>

          <input className='form-control' placeholder='Senha Nova' Value={Password} onChange={(e) => setPassword(e.target.value)} ></input>

          <input className='form-control' placeholder='Confirma Senha Nova' Value={Confirmpassword} onChange={onConfirmpasswordChange} ></input>

          <input className='form-control' placeholder='Codigo' Value={CodigoDigitado} onChange={(e) => setCodigoDigitado(e.target.value)} ></input>

          <button className="btn btn-primary" onClick={savePassword}>Confirmar Alateracao</button>

          <br />

          <br />
        </>)}

        <button type="submit" className="btn btn-primary" onClick={checkEmail}>Recuperar</button>

        <br />

        <br />

        <Link className="btn btn-link" to="/">Voltar</Link>
      </div>
    </div>
  )
}