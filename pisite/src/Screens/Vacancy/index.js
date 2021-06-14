import React, { useEffect, useState } from "react";
import { Detail } from "./Detail";
import { List } from "./List";
import { Navbar } from "./../../Componentes/Navbar";

import axios from "axios";

import env from "./../../env.json";

export const Vacancy = ({
  ...defaultprops
}) => {

  const [Nome, setNome] = useState("");
  const [Desc, setDesc] = useState("");
  const [Email, setEmail] = useState("");
  const [Empresa, setEmpresa] = useState("");
  const [ListVacancy, setListVacancy] = useState([]);
  const [ID, setID] = useState(0);
  const [UserID, setUserId] = useState(0)

  useEffect(() => {
    setUserId(defaultprops.match.params.id)
    setID(defaultprops.match.params.vacancyId || "")
    console.log(defaultprops.match.params.vacancyId)
    console.log(typeof defaultprops.match.params.vacancyId)
  }, [defaultprops.match])

  useEffect(async () => {
    if (ID > 0) {
      const res = (await axios.get(env.apiUrl + `vacancy?id=${ID}`)).data;

      setNome(res.name);
      setDesc(res.desc);
      setEmail(res.email);
      setEmpresa(res.empresa);
      setListVacancy([]);
    }

    if (ID === "0") {
      const res = (await axios.get(env.apiUrl + `search`)).data;
      setListVacancy(res);
    }
  }, [ID])

  return (
    <div >
      <Navbar userID={UserID} />

      {(ID === "0") && ListVacancy.length > 0 && <List list={ListVacancy} userID={UserID} />}

      {ID > 0 &&
        <Detail
          nome={Nome}
          desc={Desc}
          email={Email}
          empresa={Empresa}
        />
      }

    </div>
  )
}