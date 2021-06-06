import React, { useState, useEffect, useRef } from "react";

import "./index.css"
import { Link } from "react-router-dom";
import SearchResults from "./SearchResults";

export const Navbar = () => {
  const ref = useRef(null);

  const mockSearchResults = [
    {
      vaga: "programador junior",
      empresa: "microsoft"
    },
    {
      vaga: "assistente de redes",
      empresa: "google"
    },
    {
      vaga: "programador web",
      empresa: "adidas"
    },
    {
      vaga: "assistente de ti",
      empresa: "discord"
    },
    {
      vaga: "auxiliar de testes",
      empresa: "bing"
    }
  ];

  const [Search, setSearch] = useState("");
  const [RefWidth, setRefWidth] = useState(0);

  useEffect(() => {
    setRefWidth(ref.current.clientWidth)
  }, [ref])

  function FoundResult() {
    const found1 = mockSearchResults.some(x => x.vaga.includes(Search));
    const found2 = mockSearchResults.some(x => x.empresa.includes(Search));

    return (found1 || found2);
  }

  function filtrarResults() {
    const results = mockSearchResults.filter(x => x.vaga.includes(Search) || x.empresa.includes(Search));
    return results;
  }

  return (
    <div className="busca-painel">
      <nav className="navbar navbar-expand-lg navbar-light bg-light barraprocura">
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
            <form className="form-inline my-2 my-lg-0" ref={ref}>
              <div id={"form-components"}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(e) => setSearch(e.target.value)} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      {Search !== "" && Search.length > 2 && FoundResult() &&
        <SearchResults results={filtrarResults()} width={RefWidth} />
      }
    </div>
  )
}