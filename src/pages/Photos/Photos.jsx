import React, {useRef, useState} from 'react';
import {useToast} from "@chakra-ui/react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import "@fancyapps/ui/dist/fancybox.css";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import {useDispatch, useSelector} from "react-redux";
import {fillUser} from "../../redux/reducers/user";
import {userSelector} from "../../redux/reselect";


const Photos = () => {

    const toast = useToast()

    const {user} = useSelector(userSelector)

    const dispatch = useDispatch()

    const image = useRef()

    const [photo,setPhoto] = useState('')

    const [desc,setDesc] = useState('')

    const handleImage = async (e) => {
        try {

            const formData = new FormData()

            const file = e.target.files[0]

            formData.append('image', file)

            await axios.post('http://localhost:4444/upload', formData)
                .then(({data}) => setPhoto(data.url))

        } catch (err) {
            toast({
                position: 'top-left',
                title: "Не удалось добавить фотографию",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const resetHandler = () => {
        setDesc('')
        setPhoto('')
    }

    const addPhoto = async () => {
        try {
            const res = await axios.patch(`http://localhost:4444/users/${user._id}/addphoto`, {
                url: photo,
                description: desc,
                id: uuidv4()
            })

            dispatch(fillUser(res.data))

            setDesc('')
            setPhoto('')


        } catch (err) {
            toast({
                title: 'Не удалось добавить',
                status: 'error',
                duration: 5000,
                position: 'top-left',
                isClosable: true,
            })
        }

    }

    return (
        <section className='photos'>

            <div className="photos__album">
                <div className="photos__top">
                    <h2 className="photos__title">Добавление фотографии</h2>

                    <button onClick={() => image.current.click()} className='photos__add-btn'>Добавить фотографии</button>

                    <input onChange={(e) => handleImage(e)} ref={image} type="file" hidden/>
                </div>
                <div className="photos__gallery photos__top-gallery">

                    {
                        photo.length ?
                            <div className="photos__gallery-box">
                                <span className="photos__gallery-close" onClick={resetHandler}>x</span>
                                <img  data-fancybox data-caption={desc}  data-src={`http://localhost:4444${photo}`} src={`http://localhost:4444${photo}`} className='photos__gallery-img' alt=""/>
                                <input value={desc} onChange={(e) => setDesc(e.target.value)} className='photos__gallery-desc' type="text" placeholder='Добавьте описание'/>
                            </div> :

                            <p>Добавить фогографию...</p>
                    }

                </div>
                <div className="photos__bottom">
                    <button className="photos__bottom-btn" onClick={addPhoto}>
                        Опубликовать на моей странице
                    </button>
                </div>
            </div>

            <div className="photos__album">
                <div className="photos__top">
                    <h2 className="photos__title">Мои фотографии</h2>
                </div>

                <div className="photos__gallery">

                    {
                        user.photos.map(item => (
                            <div key={item._id} className="photos__gallery-box">
                                <span className="photos__gallery-close" onClick={resetHandler}>x</span>
                                <img  data-fancybox data-caption={item.description}  data-src={`http://localhost:4444${item.url}`} src={`http://localhost:4444${item.url}`} className='photos__gallery-img'/>
                                {
                                    item.description.length ? <p className='photos__gallery-desc' >{item.description}</p> : <p className='photos__gallery-desc' >Нет описании</p>
                                }
                            </div>
                        ))
                    }

                </div>

            </div>
        </section>
    );
};

export default Photos;