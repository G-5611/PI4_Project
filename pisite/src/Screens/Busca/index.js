import "./index.css"
import { Link } from "react-router-dom"

export const Busca = () => { 

    return (
        <div className="busca-painel">
            <nav className="navbar navbar-expand-lg navbar-light bg-light barraprocura" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Estagiou</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Perfil</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Banco de vagas</a>
                        </li>
                    </ul>
                    </div>
                </div>

            </nav>
        </div>
    )
}