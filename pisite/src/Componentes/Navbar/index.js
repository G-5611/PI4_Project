import "./index.css"
import { Link } from "react-router-dom"

export const Navbar = () => {

  return (
    <div className="busca-painel">
      <nav className="navbar navbar-expand-lg navbar-light bg-light barraprocura" >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Estagiou</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profileuser">Perfil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Vagas</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              <button>aaa</button>
            </form>
          </div>
        </div>

      </nav>
    </div>
  )
}