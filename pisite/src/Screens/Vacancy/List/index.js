import React from "react";
import { Link } from "react-router-dom";

export const List = ({
  list
}) => {
  if (list.length === 0) {
    return null
  }
  return (
    <div id={"search-results"} className={"d-flex justify-content-center w-100"} style={{ "padding": "8px 31px" }}>
      <ul className={"list-group"}>
        <h4>Vagas Disponiveis:</h4>
        {list.map((x, index) => {
          return (
            <li className={"list-group-item"} key={index}>
              <Link className={"btn btn-link"} to={`/vacancy/${x.id}`}>
                {x.vaga} - {x.empresa}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
