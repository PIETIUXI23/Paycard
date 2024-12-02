import React from 'react';
// import '~/Content/Custom.min.css';

const WaitingModal = () => {
    return (
        <div id="waiting" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Thông báo</h4>
                    </div>
                    <div className="modal-body">
                        <p>Đang xử lý. Xin vui lòng chờ trong giây lát.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingModal;
