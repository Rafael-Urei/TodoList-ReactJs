export const Modal = (props) => {
    return (
        <div className='modal'>
            <div className={ props.changeMode ? 'white-modal-content' : 'modal-content' }>
                <h1>Are you sure?</h1>
                <p>What's done cannot be undone!</p>
                <div className="button-container">
                    <button id="btn1" onClick={props.handleRemove}>Yes</button>
                    <button id="btn2" onClick={() => props.setModal(!props.modal)}>No</button>
                </div>
            </div>
        </div>
    )
};