import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "./../../Componentes/Navbar"

import "./index.css"


export const Profileuser = () => {
  const [Nome, setNome] = useState("Fulano");
  const [UF, setUF] = useState("DF")
  const [Instituicao, setInstituicao] = useState("CEUB")
  const [Curso, setCurso] = useState("Computação")
  const [Anoformacao, setAnoformacao] = useState("15/05/2019")
  const [Biografia, setBiografia] = useState("Insira Biografia aqui.")

  return (
    <div >
      <Navbar />

      <div className="panel-profile">

        <h3>Perfil do Usuário</h3>

        <img className="profile-pic" src="./assets/Blank-profile.png" />

        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>Nome Completo:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{Nome}</div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>UF:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{UF}</div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>Instituição:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{Instituicao}</div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>Ano da Formação:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{Anoformacao}</div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>Curso:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{Curso}</div>
          </div>
        </div>
        <div className="biografia text-left">

          <label>{Biografia}</label>
        </div>


      </div>
    </div>
  )
}