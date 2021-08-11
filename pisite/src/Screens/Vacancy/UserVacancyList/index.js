import React, { useEffect, useState } from "react";
import axios from "axios";
import env from "./../../../env.json"
import { Navbar } from "../../../Componentes/Navbar";

export const ListaUserVagas = ({ ...defaultprops }) => {

  const [SearchUsuarios, setSearchUsuarios] = useState([]);
  const [UserID, setUserId] = useState(0)


  useEffect(() => {
    setUserId(defaultprops.match.params.id)
  }, [defaultprops.match])

  useEffect(async () => {
    if (UserID > 0) {
      const res = (await axios.get(env.apiUrl + `vacancy/userlist?id=${UserID}`));

      setSearchUsuarios(res.data || [])
    }
  }, [UserID]);

  return (
    <div>
      <Navbar userID={UserID} />

      {SearchUsuarios.length === 0 &&
        <div className={"alert alert-info"}>{'Nenhuma candidatura encontrada'}</div>
      }

      {SearchUsuarios.length > 0 &&
        <div id={"search-results"} className={"d-flex justify-content-center w-100"} style={{ "padding": "8px 31px" }}>
          <table className={"table"}>
            <thead>
              <tr>
                <th>Nome da Vaga</th>
                <th>Empresa</th>
                <th>Tipo</th>
                <th>Local</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              {SearchUsuarios.map((x, index) => {
                return (
                  <tr key={index}>
                    <td>{x.nomevaga}</td>
                    <td>{x.nomeempresa}</td>
                    <td>{x.tipo}</td>
                    <td>{x.local}</td>
                    <td>{x.aceito === null ? 'Em Analise' : (x.aceito === 's' ? 'Aceito' : 'Recusado')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}