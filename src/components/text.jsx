import { AiFillEdit } from 'react-icons/ai';

export const Text = ({ handleEditTask, handleNewValue }) => {
    return (
      <>
        <input autoFocus placeholder='New task...' autoComplete='no' onChange={handleNewValue}></input>
        <button type='button' onClick={handleEditTask}>
          <AiFillEdit></AiFillEdit>
        </button>
      </>
    )
  };