import React from 'react';
import {Avatar} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import { DeleteIcon,ArrowRightIcon } from '@chakra-ui/icons'
import {RiGalleryFill} from "react-icons/ri";
import {FaRegSmile} from "react-icons/fa";
import {BsPencil} from "react-icons/bs";
import {Button} from "@chakra-ui/react";


import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import {useTranslation} from "react-i18next";
import {userSelector} from "../../redux/reselect";



const MyProfile = () => {

    const {t} = useTranslation()

    const {user} = useSelector(userSelector)

    return (
        <section className="profile">

            <div className="profile__top">

                <Menu>
                    <MenuButton _expanded={{ bg: '#2b2b2d' }}  _hover={{ bg: '#444444' }} bg="#2b2b2d"  className="profile__top-edit" as={Button} leftIcon={<BsPencil size={20}/>}>
                        {t('myProfile.editFace')}
                    </MenuButton>
                    <MenuList className="profile__list"  bg="#2b2b2d" border="none">
                        <MenuItem className="profile__item" _hover={{ bg: '#444444' }} bg='transparent'><RiGalleryFill fill="#71aaeb" color='#71aaeb' size={25}/>{t('myProfile.upload')}</MenuItem>
                        <MenuItem className="profile__item" _hover={{ bg: '#444444' }} bg='transparent'><DeleteIcon color="red" boxSize={6}/>{t('myProfile.delete')}</MenuItem>
                    </MenuList>
                </Menu>

                <div className="profile__bottom">
                    <div className="profile__left">
                        <Avatar name={`${user.name} ${user.surname}`} className="profile__avatar" src={`http://localhost:4444${user.image}`}/>

                        <div className="profile__info">
                            <h2 className="profile__name">{user.name} {user.surname}</h2>

                            <p className="profile__about blueLink">{t('myProfile.infoMe')}<ArrowRightIcon boxSize={3} olor="71aaeb"/></p>
                        </div>

                    </div>

                    <div className="profile__right">

                        <button className="profile__right-btn">
                            {t('myProfile.editProfile')}
                        </button>

                        {/*<Menu>*/}
                        {/*    <MenuButton position="bottom" _expanded={{ bg: '#555555' }}  _hover={{ bg: '#777777' }} bg="#555555"  className="profile__right-btn" as={Button} rightIcon={<BsChevronDoubleDown size={20}/>}>*/}
                        {/*        Ещё*/}
                        {/*    </MenuButton>*/}
                        {/*    <MenuList className="profile__list"  bg="#2b2b2d" border="none">*/}
                        {/*        <MenuItem className="profile__item" _hover={{ bg: '#444444' }} bg='transparent'><RiGalleryFill fill="#71aaeb" color='#71aaeb' size={25}/>Изменить обложку</MenuItem>*/}
                        {/*        <MenuItem className="profile__item" _hover={{ bg: '#444444' }} bg='transparent'><DeleteIcon color="red" boxSize={6}/>Удалить</MenuItem>*/}
                        {/*        <MenuItem className="profile__item" _hover={{ bg: '#444444' }} bg='transparent'><DeleteIcon color="red" boxSize={6}/>Удалить</MenuItem>*/}
                        {/*        <MenuItem className="profile__item" _hover={{ bg: '#444444' }} bg='transparent'><DeleteIcon color="red" boxSize={6}/>Удалить</MenuItem>*/}
                        {/*        <MenuItem className="profile__item" _hover={{ bg: '#444444' }} bg='transparent'><DeleteIcon color="red" boxSize={6}/>Удалить</MenuItem>*/}
                        {/*        <MenuItem className="profile__item" _hover={{ bg: '#444444' }} bg='transparent'><DeleteIcon color="red" boxSize={6}/>Удалить</MenuItem>*/}
                        {/*    </MenuList>*/}
                        {/*</Menu>*/}

                    </div>

                </div>
            </div>

            <div className="profile__post">

                <div className="middleBox">



                    <div className="profile__post-area">
                        <Avatar name={`${user.name} ${user.surname}`} src={`http://localhost:4444${user.image}`}/>
                        <textarea className="profile__post-area"/>
                        <FaRegSmile/>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default MyProfile;