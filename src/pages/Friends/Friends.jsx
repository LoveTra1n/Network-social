import React, {useState} from 'react';
import {GoPrimitiveDot} from "react-icons/go"
import {HiUserAdd} from "react-icons/hi"
import {HiDotsHorizontal} from "react-icons/hi"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";
import Search from "../../components/Search/Search";
import RightList from "../../components/RightList/RightList";
import {useTranslation} from "react-i18next";


const Friends = () => {

    const {t} = useTranslation()

    const navigate = useNavigate()

    const [friend,setFriend] = useState('')


    return (
        <div className="friends">
            
            <div className="friends-middle">
                <div className="friends__top">
                        <div className="friends__top-left">
                            <p className={friend === "content1" ? "friends__top-all active" : "friends__top-all"}
                            onClick={() => setFriend("content1")}>
                                {t('friends.allFriends')}<span className="friends__top-all-count">48</span>
                            </p>

                            <p
                                className={friend === "content2" ? "friends__top-online active" : "friends__top-online"}
                                onClick={() => setFriend("content2")}>{t('friends.online')}  1</p>
                        </div>

                        <button className="friends__top-btn" onClick={() => navigate('/findFriends')}>{t('friends.find')}</button>
                    </div>

                <Search/>

                <ul className='friends__list'>


                        <li className="friends__user">
                            <img className="friends__user-img" src="https://sun9-40.userapi.com/impg/DQuJWS8GwVAqF7yAIOicZCfKSJ9TflbJLR4TKw/Pa98AM6G-nQ.jpg?size=1280x1280&quality=95&sign=9bcaa846623ffc0444770ff6555a67dd&c_uniq_tag=GsZZTdEhh26uAdEsUQNUWGJ0xrXUucSFR_0EyqzZ-A4&type=album" alt=""/>

                            <div className="friends__user-info">
                                <h3 className="friends__user-name">Татьяна Колосова</h3>

                                <div className="friends__user-links">
                                    <Link className="friends__user-blue">{t('friends.write')}</Link>
                                    <GoPrimitiveDot size={10} fill="#939393" color="#939393"/>
                                    <Link className="friends__user-blue">{t('friends.call')}</Link>
                                </div>
                            </div>
                            <HiDotsHorizontal size={30} fill="#939393" className="friends__user-other"/>
                        </li>

                        <li className="friends__user">
                            <img className="friends__user-img" src="https://sun9-52.userapi.com/impg/b6L0XEM8Qw-JVPJbeqeknP66sy_PBrs4QH0RKw/LicQRq0_F08.jpg?size=960x978&quality=95&sign=5778987146dfbbc7454c5343854a6c24&type=album" alt=""/>

                            <div className="friends__user-info">
                                <h3 className="friends__user-name">Ангелина Баркова</h3>

                                <div className="friends__user-links">
                                    <Link className="friends__user-blue">{t('friends.write')}</Link>
                                    <GoPrimitiveDot size={10} fill="#939393" color="#939393"/>
                                    <Link className="friends__user-blue">{t('friends.call')}</Link>
                                </div>
                            </div>
                            <HiDotsHorizontal size={30} fill="#939393" className="friends__user-other"/>
                        </li>

                    </ul>
            </div>
            
            <div className="friends__right">

                <RightList/>

                <ul className="friends__right-maybe">
                    <h3 className="friends__right-maybe-subtitle">
                        {t('friends.maybe')}
                    </h3>

                    <li className="friends__right-maybe-friend">
                        <img className="friends__right-maybe-img" src="https://sun9-16.userapi.com/impg/6aiuJ8StTEFicn8uRojew-qktQGJZl3ovOxrNg/czhoXOcDLEk.jpg?size=749x558&quality=95&sign=fa4ac2a9f9cdc4a319c6182104d42675&type=album" alt=""/>

                        <h2 className="friends__right-maybe-name">Поля Солевая</h2>

                        <HiUserAdd fill="#71aaeb" className="friends__right-maybe-icon"/>
                    </li>

                    <li className="friends__right-maybe-friend">
                        <img className="friends__right-maybe-img" src="https://sun9-55.userapi.com/impg/GnHINarUQGduocZy02eXYF8en7IBYWKhAfSmEg/E9eS_r8CGME.jpg?size=1074x1080&quality=95&sign=8161d8138ffbef408037dcb6a6e0eb2d&type=album" alt=""/>

                        <h2 className="friends__right-maybe-name">Лера Букина</h2>

                        <HiUserAdd fill="#71aaeb" className="friends__right-maybe-icon"/>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Friends;