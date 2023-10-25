import React from 'react'

import cn from 'classnames';

import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import styles from './locationFilter.module.scss'
import close from '../../assets/svg/Close.svg'


const TagsList = ({ selectedList, setSelectedList, options, activeTab }) => {
    const scroll = useHorizontalScroll();
    const list = selectedList.filter((selected) => selected.parent == options[activeTab].label);

    return (
        <div className={cn(styles.tags, list.length && styles.active)} ref={scroll}>
            {list.map(item =>
                <SelectedItem data={item} key={item.id} setSelectedList={setSelectedList} selectedList={selectedList} />
            )}
        </div>
    )
}
const SelectedItem = ({ data, setSelectedList, selectedList }) => {
    const { label, id } = data;

    const deleteSelect = () => {
        setSelectedList(selectedList.filter((item) => item.id != id))
    }

    return (
        <div className={styles.tags__item}>
            <span>{label}</span>
            <img src={close} alt="" onClick={deleteSelect} />
        </div>
    )
}
export default TagsList