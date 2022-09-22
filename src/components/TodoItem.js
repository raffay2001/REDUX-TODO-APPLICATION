import React from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { format } from 'date-fns/esm';
import { MdDelete, MdEdit } from 'react-icons/md';

const TodoItem = ({ todo }) => {
    const handleDelete = () => {
        console.log('Deleting....');
    }
    const handleUpdate = () => {
        console.log('Updating....');
    }
    return (
        <div className={styles.item}>
            <div className={styles.todoDetails}>
                []
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
    );
}

export default TodoItem;