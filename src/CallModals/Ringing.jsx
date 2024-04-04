import React from 'react';
import { Modal } from 'antd';
import { Phone, PhoneOff } from 'feather-icons-react/build/IconComponents';
import { IMG01 } from '../client/components/home/image';
import { useCallModalStore } from '../callModalStore';
const Ringing = ({ rejectCall }) => {
    const {showRingingModal}=useCallModalStore()
    return (
        <Modal centered
            visible={showRingingModal}
            styles={{
                content: {
                    height: "100%",
                    borderRadius: "25px",
                    backgroundColor: "#d3e6ec",
                },
            }}
            okButtonProps={{
                disabled: true,
                style: {
                    display: "none",
                },
            }}
            cancelButtonProps={{
                disabled: true,
                style: {
                    display: "none",
                },
            }}
            closable={false}
            className="ant-modal">

            <div className="modal-content">
                <div className="modal-body">
                    <div className="call-box incoming-box">
                        <div className="call-wrapper">
                            <div className="call-inner">
                                <div className="call-user">
                                    <img
                                        alt="User"
                                        src={IMG01}
                                        className="call-avatar"
                                    />
                                    <h4>Dr. Darren Elder</h4>
                                    <span>Connecting...</span>
                                </div>
                                <audio autoPlay loop>
                                    <source src="/ringing.mp3" />
                                </audio>
                                <div className="call-items">
                                    <button
                                        onClick={() => rejectCall()}
                                        className="btn call-item call-end"
                                    >
                                        <PhoneOff />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Ringing;
