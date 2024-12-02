import React, { useState } from 'react';

const NoteModal = () => {
    const [note, setNote] = useState('');

    const handleSave = () => {
        console.log('Note Saved:', note);
    };

    return (
        <div id="NoteModal" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" style={{ width: '900px', height: '700px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ghi chú</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <textarea
                            id="Note"
                            rows="12"
                            cols="50"
                            className="form-control"
                            placeholder="Nội dung"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={handleSave}>
                            Lưu
                        </button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
