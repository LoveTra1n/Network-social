import React from 'react';
import {Link} from "react-router-dom"
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import {BsBellFill} from 'react-icons/bs'
import {SlSettings} from 'react-icons/sl'
import {BsPalette} from 'react-icons/bs'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import {AiOutlineLogout} from 'react-icons/ai'
import {BsChevronDoubleDown} from 'react-icons/bs';
import SwitchLang from "./SwitchLang/SwitchLang";
import { Icon } from '@chakra-ui/react'
import {Avatar} from "@chakra-ui/react";
import {logOut} from "../../redux/reducers/user";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    Button
} from '@chakra-ui/react'

import {GoPrimitiveDot} from "react-icons/go";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {notificationSelector, userSelector} from "../../redux/reselect";

const Header = () => {

    const dispatch = useDispatch()

    const {user} = useSelector(userSelector)

    const {data} = useSelector(notificationSelector)

    const {t} = useTranslation()

    return (
        <header className="header">
            <div className="container">
                <nav className="header__nav">
                    <div className="header__left">
                        <h1 className="header__title">PAGELOOK</h1>
                        <HeaderSearch/>
                        <SwitchLang/>
                    </div>

                    <div className="header__right">
                        <Link to="notifications" className="header__box">
                            <BsBellFill className="header__notify"/>
                            <span className="header__count">{data.length}</span>
                        </Link>

                        <Popover closeOnBlur={true} placement='bottom-start' isLazy>
                            <PopoverTrigger >
                                <Button className="header__user">
                                    <Avatar name={`${user.name} ${user.surname}`} src={`http://localhost:4444${user.image}`}/>
                                    <BsChevronDoubleDown className="header__down"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="popover">
                                <PopoverArrow  bg="#424242"/>
                                <div className="popover__me">
                                    <Avatar name={`${user.name} ${user.surname}`} src={`http://localhost:4444${user.image}`}/>
                                    <div className="popover__me-right">
                                        <h2 className="popover__me-name">{user.name} {user.surname}</h2>
                                        <p className="popover__me-tel">{user.phone}</p>
                                        <p className="popover__me-safe blueLink">
                                            <GoPrimitiveDot size={10} fill="#ffa000" color="#939393"/>
                                            {t('header.safe')}
                                        </p>
                                    </div>
                                </div>

                                <ul className="popover__list">
                                    <li className="popover__item">
                                        <Icon as={SlSettings} className="popover__item-icon" />
                                        {t('header.options')}
                                    </li>

                                    <li className="popover__item">
                                        <Icon as={BsPalette} className="popover__item-icon" />
                                        {t('header.face')}
                                    </li>

                                    <li className="popover__item">
                                        <Icon as={AiOutlineQuestionCircle} className="popover__item-icon" />
                                        {t('header.help')}
                                    </li>

                                    <li className="popover__item" onClick={() => dispatch(logOut())}>
                                        <Icon as={AiOutlineLogout} className="popover__item-icon" />
                                        {t('header.out')}
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;