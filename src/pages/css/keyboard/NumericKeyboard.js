import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NumericKeyboard = ({ onConfirm, maxLength = 5 }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleKeyPress = (value) => {
    if (inputValue.length >= maxLength) return;
    
    // 防止以0开头
    if (inputValue === '' && value === '0') return;
    
    setInputValue(prev => prev + value);
  };
  
  const handleDelete = () => {
    setInputValue(prev => prev.slice(0, -1));
  };
  
  const handleConfirm = () => {
    onConfirm && onConfirm(inputValue);
    setInputValue('');
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.display}>{inputValue || '0'}</div>
      
      <div style={styles.keyboard}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '←'].map((key) => (
          <button
            key={key}
            style={styles.key}
            onClick={() => {
              if (key === '←') handleDelete();
              else if (key === '.' && inputValue.includes('.')) return;
              else handleKeyPress(key.toString());
            }}
          >
            {key}
          </button>
        ))}
        
        <button 
          style={{ ...styles.key, ...styles.confirmKey }}
          onClick={handleConfirm}
        >
          确认
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  display: {
    height: '50px',
    lineHeight: '50px',
    textAlign: 'right',
    padding: '0 15px',
    fontSize: '24px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    borderRadius: '5px'
  },
  keyboard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
  },
  key: {
    height: '50px',
    fontSize: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    background: '#fff',
    cursor: 'pointer'
  },
  confirmKey: {
    gridColumn: 'span 3',
    background: '#1890ff',
    color: '#fff'
  }
};

NumericKeyboard.propTypes = {
  onConfirm: PropTypes.func,
  maxLength: PropTypes.number
};

export default NumericKeyboard;