import React, { useState } from 'react'

import cn from 'classnames';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import search from '../../assets/svg/search.svg'
import styles from './locationFilter.module.scss'
import TagsList from './TagsList';
import SelectTabs from './SelectTabs';
import SelectLocations from './SelectLocations';

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
                <div className={styles.dropdown__header}>
                    <SelectTabs
                        options={options}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
                <TagsList
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    activeTab={activeTab}
                    options={options}
                />
                <SelectLocations
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    options={options}
                    activeTab={activeTab}
                    selectIsOpened={opened}
                />
            </div>
        </div>
    )
}

export default Select