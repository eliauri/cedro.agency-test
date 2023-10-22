import React from 'react';

import cn from 'classnames';

import styles from './locationFilter.module.scss'

const SelectTabs = ({ options, activeTab, setActiveTab }) => {
    return (
        <div className={styles.dropdown__header}>
            <div className={styles.tabs}>
                {options.map((area) =>
                    <div
                        key={area.id}
                        className={cn(styles.tab, area.id === activeTab && styles.active)}
                        onClick={() => setActiveTab(area.id)}
                    >
                        {area.label}
                    </div>)}
            </div>
        </div>
    )
}

export default SelectTabs