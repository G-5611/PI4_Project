import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({
  userID,
  results,
  width
}) => {
  if (results.length === 0) {
    return null
  }
  return (
    <div id={"search-results"} className={"d-flex justify-content-end w-100"} style={{ "padding": "8px 31px", "position": "absolute" }}>
      <ul className={"list-group"} style={{ "border": "1px solid #000", "maxWidth": width }}>
        <h4>Resultados:</h4>
        {results.map((x, index) => {
          return (
            <li className={"list-group-item"} key={index}>
              <Link className={"btn btn-link"} to={`/vacancy/${userID}/${x.id}`}>
                {x.vaga} - {x.empresa}
              </Link>
            </li>
          );
        })}
        <li className={"list-group-item"}>
          <Link className={"btn btn-link"} to={`/vacancy/${userID}/0`}>
            {"Visualizar Todas"}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SearchResults;