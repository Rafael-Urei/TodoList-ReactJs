import { BiSquareRounded } from 'react-icons/bi';
import { Text } from './text';

export const Li = (props) => {
    return (
      <>
        <div className='list-container'>
          <li key={props.item.key} className={props.item.done ? 'done-item' : 'list-item'}>
            {`${props.index+1} - ${props.item.value}`}
          </li>
          <BiSquareRounded className={`'checkbox-off' ${props.item.checked ? 'checkbox-on' : 'checkbox-off'}`} onClick={props.handleChange}/>
          <button type='button'onClick={props.handleShowDropdown}>{props.item.state ? 'X' : 'Edit'}</button>
          {props.item.state ? 
          <div className='popup'>
            <Text
              handleEditTask={props.handleEditTask}
              handleNewValue={props.handleNewValue}
              newValue={props.newValue}
              item={props.item}
            />
          </div> : null}
        </div>
      </>
    )
  };