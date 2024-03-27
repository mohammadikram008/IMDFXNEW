import React from 'react';
import './RingingCS.css'; // Import CSS file for styling

const Ringing = ({ callerName, onAcceptCall, onRejectCall, onCloseModal }) => {
    return (
        <div className="call-modal-backdrop" onClick={onCloseModal}>
            <div className="call-modal" onClick={(e) => e.stopPropagation()}>
                <div className="call-modal-content">
                    <div className="call-modal-header">
                        <div className="caller-avatar"></div>
                        <h2> {callerName} </h2>
                        <h2>is Calling you</h2>
                        {/* <button className="close-button" onClick={onCloseModal}>
                            <i className="fas fa-times"></i>
                        </button> */}
                    
                    {/* <div className="call-modal-body">
                        <div className="call-icons">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                    </div> */}
                    <div className="call-modal-footer">
                        <button className="reject-button" onClick={onRejectCall}>Reject</button>
                        <button className="accept-button mx-2" onClick={onAcceptCall}>Accept</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ringing;