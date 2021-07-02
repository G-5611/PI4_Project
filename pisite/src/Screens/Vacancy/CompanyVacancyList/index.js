import React, { useEffect, useState } from "react";
import axios from "axios";
import env from "./../../../env.json"
import { Navbar } from "../../../Componentes/Navbar";

export const ListaCompanyVagas = ({ ...defaultprops }) => {

  const [Searchvagas, setSearchVagas] = useState([]);
  const [UserID, setUserId] = useState(0)
  const [TipoAlertText, setTipoAlertText] = useState("danger")
  const [TextoAlerta, setTextoAlerta] = useState("");

  useEffect(() => {
    setUserId(defaultprops.match.params.id)
  }, [defaultprops.match])

  useEffect(async () => {
    if (UserID > 0) {
      const res = (await axios.get(env.apiUrl + `vacancy/companylist?id=${UserID}`));

      setSearchVagas(res.data || [])
    }
  }, [UserID]);

  async function atualizarSituacao(id, situacao) {
    try {

      const body = {
        id: id,
        situacao: situacao

      }
      const res = await axios.post(env.apiUrl + "vacancy/companyeditstatus", body);

      //setTextoAlerta(res.data.msg);
      setTextoAlerta('Situação alterada com sucesso')
      setTipoAlertText("success");

      const res2 = await axios.get(env.apiUrl + `vacancy/companylist?id=${UserID}`);
      setSearchVagas(res2.data);
    }
    catch (err) {
      const erro = err.response ? (err.response.data.err ? err.response.data.err.err : err.response.data.err) : err;
      console.log(err.response)
      setTextoAlerta(erro ? erro : "Houve um erro na alteração!");
      setTipoAlertText("danger");
    }
  }

  return (
    <div>
      <Navbar userID={UserID} />
      <div id={"search-results"} className={"d-flex justify-content-center w-100"} style={{ "padding": "8px 31px" }}>
        <table className={"table"}>
          <thead>
            <tr>
              <th>Nome da Vaga</th>
              <th>Candidato</th>
              <th>Cidade</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Situação Atual</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Searchvagas.map((x, index) => {
              return (
                <tr key={index}>
                  <td>{x.nomevaga}</td>
                  <td>{x.nomecandidato}</td>
                  <td>{x.cidade}</td>
                  <td>{x.email}</td>
                  <td>{x.telefone}</td>
                  <td>{x.aceito === null ? 'Em Analise' : (x.aceito === 's' ? 'Aceito' : 'Recusado')}</td>
                  <td> {x.aceito === null &&
                    <button className='btn btn-sm btn-success' onClick={() => atualizarSituacao(x.vagaid, "s")}>Aceitar</button>
                  } </td>
                  <td>
                    {x.aceito === null &&
                      <button className='btn btn-sm btn-danger' onClick={() => atualizarSituacao(x.vagaid, "n")}>Recusar</button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}