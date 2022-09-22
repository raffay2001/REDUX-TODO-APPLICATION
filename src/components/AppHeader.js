import React from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';

const AppHeader = () => {
    return (
        <div className={styles.appHeader}>
            <Button variant='primary'>Add Task</Button>
            <SelectButton id="status">
                <option value="all">All</option>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
            </SelectButton>
            <TodoModal />
        </div>
    );
}

export default AppHeader;