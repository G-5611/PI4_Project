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

  useEffect(() => {
    setID(defaultprops.match.params.id || "")
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

    if (ID === "") {
      const res = (await axios.get(env.apiUrl + `search`)).data;
      setListVacancy(res);
    }

    console.log(ID)

  }, [ID])

  return (
    <div >
      <Navbar />

      {ID === "" && ListVacancy.length > 0 && <List list={ListVacancy} />}

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