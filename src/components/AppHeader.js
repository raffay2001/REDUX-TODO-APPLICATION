import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterstatus } from '../slices/todoSlice';

const AppHeader = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const filterStatus = useSelector((state) => state.todo.filterStatus);
    const dispatch = useDispatch();

    const updateFilter = (e) => {
        console.log('Updating Select...');
        dispatch(updateFilterstatus(e.target.value));
    }

    return (
        <div className={styles.appHeader}>
            <Button variant='primary' onClick={() => setModalOpen(true)}>Add Task</Button>
            <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
                <option value="all">All</option>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
            </SelectButton>
            <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}

export default AppHeader;