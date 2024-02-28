import React from 'react'

const Modal = ({ isOpen, onClose, children })=> {
    if (!isOpen) return null;
    return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex:"2",
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 5,
            width: '80%',
            maxWidth: 500,
          }}>
            {children}
          </div>
        </div>
      );
}

export default Modal