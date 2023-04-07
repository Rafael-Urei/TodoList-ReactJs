import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import { BsCheck2 as Check } from 'react-icons/bs';
import { useForm } from 'react-hook-form';



export default function App() {

  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log('Renderizei')
  };

  const handleAddTasks = () => {
    value !== '' && setTasks(prev => {
      return [
        ...prev,
        {
          id: uuid(),
          value: value,
          checked: false,
          deleted: false,
          done: false,
        }
      ]
    })
    setValue('');
  };

  const handleDelete = (id) => {
    const newArr = tasks.filter(object => {
      if (object.id === id) {
        return false;
      } else {
        return true;
      }
    })

    const newArr2 = tasks.map(object => {
      if (object.id === id) {
        return {
          ...object,
          deleted: !object.deleted
        }
      } else {
        return object;
      }
    })
    setTasks(newArr2);
    setTimeout(() => {
      setTasks(newArr);
    }, 200)
  };

  const handleCheck = (id) => {
    const newArr = tasks.map(object => object.id === id ? {...object, checked: !object.checked } : object)
    setTasks(newArr);
    console.log(tasks);
  };

  const filteredTasks = tasks.filter(object => object.value.includes(search));

  return (
    <div className='App'>
      <main>
        <header>
          <h1>To do list</h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='task'>Type your task:</label>
          <input type='text' placeholder='Set your task...' value={value} autoComplete='no' {...register('task')} onChange={(e) => setValue(e.target.value)} />
          <button type='submit' title='Add task' onClick={handleAddTasks}>Add task</button>
          <label>Search for a task:</label>
          <input type='search' placeholder='Search task...' value={search} autoComplete='no' onChange={(e) => setSearch(e.target.value)}></input>
        </form>
        <ul>
          {
            search.length > 0
            ?
            filteredTasks.map(object => {
              return (
                <>
                  <li key={object.id} className={ object.checked ? 'li3' : object.deleted ? 'li2' : 'li' } >
                    <Check className='check' onClick={() => handleCheck(object.id)}/>
                    {object.value}
                    <button onClick={() => handleDelete(object.id)}>Delete</button>
                  </li>
                </>
              )
            })
            :
            tasks.map((object) => {
              return (
                <>
                  <li key={object.id} className={ object.checked ? 'li3' : object.deleted ? 'li2' : 'li' } >
                    <Check className='check' onClick={() => handleCheck(object.id)}/>
                    {object.value}
                    <button onClick={() => handleDelete(object.id)}>Delete</button>
                  </li>
                </>
              )
            })
          }
        </ul>
        <div>
          <button onClick={() => setTasks([])}>Delete All</button>
        </div>
      </main>
    </div>
  )
}

// ------------------ Main Code ------------------