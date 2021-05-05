import "./index.css"
import { Link } from "react-router-dom"

export const Cadastrouser = () => {

  return (
    <div className="panel-registration">
      <h3>Registro de Usuario</h3>
      <br />
      <form>
        <div className="form-group">
          <input className="form-control" id="nome-completo" placeholder="Nome Completo" />
        </div>

        <div className="form-group">
          <input className="form-control" id="cpf-input" placeholder="CPF" />
        </div>

        <div className="form-group">
          <input className="form-control" id="data-nascimento" placeholder="Data de nascimento" />
        </div>

        <div className="form-group">
          <input className="form-control" id="endereco" placeholder="Endereço" />
        </div>

        <div className="form-group">
          <input className="form-control" id="cep" placeholder="CEP" />
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

        <div className="form-group">
          <input className="form-control" id="instituicao" placeholder="Instituição" />
        </div>

        <div className="form-group">
          <input className="form-control" id="ano-formacao" placeholder="Ano da Formação" />
        </div>

        <div className="form-group">
          <select className="form-control" id="curso-select" required>
            <option selected disabled value="">Curso...</option>
            <option>Computação</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid curso.
          </div>
        </div>

        <div className="form-group">
          <input className="form-control" id="senha" placeholder="Senha" />
        </div>

        <button className="btn btn-primary" type="submit">
          Cadastrar
        </button>

        <br />

        <Link className="btn btn-link" to="/registercompany">Sou uma Empresa</Link>

        <br />

        <Link className="btn btn-link" to="/">Voltar</Link>
      </form>
    </div>
  )
}