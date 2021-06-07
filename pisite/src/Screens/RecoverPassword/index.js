import React, { useState } from "react";
import "./index.css"
import { Link } from "react-router-dom"

export const RecuperarSenha = () => {
  const [Email, setEmail] = useState("");
  const [Codigo, setCodigo] = useState("");


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
        </div>
        <button type="submit" className="btn btn-primary">Recuperar</button>
      </div>
    </div>
  )
}