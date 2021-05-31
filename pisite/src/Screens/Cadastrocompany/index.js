import "./index.css"
import { Link, Route } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import env from "./../../env.json"


export const Cadastrocompany = () => {
  const [TipoAlertText, setTipoAlertText] = useState("danger")
  const [TextoAlerta, setTextoAlerta] = useState("");
  const [NomeFantasia, setNomeFantasia] = useState("");
  const [Cnpj, setCnpj] = useState("");
  const [RazaoSocial, setRazaoSocial] = useState("");
  const [Endereco, setEndereco] = useState("");
  const [Complemento, setComplemento] = useState("");
  const [Uf, setUf] = useState("");
  const [Cep, setCep] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [Email, setEmail] = useState("");
  const [Nomecontato, setNomecontato] = useState("");
  const [Telefonecontato, setTelefonecontato] = useState("");
  const [Cpfcontato, setCpfcontato] = useState("");
  const [Emailcontato, setEmailcontato] = useState("");
  const [Senha, setSenha] = useState("");
  const [Confirmsenha, setConfirmsenha] = useState("")

  async function doCadastroCompany(e) {
    e.preventDefault();
    setTextoAlerta("");
    setTipoAlertText("danger");

    try {

      if (NomeFantasia === "") {
        setTextoAlerta('Campo "Nome Fantasia" obrigatorio')
        return
      }

      if (RazaoSocial === "") {
        setTextoAlerta('Campo "Razão Social" obrigatorio')
        return
      }

      if (Cnpj === "") {
        setTextoAlerta('Campo "CNPJ" obrigatorio')
        return
      }

      if (Cep === "") {
        setTextoAlerta('Campo "CEP" obrigatorio')
        return
      }

      if (Endereco === "") {
        setTextoAlerta('Campo "Endereco" obrigatorio')
        return
      }

      if (Uf === "") {
        setTextoAlerta('Campo "UF" obrigatorio')
        return
      }

      if (Email === "") {
        setTextoAlerta('Campo "Email" obrigatorio')
        return
      }

      if (Telefone === "") {
        setTextoAlerta('Campo "Telefone" obrigatorio')
        return
      }

      if (Nomecontato === "") {
        setTextoAlerta('Campo "Nome do Contato" obrigatorio')
        return
      }

      if (Cpfcontato === "") {
        setTextoAlerta('Campo "CPF do Contato" obrigatorio')
        return
      }

      if (Telefonecontato === "") {
        setTextoAlerta('Campo "Telefone do Contato" obrigatorio')
        return
      }

      if (Emailcontato === "") {
        setTextoAlerta('Campo "Email do Contato" obrigatorio')
        return
      }

      if (Senha === "") {
        setTextoAlerta('Campo "Senha" obrigatorio')
        return
      }

      if (Senha !== Confirmpassword) {
        setTextoAlerta('Senhas não coincidem')
        return
      }


      const body = {
        nomefantasia: NomeFantasia,
        razaosocial: RazaoSocial,
        cnpj: Cnpj,
        cep: Cep,
        endereco: Endereco,
        complemento: Complemento,
        uf: Uf,
        email: Email,
        telefone: Telefone,
        nomecontato: Nomecontato,
        telefonecontato: Telefonecontato,
        cpfcontato: Cpfcontato,
        emailcontato: Emailcontato,
        senha: Senha

      }

      const res = await axios.post(env.apiUrl + "user/createcompany", body);

      setTextoAlerta(res.data.msg);
      setTipoAlertText("success");
    }
    catch (err) {
      const erro = err.response ? (err.response.data.err ? err.response.data.err.err : err.response.data.err) : err;
      console.log(err.response)
      setTextoAlerta(erro ? erro : "Houve um erro na criação da conta!");
      setTipoAlertText("danger");
    }
  };

  return (
    <div className="panel-registration">
      <h3>Registro de Empresa</h3>
      <br />
      <form>
        <div className="form-group">
          <input className="form-control" id="nome-fantasia" placeholder="Nome Fantasia" value={NomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="cnpj-input" placeholder="CNPJ" value={Cnpj} onChange={(e) => setCnpj(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="razao-social" placeholder="Razao-Social" value={RazaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="cep" placeholder="CEP" value={Cep} onChange={(e) => setCep(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="endereco" placeholder="Endereço" value={Endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="complemento" placeholder="Complemento" value={Complemento} onChange={(e) => setComplemento(e.target.value)} />
        </div>

        <div className="form-group">
          <select className="form-control" id="uf-select" value={Uf} onChange={(e) => setUf(e.target.value)} required>
            <option selected disabled value="">UF...</option>
            <option value="1">DF</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid state.
          </div>
        </div>

        <div className="form-group">
          <input className="form-control" id="telefone" placeholder="Telefone da Empresa" value={Telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="email" placeholder="E-mail" value={Email} onChange={onEmailChange} />
        </div>

        <div className="form-group">
          <input className="form-control" id="nome-contato" placeholder="Nome do contato da pessoa fisica" value={Nomecontato} onChange={(e) => setNomecontato(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="cpf-contato" placeholder="CPF do contato" value={Cpfcontato} onChange={(e) => setCpfcontato(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="telefone-contato" placeholder="Telefone do contato" value={Telefonecontato} onChange={(e) => setTelefonecontato(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="email-contato" placeholder="Email do contato" value={Emailcontato} onChange={(e) => setEmailcontato(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="senha" placeholder="Senha" type={"password"} value={Senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="confirmar-senha" placeholder="Confirmar Senha" type={"password"} value={Confirmsenha} onChange={(e) => setConfirmsenha(e.target.value)} />
        </div>

        <button className="btn btn-primary" type="submit" onClick={doCadastroCompany}>
          Cadastrar
        </button>

        <br />

        <Link className="btn btn-link" to="/">Voltar</Link>

        {TextoAlerta && <div className={"alert alert-" + TipoAlertText}>{TextoAlerta}</div>}
      </form>
    </div>
  )
}