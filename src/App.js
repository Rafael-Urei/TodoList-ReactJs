import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import { AiOutlinePlus, AiFillEdit } from 'react-icons/ai';
import { BiSquareRounded, BiTrash } from 'react-icons/bi';
import { RxEyeNone } from 'react-icons/rx';

const Text = ({ handleEditTask, handleNewValue }) => {
  return (
    <>
      <textarea className='description-input' placeholder='New task...' onChange={handleNewValue}></textarea>
      <AiFillEdit className='edit-button' onClick={handleEditTask}>Edit</AiFillEdit>
    </>
  )
};

const Li = ({ item, index, handleShowDropdown, handleChange, handleEditTask, handleNewValue }) => {
  return (
    <>
      <li className={item.state ? 'task' : 'li'} onClick={handleShowDropdown}>{`${index}: ${item.value}`}
      <BiSquareRounded className={`'checkbox-off' ${item.checked ? 'checkbox-on' : 'checkbox-off'}`} onClick={handleChange}/>
      </li>
      {item.state ? <div className='popup'><Text handleEditTask={handleEditTask} handleNewValue={handleNewValue}/></div> : null}
    </>
  )
};

export default function App() {

  const [input_value, setInput_value] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newValue, setNewValue] = useState('');

  const preventDefault = e => e.preventDefault();

  const handleGetValue = e => setInput_value(e.target.value);

  const handleNewValue = e => setNewValue(e.target.value);

  const handleEditTask = (key) => {
    const editedTasks = tasks.map(object  => object.key === key ? { ...object, value: newValue } : object);
    setTasks(editedTasks);
  }

  const handleAddTasks = () => {
    input_value !== '' ?
      setTasks(prevState => {
        return [
          ...prevState,
          {
            key: uuid(),
            value: input_value,
            state: false,
            checked: false
          }
        ]
      }) : alert('Input field cannot be blank!');
      setInput_value('');
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

  const handleRemove = () => {
    const newList = tasks.filter(object => object.checked ? false : true);
    setTasks(newList);
  };

  const handleChange = (key) => {
    const newList = tasks.map(object => object.key === key ? { ...object, checked: !object.checked } : object)
    setTasks(newList);
  };

  return (
    <div className='App'>
      <main>
        <form onSubmit={preventDefault}>
          <input className='input' type='text' name='input' value={input_value} placeholder='e.g. Study React.JS' onChange={handleGetValue}></input>
          <AiOutlinePlus className='add-button' onClick={handleAddTasks}/>
          <ul>
            {tasks.length === 0 ? 
              <>
                <RxEyeNone className='no-posts'/>
                <p>There are no posts yet!</p>
              </> :
              tasks.map((item, index) => {
                return (
                  <Li key={item.key} item={item} index={index} handleShowDropdown={() => handleShowDropdown(item.key)} handleChange={() => {handleChange(item.key)}}
                  handleEditTask={() => handleEditTask(item.key)} handleNewValue={handleNewValue}
                  >
                  </Li>
                )
              })
            }
          </ul>
          <BiTrash onClick={handleRemove} className='remove-button'/>
        </form>
      </main>
    </div>
  )
}
