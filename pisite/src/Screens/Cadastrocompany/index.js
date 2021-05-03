import "./index.css"
import { Link } from "react-router-dom"

export const Cadastrocompany = () => {

  return (
    <div className="panel-registration">
      <h3>Registro de Empresa</h3>
      <br />
      <form>
        <div className="form-group">
          <input className="form-control" id="nome-fantasia" placeholder="Nome Fantasia" />
        </div>

        <div className="form-group">
          <input className="form-control" id="cnpj-input" placeholder="CNPJ" />
        </div>

        <div className="form-group">
          <input className="form-control" id="razao-social" placeholder="Razao-Social" />
        </div>

        <div className="form-group">
          <input className="form-control" id="endereco" placeholder="Endereço" />
        </div>

        <div className="form-group">
          <input className="form-control" id="cep" placeholder="CEP" />
        </div>

        <div className="form-group">
          <input className="form-control" id="telefone" placeholder="Telefone" />
        </div>

        <div className="form-group">
          <input className="form-control" id="email" placeholder="E-mail" />
        </div>

        <div className="form-group">
          <input className="form-control" id="senha" placeholder="Senha" />
        </div>
        <div className="form-group">
          <select className="form-control" id="uf-select" required>
            <option selected disabled value="">UF...</option>
            <option>DF</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid state.
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Cadastrar
        </button>

        <br />

        <Link className="btn btn-link" to="/">Voltar</Link>
      </form>
    </div>
  )
}