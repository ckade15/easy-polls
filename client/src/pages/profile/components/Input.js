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
        {state.value === '' ? setState({
            ...state,
            edit: true,
            value: props.val
        }) : setState({
            ...state,
            edit: true,
            value: state.value
        })}
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

        const response = await utils.confirm(props.id, props.name, state.value).then(response => props.setContext({
            _id: response.data.updateUser._id,
            firstName: response.data.updateUser.firstName,
            lastName: response.data.updateUser.lastName,
            email: response.data.updateUser.email,
            sessionToken: response.data.updateUser.sessionToken,
            signedIn: true
        })).catch(err => console.error);
        props.setContext({
            ...props.context,
            [props.name]: state.value
        })
        setState({
            ...state,
            edit: false
        });
        
        
    }


    return (
        <React.Fragment>
            <div className='flex justify-center mt-12 place-items-center' id={`${props.name}Container`}>
                <p className='text-lg'>{props.title}</p>
                {!state.edit ? 
                     <React.Fragment>
                        {state.value.length === 0 ? 
                        <p id={props.name} className='ml-8 text-lg'>{props.val}</p> :
                        <p id={props.name} className='ml-8 text-lg'>{state.value}</p>}
                        
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