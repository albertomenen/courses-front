import React from 'react';

function Switch({checked, onChange, name}) {
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
      <span className="label-text">Ponlo en azul para confirmar que eres instructor</span>
    </div>
  );
}

export default Switch;
