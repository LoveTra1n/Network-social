import React from 'react';
import {BiChevronsDown, BiSearchAlt} from "react-icons/bi";
import {useTranslation} from "react-i18next";


const Search = ({search,setSearch}) => {

    const {t} = useTranslation()


    return (
        <label className="friends__label">
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="friends__label-search"
                   placeholder={t('friends.search')} type="text"/>

            <span className="friends__label-option">
                {t('friends.options')}
                <BiChevronsDown/>
            </span>

            <span className="friends__label-btn"><BiSearchAlt fill="#828282" size={20}/></span>
        </label>

    );
};

export default Search;