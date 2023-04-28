import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {emptyNotification, getAllNotifications} from "../../redux/reducers/notifications";
import axios from "axios";
import {Avatar, useToast} from "@chakra-ui/react";
import {fillUser} from "../../redux/reducers/user";
import {notificationSelector, userSelector} from "../../redux/reselect";

const Notifications = () => {

    const toast = useToast()

    const dispatch = useDispatch()

    const {user} = useSelector(userSelector)

    const {data} = useSelector(notificationSelector)

    useEffect(() => {
        if(user.notification.length){
            dispatch(getAllNotifications({arr: user.notification}))
        }else{
            dispatch(emptyNotification())
        }
    },[user])



    const acceptFriends = (id) => {
        axios.patch('http://localhost:4444/request/add', {
            senderId: id,
            recieverId: user._id
        }).then((res) => {
            toast({
                title: 'Добавлен в друзья',
                status: 'success',
                duration: 5000,
                position: 'center-top',
                isClosable: true,
            })
            dispatch(fillUser(res.data))
        }).catch(() => {
            toast({
                title: 'Запрос отклонен',
                status: 'error',
                duration: 5000,
                position: 'center-top',
                isClosable: true,
            })
        })
    }

    const cancelFriends = (id) => {
        axios.patch('http://localhost:4444/request/cancel', {
            senderId: id,
            recieverId: user._id
        }).then((res) => {
            toast({
                title: 'Заявка не принята',
                status: 'success',
                duration: 5000,
                position: 'center-top',
                isClosable: true,
            })
            dispatch(fillUser(res.data))

        }).catch(() => {
            toast({
                title: 'Запрос отклонен',
                status: 'error',
                duration: 5000,
                position: 'center-top',
                isClosable: true,
            })
        })
    }

    return (
        <section className="notifications">

            <div className="notifications__box  middleBox">

                <div className="notifications__top">
                    <h2 className="notifications__title">Уведомления</h2>

                    <span className="notifications__link blueLink">
                        Настройки
                    </span>
                </div>


                <div className="notifications__users">
                {
                    data.map(item => (
                            <div key={item.login} className="notifications__user">
                                <div className="notifications__user-left">
                                    <Avatar  size='lg' className="notifications__avatar" name={`${item.name} ${item.surname}`}/>

                                    <div className="notifications__user-info">
                                        <h2 className="blueLink">{`${item.name} ${item.surname}`}</h2>

                                        <p className="notifications__user-text">
                                            подал заявку в друзья
                                        </p>
                                    </div>
                                </div>

                                <div className="notifications__btn">
                                    <button className="notifications__btn-add" type="button" onClick={() => acceptFriends(item._id)}>Добавить</button>
                                    <button className="notifications__btn-cancel" type="button" onClick={() => cancelFriends(item._id)}>Отклонить</button>
                                </div>
                            </div>
                    ))
                }
                </div>

            </div>

            <div className="notifications__list rightBox">
                <p className="notifications__item active">Уведомления профиля</p>
                <p className="notifications__item">От друзей</p>
                <p className="notifications__item">Ответы</p>
            </div>


        </section>
    );
};

export default Notifications;