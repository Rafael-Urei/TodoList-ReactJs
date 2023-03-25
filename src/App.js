import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { BsCheck2, BsCheck2All, BsCardChecklist } from 'react-icons/bs';
import { RxEyeNone } from 'react-icons/rx';
import { Li } from '../src/components/li';
import { Modal } from '../src/components/modal';
import { MdDarkMode } from 'react-icons/md';
import { RiSunFill } from 'react-icons/ri';



export default function App() {

  // ------------------ States ------------------

  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [modal, setModal] = useState(false);
  const [changeMode, setChangeMode] = useState(false);

  // ------------------ States ------------------


  // ------------------ Functions ------------------

  const handleGetValue = e => setInputValue(e.target.value);
  const handleNewValue = e => setNewValue(e.target.value);

  const handleEditTask = (key) => {
    const editedTasks = tasks.map(object  => object.key === key ? { ...object, value: newValue, state: !object.state } : object );
    newValue !== '' ? setTasks(editedTasks) : alert('Input cannot be blank!')
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

  const handleRemove = () => {
    setModal(!modal);
    const newList = tasks.filter(object => object.checked ? false : true);
    modal && setTasks(newList)
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
        };
      } else {
        return object
      };
    });
    setTasks(newlist);
  };

  // ------------------ Functions ------------------

  // ------------------ Main Code ------------------

  return (
    <div className='App'>
      { modal ? <Modal handleRemove={handleRemove} modal={modal} setModal={setModal} changeMode={changeMode}/> : null }
      <button type='button' className='change-button' onClick={() => setChangeMode(!changeMode)}>{ changeMode ? <MdDarkMode/> : <RiSunFill/> }</button>
      <main className={ changeMode ? 'white-main' : null }>
        <form onSubmit={handleAddTask} className={ changeMode ? 'white-form' : null }>
          <BsCardChecklist className='icon-list'/>
          <input className='input' type='text' name='input' value={inputValue} placeholder='e.g. Study React.JS' autoComplete='no' onChange={handleGetValue}></input>
          <button type='submit' className='add-button' onClick={handleAddTask}><AiOutlinePlus/> Add Task</button>
        </form>
        <>
          <ol>
              {tasks.length === 0 ? 
                <>
                  <RxEyeNone className={ changeMode ? 'white-no-posts' : 'no-posts' }/>
                  <p>There are no tasks yet!</p>
                </> :
                tasks.map((item, index) => {
                  return (
                    <div className={ changeMode ? 'white-list-container' : 'list-container' }>
                      { !item.state ? <button className='done-button' onClick={() => handleDoneTask(item.key)}>{ item.done ? <BsCheck2All/> : <BsCheck2 className='check'/> }</button> : null }
                      <Li item={item} index={index} handleShowDropdown={() => handleShowDropdown(item.key)} handleChange={() => {handleChange(item.key)}}
                      handleEditTask={() => handleEditTask(item.key)} handleNewValue={handleNewValue} newValue={newValue} 
                      >
                      </Li>
                    </div>
                  )
                })
              }
          </ol>
        </>
          <button type='button' onClick={handleRemove} className='remove-button'><BiTrash/> Remove checked</button>
      </main>
    </div>
  )
}

// ------------------ Main Code ------------------