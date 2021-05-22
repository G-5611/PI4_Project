import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "./../../Componentes/Navbar"

import axios from "axios";

import moment from "moment";

import env from "./../../env.json"

import "./index.css"


export const Profileuser = ({
  ...defaultprops
}) => {
  const [Nome, setNome] = useState("");
  const [UF, setUF] = useState("")
  const [Instituicao, setInstituicao] = useState("")
  const [Curso, setCurso] = useState("")
  const [Anoformacao, setAnoformacao] = useState("")
  const [Biografia, setBiografia] = useState("")
  const [UserID, setUserId] = useState(0)

  useEffect(() => {
    console.log(defaultprops.match.params.id)
    setUserId(defaultprops.match.params.id)
  }, [defaultprops.match])

  useEffect(async () => {
    console.log(UserID)
    if (UserID > 0) {
      const res = (await axios.get(env.apiUrl + `user/profile?id=${UserID}`)).data;
      console.log(res)

      setNome(res.nome)
      setUF(res.uf)
      setCurso(res.curso)
      setAnoformacao(moment(res.anoformacao, "YYYY-MM-DD").format("DD/MM/YYYY"))
      setInstituicao(res.instituicao)
    }
  }, [UserID])

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