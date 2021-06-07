import React, { useEffect, useState } from "react";
import { Navbar } from "./../../Componentes/Navbar";
import { Link } from "react-router-dom";

import axios from "axios";

import env from "./../../env.json";

import "./index.css";


export const Profilecompany = ({
  ...defaultprops
}) => {

  const [UF, setUF] = useState("");
  const [NomeFantasia, setNomeFantasia] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [Email, setEmail] = useState("");
  const [Cnpj, setCnpj] = useState("");
  const [Biografia, setBiografia] = useState("");
  const [UserID, setUserId] = useState(0);

  useEffect(() => {
    console.log(defaultprops.match.params.id)
    setUserId(defaultprops.match.params.id)
  }, [defaultprops.match])

  useEffect(async () => {
    console.log(UserID)
    if (UserID > 0) {
      const res = (await axios.get(env.apiUrl + `user/profilecompany?id=${UserID}`)).data;
      console.log(res)

      setNomeFantasia(res.nomefantasia)
      setUF(res.uf)
      setTelefone(res.telefone)
      setEmail(res.email)
      setCnpj(res.cnpj)
      setBiografia(res.bio)
    }
  }, [UserID])

  return (
    <div >
      <Navbar />

      <div className="panel-profile">

        <h3>Perfil da Empresa</h3>

        <img className="profile-pic" src="./assets/Blank-profile.png" />

        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>Empresa:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{NomeFantasia}</div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>CNPJ:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{Cnpj}</div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>UF:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{UF}</div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>Telefone:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{Telefone}</div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label text-left"><b>Email:</b></label>
          <div className="col-sm-7">
            <div className="form-control-plaintext text-left">{Email}</div>
          </div>
        </div>

        <div className="biografia text-left">
          <label className="col-sm-4 col-form-label text-left"> <b>Biografia:</b> </label>
          <br />
          <label>{Biografia}</label>
        </div>
        <div>
          <Link className="btn btn-primary" to={"/criarvaga/" + UserID}>Criar Vaga</Link>
        </div>

      </div>

    </div>
  )
}