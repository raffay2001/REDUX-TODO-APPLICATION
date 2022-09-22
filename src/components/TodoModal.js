import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';
import { v4 as uuid, v4 } from 'uuid';
import toast from 'react-hot-toast';

const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle('');
            setStatus('incomplete');
        }
    }, [type, todo, modalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            toast.error(`Please Enter a Title.`);
            return;
        }
        if (title && status) {
            if (type === 'add') {
                dispatch(addTodo({
                    id: v4(),
                    title,
                    status,
                    time: new Date().toLocaleString()
                }));
                toast.success('Task Added Successfully');
            }
            if (type === 'update') {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({
                        ...todo,
                        title,
                        status
                    }));
                    toast.success('Task Updated Successfully');
                } else {
                    toast.error('No Changes Made');
                }
            }
            setTitle('');
            setStatus('incomplete');
            setModalOpen(false);
        }
    }
    return (
        <>
            {modalOpen && (
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <div
                            className={styles.closeButton}
                            onClick={() => setModalOpen(false)}
                            onKeyDown={() => setModalOpen(false)}
                            tabIndex={0}
                            role="button"
                        >
                            <MdOutlineClose></MdOutlineClose>
                        </div>
                        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                            <h1 className={styles.formTitle}>{type === 'update' ? 'Update' : 'Add'} Task</h1>
                            <label htmlFor="title">
                                Title
                                <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <label htmlFor="status">
                                Status
                                <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="incomplete">Incomplete</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </label>
                            <div className={styles.buttonContainer}>
                                <Button type='submit' variant='primary'>{type === 'update' ? 'Update' : 'Add'} Task</Button>
                                <Button type='button' variant='secondary' onClick={() => setModalOpen(false)} onKeyDown={() => setModalOpen(false)}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default TodoModal;