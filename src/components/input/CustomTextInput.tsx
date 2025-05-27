'use client'
import React, { useState } from 'react'
import Icon from '../includes/Icon'
import { cn } from '@/utils/utils'
import VectorIcon from '../../../public/assets/icons/vector_black.svg'
import EyeOpen from '../../../public/assets/icons/eyeOpen.svg'
import EyeClose from '../../../public/assets/icons/eyeClose.svg'
import { CountryModal } from '../modal/CountryModal'


export default function CustomTextInput(
    {
        type = 'text',
        value,
        onChange,
        message,
        placeholder,
        icon,
        imageAlt = '',
        className,
        inputStyle,
        setData,
        name,
        isError = false,
        isIcon = false,
        isphone = false,
        isMessage = false,
        isMobile = false,
        readonlyOption = false,
        onKeyDown,
        errorFields,
        setErrorFields,
        label,
        onIconClick,
        isDisabled=false,
        selectedCountry,
        setSelectedCountry
    }: {
        inputStyle?: any;
        message?: any;
        placeholder?: any;
        imageAlt?: any;
        icon?: any;
        type?: any;
        isError?: any;
        isIcon?: any;
        isphone?: any;
        isMessage?: any;
        value?: any;
        onChange?: any;
        className?: any;
        setData?: any;
        name?: any;
        isMobile?: any;
        onKeyDown?: any;
        errorFields?: {
            [key: string]: string;
        };
        setErrorFields?: any;
        label?: string;
        onIconClick?: any;
        readonlyOption?: any;
        isDisabled?:any;
        selectedCountry?:any,
        setSelectedCountry?:any
    }
) {
    const [isCountryModalOpen, setCountryModalOpen] = useState(false);
    const [isReadonly, setIsReadonly] = useState(readonlyOption); 

    const onClose = () => {
        setCountryModalOpen(false)
    }

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (name) {
            setData((prevData: any) => ({
                ...prevData,
                [name]: e.target.value,
            }))
            if (errorFields && errorFields[name]) {
                setErrorFields((prevErrors: any) => ({
                    ...prevErrors,
                    [name]: '',
                }));
            }
        }
     
        else {
            setData(e.target.value)
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    return (
        <>

            {!isReadonly && isCountryModalOpen && (
                <CountryModal
                    setCountryModalOpen={setCountryModalOpen}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    onClose={onClose}
                />
            )}
            <div className='w-full relative' >

                <div
                    className={cn(
                        "w-full flex flex-col mb-4 ", className
                    )}>
                    <div className='flex justify-between items-center'>
                        {label ? <label className='w-full mb-3 rubik_medium text-[16px] leading-[20px]'>{label ? label : ''} </label> : ""}
                        {readonlyOption && (
                            <button
                                className='text-[#0457C8] rubik_regular text-[14px]'
                                onClick={() => setIsReadonly(!isReadonly)}
                            >
                                {isReadonly ? 'Edit' : ''}
                            </button>
                        )}
                    </div>

                    <div className={cn(
                        'w-full flex items-center rounded-[4px] py-[8px] px-[12px] border border-solid border-input_border justify-between',
                        isError && errorFields && errorFields[name]  && 'border-error_red',
                        inputStyle
                    )}>
                        {type == 'mobile' && <div className='flex gap-[5px] mr-[8px]' onClick={() => {
                            setCountryModalOpen(true);
                        }}>
                            <div className='flex justify-center items-center '><span>{selectedCountry? selectedCountry?.phone_code : ""}</span></div>
                            <Icon width={'24px'} height={'24px'} src={VectorIcon} alt={'vectorIcon'} />
                        </div>}
                        <div className='w-full flex flex-row'>
                            <input
                                className='w-full rubik_regular text-[16px] leading-[24px]  '
                                name={name}
                                type={
                                    type === 'password' && !showPassword
                                        ? 'password'
                                        : type === 'password' && showPassword ? "text"
                                            : type === 'mobile'
                                                ? 'tel'
                                                : type
                                }

                                value={value ?? ""}
                                onChange={onChange ?? handleChange}
                                placeholder={placeholder}
                                onKeyDown={onKeyDown ? onKeyDown : null}
                                readOnly={isReadonly}
                                disabled={isDisabled}  
                            />

                        </div>
                        {isIcon && <div className={`ml-[10px] z-50 ${onIconClick ? 'cursor-pointer' : ''}`} onClick={onIconClick ?? undefined}>
                            <Icon width={'24px'} height={'24px'} src={icon} alt="icon" />
                        </div>}
                        {type == 'password' && <button type='button' onClick={() => setShowPassword(!showPassword)} className='flex ml-[10px]'>
                            {showPassword ?
                                <Icon width={'24px'} height={'24px'} src={EyeOpen} alt={'showPassword'} />
                                : <Icon width={'24px'} height={'24px'} src={EyeClose} alt={'showPassword'} />
                            }
                        </button>}
                    </div>

                </div>
                {isMessage && <div className='mt-[4px] pl-[14px] flex absolute'>
                    <span className={cn('text-[12px] leading-[14px] rubik_regular ', isError && 'text-error_red')}>{message}</span>
                </div>}
                {isError && errorFields && errorFields[name] && (
                    <span className=" text-error_red absolute -bottom-[16px] text-[12px] leading-[14px] rubik_regular">
                        {errorFields[name]}
                    </span>
                )}


            </div>
        </>

    )
}
