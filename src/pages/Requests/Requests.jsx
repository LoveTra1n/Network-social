import React from 'react';
import {useCancelRequestMutation, useGetRequestsQuery} from "../../redux/reducers/requests";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, useToast} from "@chakra-ui/react";
import {fillUser} from "../../redux/reducers/user";
import {userSelector} from "../../redux/reselect";

const Requests = () => {

    const dispatch = useDispatch()

    const toast = useToast()

    const {user} = useSelector(userSelector)

    const [cancelRequest, obj] = useCancelRequestMutation() // из этого хука вытаскиваю функцию

    if(obj.data) {
        dispatch(fillUser(obj.data))
    }

    const {data = [], isLoading} = useGetRequestsQuery(obj.data ? obj.data.requests : user.requests)

    const handleCancelRequest = async (id) => {
        await cancelRequest({senderId: user._id, recieverId:id }).unwrap()
        toast({
            title: 'Запрос отменен',
            status: 'success',
            duration: 5000,
            position: 'top-left',
            isClosable: true,
        })
    }

    if(isLoading){
        return <h2>
            ...Loading
        </h2>
    }

    return (
        <section className="notifications">

            <div className="notifications__box  middleBox">

                <div className="notifications__top">
                    <h2 className="notifications__title">Запросы</h2>

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
                                            вы отправили запрос на дружбу
                                        </p>
                                    </div>
                                </div>

                                <div className="notifications__btn">
                                    <button className="notifications__btn-cancel" type="button" onClick={() => handleCancelRequest(item._id)}>Отменить</button>
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

export default Requests;