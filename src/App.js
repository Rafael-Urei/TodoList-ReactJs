import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import { AiOutlinePlus, AiFillEdit } from 'react-icons/ai';
import { BiSquareRounded, BiTrash } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
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





/*function DropDown({changeValue}) {
  return (
    <div className='dropdown' onClick={changeValue}>
      Edit
    </div>
  )
}

function App() {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddValue = e => setValue(e.target.value);

  const preventDefault = e => e.preventDefault();

  const handleAddTask = () => {
    { value !== '' ? 
      setTasks((prevState) => {
        return [
          ...prevState,
          {
            key: uuid(),
            value: value,
            checked: false,
          }
        ]
      })
      : alert('Input cannot be blank! Type something.');
    }
    setValue('');
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
    <div className="App">
      <main>
        <form onSubmit={preventDefault}>
          <input type='text' name='input' value={value} placeholder='e.g. Study React.JS' onChange={handleAddValue} className='input' autoComplete='none'></input>
          <AiOutlinePlus onClick={handleAddTask} className='add-button'/>
          <ul>
            { tasks.length === 0 ?
              <>
                <RxEyeNone className='no-posts'/>
                <p>There are no posts yet!</p>
              </> :
              tasks.map((item, index) => {
                return (
                  <li
                  key={item.key}
                  className={`'' ${item.checked ? 'task' : ''}`}
                  >
                  <div className='container'>
                  {`${index} - ${item.value}`}
                  <BiSquareRounded className={`'checkbox-off' ${item.checked ? 'checkbox-on' : 'checkbox-off'}`} onClick={() => handleChange(item.key)}/>
                  </div>
                  </li>
                )
              })
            }
            <BiTrash onClick={handleRemove} className='remove-button'/>
          </ul>
        </form>
      </main>
    </div>
  );
}

export default App;


function App() {
  const [value, setValue] = useState('');
  const [task, setTask] = useState([]);
  const [checked, setChecked] = useState([]);

  const handleAddValue = e => setValue(e.target.value);

  const preventDefault = e => e.preventDefault();

  const handleAddTask = () => {
    const newTask = value;
    value !== '' ? 
      setTask((prevState) => {
        return [
          ...prevState, 
          newTask
        ];
      }) : alert('Input cannot be blank!')
      setChecked((prevState) => {
        return [
          ...prevState,
          false
        ]
      })
  };

  const handleChange = (index) => {
    const updateCheck = checked.map((value, position, array) => {
      return position === index ? !value : value
    });

    setChecked(updateCheck);
  };

  const handleRemove = () => {
    const newArr = [];
    task.forEach((item, index) => {
      const toDelete = checked[index];
      if (!toDelete) {
        newArr.push(item);
      }
    });
    setTask(newArr)
  };

  console.log(checked);

  return (
    <div className="App">
      <form onSubmit={preventDefault}>
        <input type='text' name='input' placeholder='e.g. Study React.JS' onChange={handleAddValue}></input>
        <button onClick={handleAddTask}>Add task</button>
        { task.length !== 0 ?
          <ul>
            {task.map((value, index, array) => {
              return (
                <li key={index} className='task'>
                  { value } <input type='checkbox' checked={checked[index]} onChange={() => {handleChange(index)}}></input>
                </li>
              )
            })}
          </ul> :
          <p>Don't have posts yet</p> }
          <button onClick={handleRemove}>Remove</button>
      </form>
    </div>
  );
}

export default App;*/
