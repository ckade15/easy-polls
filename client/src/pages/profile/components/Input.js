import React, { useEffect, useState, useContext } from 'react';
import confirm from '../../../assets/confirm.svg'
import cancel from '../../../assets/cancel.svg';
import edit from '../../../assets/edit.svg';
import utils from '../utils';

function Input(props) {
    const [state, setState] = useState({
        edit: false,
        value: props.val,
        load: true
    });

    const handleEditClick = e => {
        setState({
            ...state,
            edit: true,
            value: props.val
        })
    }

    const handleEdit = e => {
        setState({
            ...state,
            value: e.target.value
        });
    }

    const handleCancel = e => {
        setState({
            edit: false,
            value: props.val
        })
    }

    const handleConfirm = async e => {
        e.preventDefault();

        const response = await utils.confirm(props.id, props.name, state.value).then(response => console.log(response)).catch(err => console.error);
        setState({
            ...state,
            edit: false
        })
        
    }

    useEffect(()=> {
        
        setState({
            ...state,
            load: false,
            value: props.val
        })
    }, [state.load])

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
                        {state.load ? <></> : <></>}
                        <input type='text' id={`${props.name}Input`} value={state.value} onChange={e => handleEdit(e)} 
                        className="ml-8 rounded-md p-1 shadow-md "
                        />
                        <a className="hover:cursor-pointer" onClick={e => handleCancel(e)}><img src={cancel} className='w-8 h-8 ml-8'/></a>
                        <a className="hover:cursor-pointer" onClick={e => handleConfirm(e)}><img src={confirm} name='first' className='w-8 h-8 ml-8'/></a>
                    </React.Fragment>
                     
                }
            </div>
        </React.Fragment>
    )
}

export default Input;