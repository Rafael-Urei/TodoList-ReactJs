export const Modal = ({ handleChangeModal,  handleRemove }) => {
    return (
        <div className='modal' onClick={handleChangeModal}>
            <div className="overlay"></div>
            <div className="modal-content">
                <h1>Are you sure?</h1>
                <p>What's done cannot be undone!</p>
                <div className="button-container">
                    <button onClick={handleRemove}>Yes</button>
                    <button onClick={handleChangeModal}>No</button>
                </div>
            </div>
        </div>
    )
};