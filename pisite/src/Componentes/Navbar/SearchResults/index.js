import React from "react";

const SearchResults = ({
  results,
  width
}) => {

  return (
    <div id={"search-results"} className={"d-flex justify-content-end w-100"} style={{ "padding": "8px 31px", "position": "absolute" }}>
      <ul className={"list-group"} style={{ "border": "1px solid #000", "maxWidth": width }}>
        <h4>Resultados:</h4>
        {results.map((x, index) => {
          return (
            <li className={"list-group-item"} key={index}>
              {x.vaga} - {x.empresa}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResults;