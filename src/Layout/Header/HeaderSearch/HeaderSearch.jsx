import React from 'react';
import {BiSearchAlt} from "react-icons/bi";
import {useTranslation} from "react-i18next";


const HeaderSearch = () => {

    const {t} = useTranslation()

    return (
        <label className="header__label">
            <BiSearchAlt className="header__search"/>
            <input className="header__input" type="text" placeholder={t('header.field')}/>
        </label>
    );
};

export default HeaderSearch;