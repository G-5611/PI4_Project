import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./../../Componentes/Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import env from "./../../env.json"

export const VagaCreate = ({ ...defaultprops }) => {

  const [NomeVaga, setNomeVaga] = useState("");
  const [Desc, setDesc] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [Email, setEmail] = useState("");
  const [Local, setLocal] = useState("");
  const [Tipo, setTipo] = useState("");
  const [UserID, setUserId] = useState(0);
  const [Erro, setErro] = useState("");
  const [TipoAlertText, setTipoAlertText] = useState("danger");


  useEffect(() => {
    console.log(defaultprops.match.params.id)
    setUserId(defaultprops.match.params.id)
  }, [defaultprops.match])

  async function CriarVaga() {
    setErro("");
    try {
      if (NomeVaga === "") {
        setErro('Campo "Nome da Vaga" obrigatório.');
        setTipoAlertText('danger')
      }

      if (Tipo === "") {
        setErro('Campo "Tipo" obrigatório.');
        setTipoAlertText('danger')
      }

      if (Local === "") {
        setErro('Campo "Local" obrigatório.');
        setTipoAlertText('danger')
      }

      if (Desc === "") {
        setErro('Campo "Descrição" obrigatório.');
        setTipoAlertText('danger')
      }

      const body = {
        id: UserID,
        nome: NomeVaga,
        desc: Desc,
        local: Local,
        tipo: Tipo,
        telefone: Telefone,
        email: Email
      };

      const res = await axios.post(env.apiUrl + "vacancy/create", body);

      setErro(res.data.msg);
      setTipoAlertText('success');
    }
    catch (err) {
      const erro = err.response ? err.response.data.err : err;
      setErro(erro ? erro : "Houve um erro ao criar a vaga.");
      setTipoAlertText('danger')
    }
  }

  return (

    <div>
      <Navbar />
      <div className='panel-vagacreate'>
        <br />
        <h4>Criar uma nova vaga</h4>

        <img className="profile-pic" src="./assets/Blank-profile.png" />

        <div className="mb-3">
          <label className='form-label'>Nome da Vaga</label>
          <input className='form-control' value={NomeVaga} onChange={(e) => setNomeVaga(e.target.value)}></input>
        </div>

        <div className="mb-3">
          <label className='form-label'>Telefone de Contato</label>
          <input className='form-control' value={Telefone} onChange={(e) => setTelefone(e.target.value)}></input>
        </div>

        <div className="mb-3">
          <label className='form-label'>Email de Contato</label>
          <input className='form-control' value={Email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>

        <div className="form-group">
          <label className='form-label'>Tipo</label>
          <select className="form-control" id="tipo-select" value={Tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option selected disabled value="">Tipo...</option>
            <option value="CLT">CLT</option>
            <option value="Estagio">Estagio</option>
            <option value="Contrato">Contrato</option>
          </select>
        </div>

        <div className="form-group">
          <label className='form-label'>Local</label>
          <select className="form-control" id="local-select" value={Local} onChange={(e) => setLocal(e.target.value)} required>
            <option selected disabled value="">Local...</option>
            <option value="HomeOffice">HomeOffice</option>
            <option value="Presencial">Presencial</option>
          </select>
        </div>

        <div className="mb-3 descricao">
          <label className='form-label'>Descrição</label>
          <textarea className='form-control' rows="3" value={Desc} onChange={(e) => setDesc(e.target.value)}> </textarea>
        </div>

        {Erro && <div className={"alert alert-" + TipoAlertText}>{Erro}</div>}

        <button type="submit" className="btn btn-primary" onClick={CriarVaga}>Criar Vaga</button>
      </div>
    </div>


  )
}