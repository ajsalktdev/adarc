import React from "react";
import { ChangeEvent, FC, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";
import EyeOpen from '../../../public/assets/icons/eyeOpen.svg'
import EyeClose from '../../../public/assets/icons/eyeClose.svg'
import Icon from "../includes/Icon";

interface InputProps {
    isLabel?: boolean;
    type?: "text" | "name" | "number" | "email" | "aadhar" | string;
    label?: string;
    value?: string | number;
    name?: string;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    required?: boolean;
    setData: (data: any) => void;
    className?: string;
    errorMessage?: string;
    maxLength?: number;
    icon?: string;
    inputRef?: any;
    onChange?: any;
    onFocus?: any;
    onBlur?: any;
    isAddAnother?: boolean;
    addAnotherFunction?: any;
}

export const FormInput: FC<InputProps> = ({
    isLabel =true,
    type,
    label,
    value,
    name,
    placeholder,
    error,
    disabled,
    required,
    setData,
    className,
    errorMessage,
    maxLength,
    icon,
    inputRef,
    onChange,
    onFocus,
    onBlur,
    isAddAnother = false,
    addAnotherFunction,
}) => {
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const formatAadharNumber = (number: any) => {
        if (!number) return "";
        const formatted = number.replace(/(\d{4})(?=\d)/g, "$1 ");
        return formatted;
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let validatedValue = value;
        let numericValue = value.replace(/\D/g, "");

        if (type === "number") {
            validatedValue = value.replace(/[^0-9]/g, "");
        }
        if (type === "aadhar") {
            if (maxLength && numericValue.length > maxLength) {
                numericValue = numericValue.slice(0, maxLength);
            }
            validatedValue = formatAadharNumber(numericValue);
        } else if (type === "name") {
            validatedValue = value.replace(/[^a-zA-Z ]/g, "");
            validatedValue = validatedValue.replace(/^\s+/g, "");
        } else if (type === "email") {
            setIsValidEmail(validateEmail(value));
        }

        if (onChange) {
            onChange(name, validatedValue);
        }
        if (setData) {
            setData((prevData: any) => ({
                ...prevData,
                [name]: validatedValue,
            }));
        }
    };

        const [showPassword, setShowPassword] = useState(false);
    

    return (
        <div className={cn(" pb-[21px]",isLabel && 'pt-[26px]', className,)}>
            <div
                className={cn(
                    "flex items-center relative rounded-[4px] border-[1px] border-solid h-[42px]",
                    type === "email" && !isValidEmail && error
                        ? "border-[#FDA29B] pr-[12px]"
                        : (error && required && value === "") ||
                          (error )
                        ? "border-[#FDA29B] pr-[12px]"
                        : "border- border-input_border"
                )}
            >
                {<label
                    className="rubik_medium text-[16px] leading-[20px] absolute top-[-27px] left-0"
                    htmlFor={label}
                >
                    {label}

                    {required ? <span className="text-error_red">*</span> : ""}
                </label>}
                {icon && (
                    <span className="ml-[12px] flex items-center justify-center min-w-[15px] min-h-[15px] max-w-[15px] max-h-[15px]">
                        <Image width={100} height={100} src={icon} alt="Icon" />
                    </span>
                )}
                <input
                    className={"px-[12px] py-[8px] rubik_regular text-[16px] leading-[24px] rounded-[8px] w-full placeholder:font-rubik_regular "}
                    id={label}
                    type={type == 'password' && showPassword == false  ? 'password' : 'text' }
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleChangeInput}
                    disabled={disabled}
                    maxLength={type !== "aadhar" ? maxLength : undefined}
                    ref={inputRef}
                    onFocus={() => {
                        if (onFocus) {
                            onFocus();
                        }
                    }}
                    onBlur={() => {
                        if (onBlur) {
                            onBlur();
                        }
                    }}
                    autoComplete="off"
                    autoFocus
                />

                {
                
                type == 'password' && error == false ?
                <button onClick={() => setShowPassword(!showPassword)} className='flex mx-[10px]'>
                {showPassword ?
                    <Icon width={'24px'} height={'24px'} src={EyeOpen} alt={'showPassword'} />
                    : <Icon width={'24px'} height={'24px'} src={EyeClose} alt={'showPassword'} />
                }
                </button>:
                type === "email" && !isValidEmail && error ? (
                    <span className="flex items-center justify-center min-w-[15px] min-h-[15px] max-w-[15px] max-h-[15px]">
                        <Image
                            width={100}
                            height={100}
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/alert-circle.svg"
                            alt="Error"
                        />
                    </span>
                ) : (
                    ((error && required && value === "") ||
                        (error )) && (
                        <span className="flex items-center justify-center min-w-[15px] min-h-[15px] max-w-[15px] max-h-[15px]">
                            <Image
                                width={100}
                                height={100}
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/alert-circle.svg"
                                alt="Error"
                            />
                        </span>
                    )
                )}

                {error && errorMessage ? (
                    <p className="text-[12px] leading-[14px] rubik_regular text-error_red absolute top-[42px] left-0">
                        {errorMessage}
                    </p>
                ) : type === "email" && !isValidEmail && error ? (
                    <p className="text-[12px] leading-[14px] rubik_regular text-error_red absolute bottom-[-22px] left-0">
                        Enter a valid {label?.toLowerCase()}
                    </p>
                ) : (
                    error &&
                    required &&
                    value === "" && (
                        <p className="text-[12px] leading-[14px] rubik_regular text-error_red absolute bottom-[-22px] left-0">
                            Enter a valid {label?.toLowerCase()}
                        </p>
                    )
                )}
            </div>
            {isAddAnother && (
                <AddAnotherButton addAnotherFunction={addAnotherFunction} />
            )}
        </div>
    );
};

const AddAnotherButton = ({ addAnotherFunction }: any) => {
    return (
        <div
            onClick={() => {
                if (addAnotherFunction) addAnotherFunction();
            }}
            className={cn(
                "flex items-center justify-end mt-[0px] cursor-pointer font-semibold text-[#047853] text-[14px] pl-[2px]"
            )}
        >
            <Image
                src={
                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/components/icons/green/plus.svg"
                }
                width={100}
                height={100}
                className="block !w-[16px] h-[16px] mr-[4px]"
                alt="Info"
            />
            Add another
        </div>
    );
};

