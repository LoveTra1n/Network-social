import React, {useRef} from 'react';
import axios from "../../utils/axios";
import {Button} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const DownLoadBtn = ({images,setImages}) => {

    const {t} = useTranslation()

    const image = useRef()

    const handleChangeImage1 = async (e) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)
            await axios.post('http://localhost:4444/upload', formData).then(({data}) =>  setImages(data.url))

        } catch (err){
            console.log(err, 'Ошибка')
            alert('Ошибка при загрузке файла')
        }

    }

    return (
        <li style={{display: 'flex', alignItems: 'center',justifyContent: "center",width: "60%"}}>
            <Button onClick={() => image.current.click()} type='button' variant="contained" style={{backgroundColor: 'green'}} color="success">
                {t('form.img')}
            </Button>
            <input ref={image}  hidden  type="file" onChange={handleChangeImage1} id='image'/>
            {
                images && (
                    <>
                        <img style={{width:'130px', margin: '0 20px',borderRadius: "10px"}} src={`http://localhost:4444${images}`} alt="Uploaded"/>

                        <Button style={{width:'200px'}} onClick={() => setImages('')} type='button' variant="contained">{t('form.imgDel')}</Button>
                    </>
                )
            }
        </li>
    );
};

export default DownLoadBtn;