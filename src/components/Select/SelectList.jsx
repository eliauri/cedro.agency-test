import React, { useEffect, useId, useState } from 'react'

import styles from './locationFilter.module.scss'

const SelectList = ({ options, activeTab, setSelectedList, selectedList }) => {
    return (
        <div className={styles.locationList}>
            <div className={styles.locationList__wrapper}>
                {options[activeTab].locations.map((location) => {
                    return (
                        <SelectItem
                            key={location.id + "" + options[activeTab].label}
                            data={location}
                            parent={options[activeTab].label}
                            selectedList={selectedList}
                            setSelectedList={setSelectedList}
                        />
                    )
                }
                )}
            </div>
            <div className={styles.gradient}></div>
        </div>
    )
}

const SelectItem = ({ data, parent, setSelectedList, selectedList }) => {
    const checkboxId = useId();
    const itemId = parent + "" + data.id;

    const isChecked = () => Boolean(selectedList.find((selected) => selected.id == itemId))
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked)
    }, [selectedList])

    const handleChange = (event) => {
        let updateList = [...selectedList];
        if (event.target.checked) {
            updateList = [...selectedList, {
                id: itemId,
                parent: parent,
                label: event.target.value,
            }];
        } else updateList = selectedList.filter((item) => item.id != itemId)

        setSelectedList(updateList);
    }

    return (
        <div className={styles.locationItem}>
            <input
                id={checkboxId}
                className={styles.checkbox}
                type="checkbox"
                value={data.label}
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor={checkboxId}> {data.label}</label>
        </div>
    )
}

export default SelectList;