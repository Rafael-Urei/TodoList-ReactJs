import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import { AiOutlinePlus, AiFillEdit } from 'react-icons/ai';
import { BiSquareRounded, BiTrash } from 'react-icons/bi';
import { RxEyeNone } from 'react-icons/rx';

const Text = ({ handleEditTask, handleNewValue, newValue, item}) => {
  return (
    <>
      <textarea className='description-input' autoFocus placeholder='New task...' autoComplete='no' onChange={handleNewValue} ></textarea>
      <button type='button' className='edit-button' onClick={handleEditTask}>
        <AiFillEdit></AiFillEdit>
      </button>
    </>
  )
};

const Li = (props) => {
  return (
    <>
      <div className='li-container'>

        <li className={props.item.done ? 'done' : 'li'}>{`${props.index}: ${props.item.value}`}
        <button type='button' onClick={props.handleShowDropdown}>Edit</button>
        </li>
        <BiSquareRounded className={`'checkbox-off' ${props.item.checked ? 'checkbox-on' : 'checkbox-off'}`} onClick={props.handleChange}/>
        {props.item.state ? 
        <div className='popup'>
          <Text handleEditTask={props.handleEditTask} handleNewValue={props.handleNewValue} newValue={props.newValue} item={props.item}/>
        </div> : null}
        
      </div>
    </>
  )
};

export default function App() {

  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newValue, setNewValue] = useState('');

  const handleGetValue = e => setInputValue(e.target.value);

  const handleNewValue = e => setNewValue(e.target.value);

  const handleEditTask = (key) => {
    const editedTasks = tasks.map(object  => object.key === key ? { ...object, value: newValue, state: !object.state } : object);
    { newValue !== '' ?
      setTasks(editedTasks)
      : alert('Input cannot be blank!')
    }
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    inputValue !== '' ?
      setTasks(prevState => {
        return [
          ...prevState,
          {
            key: uuid(),
            value: inputValue,
            state: false,
            checked: false,
            done: false
          }
        ]
      }) : alert('Input field cannot be blank!');
      setInputValue('');
  };

  const handleShowDropdown = (key) => {
    setTasks(prevState => {
      return prevState.map(object => {
        if (object.key === key) {
          return {
            ...object,
            state: !object.state,
          }
        } else {
          return object;
        }
      });
    });
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const newList = tasks.filter(object => object.checked ? false : true);
    setTasks(newList);
  };

  const handleChange = (key) => {
    const newList = tasks.map(object => object.key === key ? { ...object, checked: !object.checked } : object)
    setTasks(newList);
  };

  const handleDoneTask = (key) => {
    const newlist = tasks.map((object) => {
      if (object.key === key) {
        return {
          ...object,
          done: !object.done
        }
      } else {
        return object
      }
    })
    setTasks(newlist);
  };

  return (
    <div className='App'>
      <main>
        <form onSubmit={handleAddTask}>
          <input className='input' type='text' name='input' value={inputValue} placeholder='e.g. Study React.JS' autoComplete='no' onChange={handleGetValue}></input>
          <button type='submit' className='add-button' onClick={handleAddTask}><AiOutlinePlus/> Add Task</button>
        </form>
        <div className='list-container'>
          <ul>

              {tasks.length === 0 ? 
                <>
                  <RxEyeNone className='no-posts'/>
                  <p>There are no posts yet!</p>
                </> :
                tasks.map((item, index) => {
                  return (
                    <>
                      <Li key={item.key} item={item} index={index} handleShowDropdown={() => handleShowDropdown(item.key)} handleChange={() => {handleChange(item.key)}}
                      handleEditTask={() => handleEditTask(item.key)} handleNewValue={handleNewValue} newValue={newValue} 
                      >
                      </Li>
                      <button type='checkbox' className='done-button' onClick={() => handleDoneTask(item.key)}>{ item.done ? 'Undone' : 'Done'}</button>
                    </>
                  )
                })
              }

          </ul>
        </div>
          <button type='button' onClick={handleRemove} className='remove-button'><BiTrash/> Remove checked</button>
      </main>
    </div>
  )
}
