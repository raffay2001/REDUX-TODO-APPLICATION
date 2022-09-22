import React, { useEffect, useState } from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { format } from 'date-fns/esm';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../slices/todoSlice';
import { toast } from 'react-hot-toast';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';
import { updateTodo } from '../slices/todoSlice';

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    useEffect(() => {
        if (todo.status === 'complete') {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [todo.status]);

    const handleDelete = () => {
        // console.log('Deleting....');
        dispatch(deleteTodo(todo.id));
        toast.success('Todo Deleted Successfully.');
    }

    const handleUpdate = () => {
        // console.log('Updating....');
        setUpdateModalOpen(true);
    }

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete'
        }))
    }

    return (
        <>
            <div className={styles.item}>
                <div className={styles.todoDetails}>
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className={styles.texts}>
                        <p className={getClasses([styles.todoText, todo.status === 'complete' && styles['todoText--completed']])}>{todo.title}</p>
                        <p className={styles.time}>{format(new Date(todo.time), 'p, MM/dd/yyyy')}</p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div
                        className={styles.icon}
                        onClick={handleDelete}
                        onKeyDown={handleDelete}
                        role='button'
                        tabIndex={0}
                    >
                        <MdDelete />
                    </div>
                    <div
                        className={styles.icon}
                        onClick={handleUpdate}
                        onKeyDown={handleUpdate}
                        role='button'
                        tabIndex={0}
                    >
                        <MdEdit />
                    </div>
                </div>
            </div>
            <TodoModal type='update' todo={todo} modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}></TodoModal>
        </>
    );
}

export default TodoItem;