import "./index.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import env from "./../../env.json";
import { validate } from 'gerador-validador-cpf';
import { cnpjValidation } from "./../../Helper/cnpjvalidate.js";


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

  function onEmailChange(e) {
    setTextoAlerta("");
    e.target.className = "form-control";

    const email = e.target.value;

    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

    if (!regex.test(email)) {
      setTextoAlerta("Email inválido!");
      e.target.className = "form-control invalid-input";
    }

    setEmail(email);
  }

  function validateCnpj(cnpj) {
    if (cnpj == '') return false;

    if (cnpj.length != 14) {
      return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999") {

      return false;
    }

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) {
      return false;
    }
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) {
        return false;
      }

    }

    return true;
  }

  function onCnpjChange(e) {
    setTextoAlerta("");
    let resultado = false;
    e.target.className = "form-control";

    const Cnpj = e.target.value;

    resultado = cnpjValidation(Cnpj);

    if (resultado === false) {
      setTextoAlerta("CNPJ Invalido")
      e.target.className = "form-control invalid-input"
    }

    setCnpj(Cnpj)
  }

  function onCpfContatoChange(e) {
    setTextoAlerta("");
    e.target.className = "form-control"

    const cpfdigitado = e.target.value;

    if (!validate(cpfdigitado)) {
      setTextoAlerta("CPF Invalido")
      e.target.className = "form-control invalid-input"
    }

    setCpfcontato(cpfdigitado)
  }

  function onEmailContatoChange(e) {
    setTextoAlerta("");
    e.target.className = "form-control";

    const email = e.target.value;

    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

    if (!regex.test(email)) {
      setTextoAlerta("Email inválido!");
      e.target.className = "form-control invalid-input";
    }

    setEmailcontato(email);
  }

  function onConfirmpasswordChange(e) {
    setTextoAlerta("");
    e.target.className = "form-control";

    const Confirmsenha = e.target.value;

    if (Confirmsenha !== Senha) {
      setTextoAlerta("As senhas não coincidem!");
      e.target.className = "form-control invalid-input";
    }

    setConfirmsenha(Confirmsenha);
  }


  async function doCadastroCompany(e) {
    e.preventDefault();
    setTextoAlerta("");
    setTipoAlertText("danger");

    try {

      if (NomeFantasia === "") {
        setTextoAlerta('Campo "Nome Fantasia" obrigatorio')
        return
      }

      if (Cnpj === "") {
        setTextoAlerta('Campo "CNPJ" obrigatorio')
        return
      }

      if (RazaoSocial === "") {
        setTextoAlerta('Campo "Razão Social" obrigatorio')
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

      if (Telefone === "") {
        setTextoAlerta('Campo "Telefone" obrigatorio')
        return
      }

      if (Email === "") {
        setTextoAlerta('Campo "Email" obrigatorio')
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
          <input className="form-control" id="cnpj-input" placeholder="CNPJ" value={Cnpj} onChange={onCnpjChange} />
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
          <input className="form-control" id="cpf-contato" placeholder="CPF do contato" value={Cpfcontato} onChange={onCpfContatoChange} />
        </div>

        <div className="form-group">
          <input className="form-control" id="telefone-contato" placeholder="Telefone do contato" value={Telefonecontato} onChange={(e) => setTelefonecontato(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="email-contato" placeholder="Email do contato" value={Emailcontato} onChange={onEmailContatoChange} />
        </div>

        <div className="form-group">
          <input className="form-control" id="senha" placeholder="Senha" type={"password"} value={Senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="form-control" id="confirmar-senha" placeholder="Confirmar Senha" type={"password"} value={Confirmsenha} onChange={onConfirmpasswordChange} />
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