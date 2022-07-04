import React, { useState } from 'react';
import confirm from '../../../assets/confirm.svg'
import cancel from '../../../assets/cancel.svg';
import edit from '../../../assets/edit.svg'

function Input(props) {
    const [state, setState] = useState({
        edit: false,
        value: props.val
    });

    const handleEditClick = e => {
        setState({
            ...state,
            edit: true
        })
    }

    const handleEdit = e => {
        const str = `${props.name}Input`;
        setState({
            ...state,
            value: e.target.value
        }, document.getElementById(str).value = state);
    }

    const handleCancel = e => {
        setState({
            edit: false,
            value: props.val
        })
    }

    return (
        <React.Fragment>
            <div className='flex justify-center mt-12 place-items-center' id={`${props.name}Container`}>
                <p className='text-lg'>{props.title}</p>
                {!state.edit ? 
                     <React.Fragment>
                        <p id={props.name} className='ml-8 text-lg'>{props.val}</p>
                        <a className="hover:cursor-pointer" id={`${props.name}Edit`} name={`${props.name}`} onClick={e => handleEditClick(e)}><img src={edit} name='first' className='w-8 h-8 ml-8'/></a>
                     </React.Fragment> : 
                    <React.Fragment>
                        <input type='text' id={`${props.name}Input`} value={props.val} onChange={e => handleEdit(e)} />
                        <a className="hover:cursor-pointer" onClick={e => handleCancel(e)}><img src={cancel} className='w-8 h-8 ml-8'/></a>
                        <a className="hover:cursor-pointer" onClick={e => handleEditClick(e)}><img src={confirm} name='first' className='w-8 h-8 ml-8'/></a>
                    </React.Fragment>
                     
                }
            </div>
        </React.Fragment>
    )
}

export default Input;