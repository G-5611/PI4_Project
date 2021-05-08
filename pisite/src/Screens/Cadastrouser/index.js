import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "./index.css"
import { Link } from "react-router-dom"
import env from "./../../env.json"

export const Cadastrouser = () => {
  const [TipoAlertText, setTipoAlertText] = useState("danger")
  const [TextoAlerta, setTextoAlerta] = useState("");
  const [Nome, setNome] = useState("");
  const [Cpf, setCpf] = useState("");
  const [DataNascimento, setDataNascimento] = useState("");
  const [CEP, setCEP] = useState("");
  const [Endereco, setEndereco] = useState("");
  const [UF, setUF] = useState("")
  const [Instituicao, SetInstituicao] = useState("")
  const [Anoforma, SetAnoforma] = useState("")
  const [Curso, setCurso] = useState("")
  const [Password, setPassword] = useState("")

  async function doCadastro(e) {
    e.preventDefault();
    setTextoAlerta("");
    setTipoAlertText("danger");
    try {

      if (Nome === "") {
        setTextoAlerta('Campo "Nome Completo" obrigatório.');
        return;
      }

      if (Cpf === "") {
        setTextoAlerta('Campo "CPF" obrigatório.');
        return;
      }

      if (DataNascimento === "") {
        setTextoAlerta('Campo "DataNascimento" obrigatório.');
        return;
      }

      if (CEP === "") {
        setTextoAlerta('Campo "CEP" obrigatório.');
        return;
      }

      if (UF === "") {
        setTextoAlerta('Campo "UF" obrigatório.')
      }

      /*if (!moment(DataNascimento, "DD/MM/YYYY").isValid()) {
        setTextoAlerta('"Data de Nascimento" inválida.');
        return;
      }*/

      const body = {
        nome: Nome,
        cpf: Cpf,
        datanasc: DataNascimento,
        cep: CEP,
        endereco: Endereco,
        uf: UF,
        instituicao: Instituicao,
        anoforma: Anoforma,
        curso: Curso,
        password: Password

      }

      const res = await axios.post(env.apiUrl + "user/create", body);

      setTextoAlerta(res.data.msg);
      setTipoAlertText("success");

    }
    catch (err) {
      const erro = err.response ? (err.response.data.err ? err.response.data.err.err : err.response.data.err) : err;
      setTextoAlerta(erro ? erro : "Houve um erro na criação da conta!");
      setTipoAlertText("danger");
    }
  };

  return (
    <div className="panel-registration">
      <h3>Registro de Usuario</h3>
      <br />
      <form>
        <div className="form-group">
          <input className="form-control" id="nome-completo" placeholder="Nome Completo" value={Nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="cpf-input" placeholder="CPF" value={Cpf} onChange={(e) => setCpf(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="data-nascimento" placeholder="Data de nascimento" type={"date"} value={DataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="cep" placeholder="CEP" value={CEP} onChange={(e) => setCEP(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="endereco" placeholder="Endereço" value={Endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>

        <div className="form-group">
          <select className="form-control" id="uf-select" value={UF} onChange={(e) => setUF(e.target.value)} required>
            <option selected disabled value="">UF...</option>
            <option value="1">DF</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid state.
          </div>
        </div>

        <div className="form-group">
          <input className="form-control" id="instituicao" placeholder="Instituição" value={Instituicao} onChange={(e) => SetInstituicao(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="ano-formacao" type={"date"} placeholder="Ano da Formação" value={Anoforma} onChange={(e) => SetAnoforma(e.target.value)} />
        </div>

        <div className="form-group">
          <select className="form-control" id="curso-select" value={Curso} onChange={(e) => setCurso(e.target.value)} required>
            <option selected disabled value="">Curso...</option>
            <option>Computação</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid curso.
          </div>
        </div>

        <div className="form-group">
          <input className="form-control" id="senha" placeholder="Senha" value={Password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="btn btn-primary" type="submit" onClick={doCadastro}>
          Cadastrar
        </button>

        <br />

        <Link className="btn btn-link" to="/registercompany">Sou uma Empresa</Link>

        <br />

        <Link className="btn btn-link" to="/">Voltar</Link>

        {TextoAlerta && <div className={"alert alert-" + TipoAlertText}>{TextoAlerta}</div>}
      </form>
    </div>
  )
}