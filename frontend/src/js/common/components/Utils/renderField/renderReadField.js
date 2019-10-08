import React from 'react';
import NumberFormat from 'react-number-format';
import Popup from "reactjs-popup";

export const RenderNumber = ({ value, decimalScale, className, suffix }) => {
  return (
    <NumberFormat
      className={className}
      decimalScale={decimalScale || 0}
      fixedDecimalScale
      value={value}
      thousandSeparator
      prefix=""
      suffix={suffix || ""}
      displayType="text"
    />
  );
};

export const RenderCurrency = ({ value, className }) => {
  return (
    <NumberFormat
      className={className}
      decimalScale={2}
      fixedDecimalScale
      value={value}
      thousandSeparator
      prefix="Q "
      displayType="text"
    />
  );
};

export const RenderCM = ({ value, className }) => {
    if (value){
        return (
            <NumberFormat
                className={className}
                decimalScale={2}
                fixedDecimalScale
                value={value}
                thousandSeparator
                prefix=""
                suffix=" cm"
                displayType="text"
            />
        );
    } else {
        return <span>---</span>
    }
};

export const RenderDateTime = ({ value, className }) => {
  if (value) {
    const fecha = new Date(value);
    return (
      <span className={className}>
        {fecha.toLocaleDateString()}
        {' '}
        {fecha.toLocaleTimeString()}
      </span>
    );
  }
  return (<span className={className}>{value}</span>);
};

export const formatActivo = (cell) => {
    if (cell){
        return <img src={require('assets/img/icons/activo.png')} alt="Activo" className="action_img" />
    } else {
        return <img src={require('assets/img/icons/inactivo.png')} alt="Inactivo" className="action_img"/>
    }
};

export const TooltipFormat = (cell, row) => {
    if (row.de_baja){
        return (
            <Popup
                trigger={<span className="tachado-touch">{cell.nombre ? cell.nombre : cell}</span>}
                position="top center"
                on="hover"
            >
                <span className="popup-title">FINCA DADA DE BAJA</span>
                <span className="popup-text">{row.justificacion_baja}</span>
            </Popup>
        )
    } else {
        return <span>{(cell && cell.nombre )? cell.nombre : cell}</span>
    }
};

export const ReadFields = {
  renderCurrency: RenderCurrency,
  renderNumber: RenderNumber,
};
