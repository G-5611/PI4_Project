import React, { useState, useEffect, useRef } from "react";

import "./index.css"
import { Link } from "react-router-dom";
import SearchResults from "./SearchResults";
import axios from "axios";
import env from "./../../env.json"

export const Navbar = ({
  userID
}) => {
  const ref = useRef(null);

  const [SearchRes, setSearchRes] = useState([]);
  const [Search, setSearch] = useState("");
  const [FiltrarResults, setFiltrarResults] = useState([]);
  const [RefWidth, setRefWidth] = useState(0);
  const [UserID, setUserID] = useState(0);

  useEffect(() => {
    setUserID(userID);
  }, [userID])

  useEffect(async () => {
    const res = await axios.get(env.apiUrl + "search");
    setSearchRes(res.data);
  }, [])

  useEffect(() => {
    setRefWidth(ref.current.clientWidth)
  }, [ref])

  useEffect(() => {
    if (Search !== "" && Search.length > 2) {
      const results = SearchRes.filter(x => x.vaga.includes(Search) || x.empresa.includes(Search));
      setFiltrarResults(results);
    }
    else {
      setFiltrarResults([]);
    }
  }, [Search])

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
                <Link className="nav-link" to={`/profileuser/${UserID}`}>Perfil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/vacancy/${UserID}/0`}>Vagas</Link>
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

      <SearchResults userID={UserID} results={FiltrarResults} width={RefWidth} />
    </div>
  )
}