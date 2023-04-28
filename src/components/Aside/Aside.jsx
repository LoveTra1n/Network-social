import React from 'react';
import {Link} from 'react-router-dom'
import {FaUserCircle} from "react-icons/fa"
import {FaUserFriends} from "react-icons/fa"
import {MdScheduleSend} from "react-icons/md"
import {MdOutlinePhotoLibrary} from "react-icons/md"
import {useTranslation} from "react-i18next";

const Aside = () => {

    const {t} = useTranslation()


    return (
        <aside className="aside">
            <div className="aside__list">
                <Link className="aside__link" to='myProfile'>
                    <FaUserCircle fill="#71AAEB" size={23}/>
                    {t('aside.myProfile')}
                </Link>
                <Link className="aside__link" to='friends'>
                    <FaUserFriends size={23} fill="#71aaeb"/>
                    {t('aside.friends')}
                </Link>
                <Link className="aside__link" to='requests'>
                    <MdScheduleSend size={23} fill="#71aaeb"/>
                    Запросы
                </Link>
                <Link className="aside__link" to='photos'>
                    <MdOutlinePhotoLibrary size={23} fill="#71aaeb"/>
                    Фотографии
                </Link>
            </div>
        </aside>
    );
};

export default Aside;