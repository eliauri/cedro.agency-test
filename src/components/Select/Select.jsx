import React, { useState } from 'react'

import cn from 'classnames';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import search from '../../assets/svg/search.svg'
import styles from './locationFilter.module.scss'
import SelectedList from './SelectedList';
import SelectTabs from './SelectTabs';
import SelectList from './SelectList';

const Select = ({ placeholder, options }) => {
    const [opened, setOpened] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedList, setSelectedList] = useState([]);

    const buttonHandleClick = () => {
        setOpened((prev) => !prev);
    }
    const ref = useOutsideClick(() => {
        if (!opened) return null;
        setOpened(false);
    });

    return (
        <div className={cn(styles.select, opened && styles.active)} ref={ref}>
            <button className={styles.button} onClick={buttonHandleClick}>
                <img src={search} />
                <span> {placeholder}</span>
                {selectedList.length > 0 && <div className={styles.button__counter}>{selectedList.length}</div>}
            </button>
            <div className={cn(styles.dropdown)} >
                <SelectTabs
                    options={options}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <SelectedList
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    activeTab={activeTab}
                    options={options}
                />
                <SelectList
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    options={options}
                    activeTab={activeTab}
                />
            </div>
        </div>
    )
}

export default Select