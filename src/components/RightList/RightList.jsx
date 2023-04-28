import React from 'react';
import {BiChevronsDown} from "react-icons/bi";
import {useTranslation} from "react-i18next";

const RightList = () => {

    const {t} = useTranslation()


    return (
        <ul className="friends__right-list">
            <li className="friends__right-item active">
                {t('right.myFriends')}
                <BiChevronsDown/>
            </li>

            <li className="friends__right-item">
                {t('right.request')}
                <BiChevronsDown/>
            </li>

            <li className="friends__right-item">
                {t('right.searchFriends')}
                <BiChevronsDown/>
            </li>
        </ul>
    );
};

export default RightList;