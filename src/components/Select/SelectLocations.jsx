import React, { useEffect, useId, useRef, useState } from 'react'

import styles from './locationFilter.module.scss'
import cn from 'classnames';

const isScrollBottom = (event) => {
    if (event.target.scrollTop + event.target.clientHeight !== event.target.scrollHeight) {
        return true
    }
    return false
}

const SelectLocations = ({ options, activeTab, setSelectedList, selectedList, selectIsOpened }) => {
    const [isShadow, setShadow] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        ref.current.clientHeight == ref.current.scrollHeight ?
            setShadow(false) :
            setShadow(true);
    }, [activeTab, selectIsOpened])

    const scrollHandler = (event) => {
        setShadow(isScrollBottom(event))
    }
    return (
        <div className={styles.locations}>
            <div className={styles.locations__wrapper} onScroll={scrollHandler} ref={ref}>
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
            <div className={cn(styles.locations__shadow, isShadow && styles.active)}></div>
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
        <div className={styles.locations__item} >
            {data.label}
            <input
                id={checkboxId}
                className={styles.checkbox}
                type="checkbox"
                value={data.label}
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor={checkboxId}> </label>
        </div>
    )
}

export default SelectLocations;