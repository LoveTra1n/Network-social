import React, {useState} from 'react';
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {Link,useNavigate,useLocation} from "react-router-dom"
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import login from "../../pages/Login/Login";
import InputMask from 'react-input-mask';
import {useTranslation} from "react-i18next";
import DownloadBtn from "../DownloadBtn/DownloadBtn";
import axios from "axios";
import {fillUser} from "../../redux/reducers/user";
import { useToast } from '@chakra-ui/react'


const Form = () => {

    const dispatch = useDispatch()

    const [images,setImages] = useState('')

    const navigate = useNavigate()

    const {pathname} = useLocation()

    const toast = useToast()


    const {t} = useTranslation()

    const [eye,setEye] = useState(false)
    const [eye1,setEye1] = useState(false)

    const {
        register,
        getValues,
        handleSubmit,
        formState:{errors}} = useForm({mode: "onBlur"})

    const registerForm = data => {

        const {confirm, ...other } = data

        axios.post(`http://localhost:4444/auth/register`, {
            ...other,
            image:images
        }).then(({data}) => {
            dispatch(fillUser(data))
            navigate('/')
        })
            .catch((err) => alert(err.message))
    }

    const loginForm = data => {
        axios.post(`http://localhost:4444/auth/login`,  data)
            .then(({data}) => {
            dispatch(fillUser(data))
            navigate('/')
        })
            .catch((err) => {
                toast({
                    position: 'top-left',
                    title: "Вы неправильно ввели данные",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    }


    const submit = (data) => {
       pathname === '/register'? registerForm(data) : loginForm(data)
    }

    return (
        <form noValidate className="form" onSubmit={handleSubmit(submit)}>

            <h2 className="form__title">
                {
                    pathname === '/register' ? t('form.title') : t('form.title2')
                }
            </h2>

            {
                pathname === '/register' ?
                    <>
                        <div className="form__box">
                            <h2 className="form__box-title">{t('form.name')}</h2>
                            <label className="form__label">
                                <input
                                    {...register('name', {
                                        required: {
                                            message: t('form.nameEr'), value: true
                                        },
                                        minLength: {
                                            message: t('form.min'), value: 3
                                        }
                                    })}
                                    style={{border: errors.name ? "2px solid red" : '', background: errors.name ? "#422828": ''}}
                                    type="text" className="form__input" placeholder={t('form.namePLace')}/>
                                <p className="form__error">{errors.name && errors.name.message}</p>
                            </label>
                        </div>

                        <div className="form__box">
                            <h2 className="form__box-title">{t('form.surname')}</h2>
                            <label className="form__label">
                                <input
                                    {...register('surname', {
                                        required: {
                                            message: t('form.surnameEr') , value: true
                                        },
                                        minLength: {
                                            message: t('form.min'), value: 3
                                        }
                                    })}
                                    style={{border: errors.surname ? "2px solid red" : '', background: errors.surname ? "#422828": ''}}
                                    type="text" className="form__input" placeholder={t('form.surnamePLace')}/>
                                <p className="form__error">{errors.surname && errors.surname.message}</p>
                            </label>
                        </div>


                        <div className="form__box">
                            <h2 className="form__box-title">{t('form.birthday')}</h2>
                            <label className="form__label">
                                <input
                                    {...register('birthday', {
                                        required: {
                                            message: t('form.dateEr'), value: true
                                        }
                                    })}
                                    style={{border: errors.birthday ? "2px solid red" : '', background: errors.birthday ? "#422828": '',fontSize: "20px",textAlign: "center"}}
                                    type="date" className="form__input"/>
                                <p className="form__error">{errors.birthday && errors.birthday.message}</p>
                            </label>
                        </div>

                        <div className="form__box">
                            <h2 className="form__box-title">{t('form.gender')}</h2>

                            <div className="form__radio">
                                <div className="form__radio-box">
                                    <label className="form__label-radio">
                                        <input {...register('gender',{
                                            required: {
                                                message: t('form.genderEr'),
                                                value: true
                                            }
                                        })} value={'man'} type="radio" name={'gender'}/>
                                        {t('form.man')}
                                    </label>

                                    <label className="form__label-radio">
                                        <input {...register('gender',{
                                            required: {
                                                message: t('form.genderEr'),
                                                value: true
                                            }
                                        })} value={'woman'} type="radio" name={'gender'} />
                                        {t('form.woman')}
                                    </label>
                                </div>

                                <p className="form__error">{errors.gender && errors.gender.message}</p>

                            </div>
                        </div>
                        <div className='form__upload'>
                            <h2 className="form__box-title">{t('form.img')}</h2>
                            <DownloadBtn images={images} setImages={setImages} />
                        </div>


                        <div className="form__box">
                            <h2 className="form__box-title">{t('form.city')}</h2>
                            <label className="form__label">
                                <input
                                    {...register('city', {
                                        required: {
                                            message: t('form.cityEr'), value: true
                                        },
                                        minLength: {
                                            message: t('form.min'), value: 3
                                        }
                                    })}
                                    style={{border: errors.city ? "2px solid red" : '', background: errors.city ? "#422828": ''}}
                                    type="text" className="form__input" placeholder={t('form.cityPLace')}/>
                                <p className="form__error">{errors.city && errors.city.message}</p>
                            </label>
                        </div>

                        <div className="form__box">
                            <h2 className="form__box-title">{t('form.tel')}</h2>

                            <label className='form__label'>
                                <InputMask  mask={`+\\9\\96(999)99-99-99`} type='tel'  {...register('phone', {
                                    required: {
                                        value: true,
                                        message: t('form.telEr')
                                    },
                                    pattern: {
                                        value: /^\+996\(\d{3}\)\d{2}-\d{2}-\d{2}$/,
                                        message: t('form.telPast')
                                    }
                                })}
                                              style={{border: errors.phone ? "2px solid red" : '', background: errors.phone ? "#422828": ''}}
                                              className="form__input" placeholder={t('form.telPLace')}/>
                                <p className="form__error">{errors.phone && errors.phone.message}</p>
                            </label>
                        </div>
                    </> : ''
            }

            <div className="form__box">
                <h2 className="form__box-title">{t('form.login')}</h2>
                <label className="form__label">
                    <input
                        {...register('login',{
                            required: {
                                message: t('form.loginEr'),value: true
                            },
                            maxLength: {
                                message: t('form.max'),value: 15
                            },
                            minLength: {
                                message: t('form.min'),value: 3
                            }})}
                        style={{border: errors.login ? "2px solid red" : '', background: errors.login ? "#422828": ''}}
                        type="text" className="form__input" placeholder={t('form.loginPLace')}/>
                    <p className="form__error">{errors.login && errors.login.message}</p>
                </label>
            </div>

            <div className="form__box">
                <h2 className="form__box-title">{t('form.password')}</h2>
                <label className="form__label">
                    <input
                        {...register('password',{
                            required: {
                                message: t('form.passwordEr'), value: true
                            },
                            pattern:{
                                value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
                                message: t('form.passwordTrue')
                            }})}
                        style={{border: errors.password ? "2px solid red" : '', background: errors.password ? "#422828": ''}}
                        type={eye? "text": "password"} className="form__input" placeholder={t('form.passwordPLace')}/>
                    {
                        eye? <AiFillEye onClick={() => setEye(false)} className="form__label-eye"/>:
                            <AiFillEyeInvisible onClick={() => setEye(true)} className="form__label-eye"/>
                    }
                    <p className="form__error">{errors.password && errors.password.message}</p>
                </label>
            </div>

            {
                pathname === '/register' ?
                    <div className="form__box">
                        <h2 className="form__box-title">{t('form.confirm')}</h2>
                        <label className="form__label">
                            <input {...register('confirm', {
                                required: {
                                    message: t('form.confirmEr'),
                                    value: true
                                },
                                validate: (v) => {
                                    if(getValues('password') !== v){
                                        return t('form.confirmFalse')
                                    }
                                }
                            })}
                                   style={{border: errors.confirm ? "2px solid red" : '', background: errors.confirm ? "#422828": ''}}
                                   type={eye1? "text": "password"} className="form__input" placeholder={t('form.confirmPLace')}/>
                            {
                                eye1? <AiFillEye onClick={() => setEye1(false)} className="form__label-eye"/>:
                                    <AiFillEyeInvisible onClick={() => setEye1(true)} className="form__label-eye"/>
                            }
                            <p className="form__error">{errors.confirm && errors.confirm.message}</p>
                        </label>
                    </div>
                    : ''
            }

            <button className="form__btn" type="submit">

                {
                    pathname === '/register' ? t('form.sign_up') : t('form.sign_in')
                }
            </button>

            {
                pathname === '/register' ?
                    <Link className="form__link" to="/login">{t('form.link')}</Link>
                    :
                    <Link className="form__link" to="/register">{t('form.link1')}</Link>

            }

        </form>
    );
};

export default Form;