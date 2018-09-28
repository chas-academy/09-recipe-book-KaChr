import React from 'react';
import './successMessage.css';

export function successHandler(message) {
  return <h4 className="success-message">{message}</h4>
}