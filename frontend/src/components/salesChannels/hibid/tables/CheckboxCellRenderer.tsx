import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

const CheckboxCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { node } = props;
    const newValue = event.target.checked;
    node.setSelected(newValue);
    event.stopPropagation();
  };

  const handleCellClick = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLInputElement) {
      // If the click was on the checkbox, let the onChange handler deal with it
      return;
    }
    const { node } = props;
    node.setSelected(!node.isSelected());
  };

  return (
    <div 
      onClick={handleCellClick} 
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <input
        type="checkbox"
        checked={props.node.isSelected()}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default CheckboxCellRenderer;