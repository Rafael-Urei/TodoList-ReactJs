import { BiSquareRounded } from 'react-icons/bi';
import { Text } from './text';
import { AiOutlineEdit } from 'react-icons/ai';

export const Li = (props) => {
    return (
      <>
        <li key={props.item.key} className={ props.item.done ? 'item-list' : undefined }>
          {`${props.item.value}`}
          <div  className='elements-li'>
            { !props.item.state ? <BiSquareRounded className={`'checkbox-off' ${props.item.checked ? 'checkbox-on' : 'checkbox-off'}`} onClick={props.handleChange}/> : null }
            { !props.item.done ? <button type='button'onClick={props.handleShowDropdown}>{props.item.state ? 'X' : <AiOutlineEdit/>}</button> : null }
          </div>
        </li>
        {props.item.state ? 
        <div className='popup'>
          <Text
            handleEditTask={props.handleEditTask}
            handleNewValue={props.handleNewValue}
            newValue={props.newValue}
            item={props.item}
          />
        </div> : null}
      </>
    )
  };