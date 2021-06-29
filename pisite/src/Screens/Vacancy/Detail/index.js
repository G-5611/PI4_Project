import React from "react";

export const Detail = ({
  nome,
  empresa,
  tipo,
  local,
  email,
  telefone,
  desc
}) => {


  return (

    <div className="panel-profile">

      <h3>Vaga de Emprego</h3>

      <br />

      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-left"><b>Nome:</b></label>
        <div className="col-sm-7">
          <div className="form-control-plaintext text-left">{nome}</div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-left"><b>Empresa:</b></label>
        <div className="col-sm-7">
          <div className="form-control-plaintext text-left">{empresa}</div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-left"><b>Tipo:</b></label>
        <div className="col-sm-7">
          <div className="form-control-plaintext text-left">{tipo}</div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-left"><b>Local:</b></label>
        <div className="col-sm-7">
          <div className="form-control-plaintext text-left">{local}</div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-left"><b>Email:</b></label>
        <div className="col-sm-7">
          <div className="form-control-plaintext text-left">{email}</div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-left"><b>Telefone:</b></label>
        <div className="col-sm-7">
          <div className="form-control-plaintext text-left">{telefone}</div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label text-left"><b>Descricao:</b></label>
        <div className="col-sm-7">
          <div className="form-control-plaintext text-left">{desc}</div>
        </div>
      </div>


    </div>

  )
}