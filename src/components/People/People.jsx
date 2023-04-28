import React from 'react';
import {HiUserAdd} from 'react-icons/hi'
import { Image } from '@chakra-ui/react'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";


const People = ({item,sendRequest}) => {

    const {t} = useTranslation()

    const {user} = useSelector(userSelector)


    return (
        <div key={item.login} className="find__card">
            <Image
                borderRadius='10px'
                boxSize='100%'
                src={`http://localhost:4444/users/${item.image}`}
                fallbackSrc='https://vk.com/images/camera_100.png'
                alt={item.login}/>

            <div className="find__info">
                <div className="find__info-left">
                    <h2 className='find__info-name blueLink'>{`${item.name} ${item.surname}`}</h2>

                    <p className="find__info-mutual">3 {t('people.other')}</p>
                </div>

                {
                    user.requests.includes(item._id) ? '' :
                        <HiUserAdd onClick={() => sendRequest(item)} style={{cursor: "pointer"}} size={30} fill="#71aaeb"/>
                }

            </div>
        </div>
    );
};

export default People;