import { BiSquareRounded } from 'react-icons/bi';
import { Text } from './text';
import { AiOutlineEdit } from 'react-icons/ai';

export const Li = ({ 
  item, 
  handleChange,
  handleShowDropdown,
  handleNewValue,
  handleEditTask,
  newValue
}) => {

    return (
      <>
        <li key={item.key} className={ item.done ? 'item-list' : undefined }>
          {`${item.value}`}
          <div  className='elements-li'>
            { !item.state ? <BiSquareRounded className={`'checkbox-off' ${item.checked ? 'checkbox-on' : 'checkbox-off'}`} onClick={handleChange}/> : null }
            { !item.done ? <button type='button'onClick={handleShowDropdown}>{item.state ? 'X' : <AiOutlineEdit/>}</button> : null }
          </div>
        </li>
        {item.state ? 
        <div className='popup'>
          <Text
            handleEditTask={handleEditTask}
            handleNewValue={handleNewValue}
            newValue={newValue}
            item={item}
          />
        </div> : null}
      </>
    )
  };