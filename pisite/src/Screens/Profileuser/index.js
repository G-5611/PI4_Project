import "./index.css"
import { Link } from "react-router-dom"

export const Profileuser = () => {
    return(
        <div className="panel-profile">
            <h3>Perfil do Usuário</h3>
            <br />
            
            <form>
                <img src="./assets/Logo.png" />
                <div className="form-group">
                    <input className="form-control" id="nome-completo" placeholder="Nome Completo" />
                </div> 
                <div className="form-group">
                    <select className="form-control" id="uf-select" required>
                        <option selected disabled value="">UF...</option>
                        <option>DF</option>
                    </select>
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
                </div>
                <div className="form group">
                    <input className="form-control" id="biografia-usuario" placeholder="Biografia" />
                </div>
                <br />

                    <Link className="btn btn-link" to="/profileuser">Perfil do Usuário</Link>

                <br />

                    <Link className="btn btn-link" to="/">Voltar</Link>
            </form>       
        </div>

    )



}