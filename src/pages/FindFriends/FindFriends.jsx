import React, {useState} from 'react';
import {MdManageSearch} from 'react-icons/md'
import Search from "../../components/Search/Search";
import RightList from "../../components/RightList/RightList";
import People from "../../components/People/People";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import {changeSearch, findAllUser} from "../../redux/reducers/findUsers";
import axios from "axios";
import {useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {fillUser} from "../../redux/reducers/user";
import {findUserSelector, userSelector} from "../../redux/reselect";

const FindFriends = () => {

    const {t} = useTranslation()

    const toast = useToast()

    const dispatch = useDispatch()

    const {user} = useSelector(userSelector)

    const {data,filter} = useSelector(findUserSelector)

    const [search,setSearch] = useState( filter.search || '')

    useEffect(() => {
        dispatch(findAllUser({login: user.login,search}))
        dispatch(changeSearch(search))
    },[search])

    const sendRequest = (item) => {
        axios.patch(`http://localhost:4444/request/${user._id}`,{request: item._id})
            .then((res)  => {
                dispatch(fillUser(res.data))
                toast({
                    position: 'top-left',
                    title: "Запрос отправлен",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(() => {
                toast({
                    position: 'top-left',
                    title: "Ошибка при отправке запроса",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    return (
        <section className="find">
            <div className="middleBox">
                <div className="find__top">
                    <p className="find__subtitle">{t('find.search')}</p>

                    <span className="blueLink">
                        <MdManageSearch size={20} fill="#8fa9c5" color="#8fa9c5"/>
                        {t('find.settings')}
                    </span>
                </div>
                <Search search={search} setSearch={setSearch}/>

                <div className="find__people">
                    {
                        data.map((item,i) => (
                            <People key={i} sendRequest={sendRequest} item={item}/>
                        ))
                    }
                </div>
            </div>

            <div className="rightBox">
                <RightList/>
            </div>
        </section>
    );
};

export default FindFriends;