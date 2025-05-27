"use client";
import { cn } from "@/utils/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState, RefObject } from "react";

const SelectInput = ({
  dropDownValues,
  required,
  label,
  error,
  className,
  placeholder,
  name,
  value,
  setData,
  isLoading,
  isDisabled = false,
  errorFields,
  setErrorFields,
  emptyErrorMessage,
  inputRef,
  renderOptionClick,
  handleSelect,
}: {
  dropDownValues: any;
  required: any;
  label: string;
  error?: any;
  className?: string;
  placeholder: string;
  name: string;
  value: any;
  setData: any;
  isLoading?: Boolean;
  errorFields?: {
    [key: string]: string;
  };
  setErrorFields?: any;
  emptyErrorMessage?: string;
  isDisabled?: boolean;
  inputRef?: any;
  renderOptionClick?: any;
  handleSelect?: any;
}) => {
  const [isDropDown, setDropDown] = useState(false);
  const customSelectRef: RefObject<HTMLDivElement> = useRef(null);

  const selectRef = inputRef ?? customSelectRef;

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const handleOptionClick = (option: any) => {
    if (renderOptionClick) {
      renderOptionClick(option);
    }
    if (handleSelect) {
      handleSelect({
        name: name,
        value: option,
      });
    }
    setData((prevData: any) => ({
      ...prevData,
      [name]: option,
    }));
    if (errorFields && errorFields[name] && errorFields[name] !== "") {
      if (setErrorFields) {
        setErrorFields((prevErrors: any) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
    setDropDown(false);
  };

  const handleClickOutside = (event: any) => {
    if (selectRef?.current && !selectRef?.current?.contains(event?.target)) {
      setDropDown(false);
    }
  };

  return (
    <div className={cn("", className)} ref={selectRef}>
      <div
        className={`flex items-center relative rounded-[4px] border-[1px] border-solid px-[12px] py-[8px] transition-all h-[42px] ${
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } ${
          isDropDown
            ? "border-[#E3E8EF] shadow-md"
            : error && required && !value?.id
            ? "border-[#FDA29B] pr-[12px]"
            : errorFields && errorFields[name]
            ? "border-[#FDA29B] pr-[12px]"
            : "border-input_border "
        }`}
        // style={
        //     isDropDown
        //         ? {
        //               boxShadow:
        //                   "0px 0px 0px 4px #E5F7F0, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        //           }
        //         : {}
        // }
        onClick={() => {
          if (!isDisabled) {
            setDropDown(!isDropDown);
          }
        }}
      >
        {" "}
        <label
          className="font-medium	text-[#364152] text-[14px] absolute top-[-27px] left-0"
          htmlFor={label}
        >
          {label}

          {required && label ? <span className="text-[#D92D20]">*</span> : ""}
        </label>
        <div
          className={`text-[16px] w-[calc(100%-20px)] overflow-x-hidden whitespace-nowrap	text-ellipsis ${
            value?.name
              ? "text-[#121926] font-medium"
              : "text-[#9CA3AF] font-normal"
          } `}
        >
          {value?.name ? value?.name : placeholder ? placeholder : ""}
        </div>
        <span
          className={
            "flex items-center justify-center rounded-[50%] w-[15px] h-[15px] min-w-[15px] min-h-[15px] transition-all ml-auto"
          }
        >
          <Image
            src={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/components/icons/general/chevron-down.svg"
            }
            alt="icon"
            width={1000}
            height={1000}
            className={"w-full h-full transition-all "}
            style={{
              transform: isDropDown ? "rotate(-180deg)" : "",
            }}
          />
        </span>
        {error && required && !value?.id ? (
          <span className="flex items-center justify-center min-w-[15px] min-h-[15px] ml-[8px]">
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/alert-circle.svg"
              alt="Error"
            />
          </span>
        ) : (
          errorFields &&
          errorFields[name] && (
            <span className="flex items-center justify-center min-w-[15px] min-h-[15px] ml-[8px]">
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/alert-circle.svg"
                alt="Error"
              />
            </span>
          )
        )}
        {error && required && !value?.id ? (
          <p className="text-[12px] text-[#F04438] absolute top-[40px] left-0">
            {emptyErrorMessage ?? `Select valid ${label?.toLowerCase()}`}
          </p>
        ) : (
          errorFields &&
          errorFields[name] !== "" && (
            <p className="text-[12px] text-[#F04438] absolute top-[40px] left-0">
              {errorFields[name]}
            </p>
          )
        )}
        {isDropDown && (
          <div className="z-10 absolute transition-all top-[45px] left-0 rounded-[8px] border-[#E3E8EF] border-[1px] border-solid overflow-y-scroll shadow-md w-full max-h-[200px] bg-[#fff] p-[6px]">
            {isLoading ? (
              <div className="text-[#999] p-2 h-[125px] flex justify-center items-center">
                <span className={"section-loader absolute !text-[#059664]"} />
              </div>
            ) : (
              <>
                {dropDownValues?.length <= 0 ? (
                  <div className="text-[#999] p-2 h-[125px] flex justify-center items-center">
                    No data found
                  </div>
                ) : (
                  <>
                    {!required && (
                      <div
                        onClick={() => handleOptionClick({})}
                        className={
                          "bg-[#fff] flex mb-[4px] cursor-pointer rounded-[6px] text-[16px] items-center py-[8px] px-[10px] text-[#121926] hover:bg-[#F8FAFC] overflow-x-hidden "
                        }
                      >
                        <span className="w-[14px] h-[14px] min-w-[14px] min-h-[14px] border-[1px] border-solid border-[#CDD5DF] rounded-full mr-[8px]"></span>

                        <span
                          className={
                            "text-[#121926] font_medium text-[14px] overflow-hidden whitespace-nowrap text-ellipsis "
                          }
                        >
                          None of these
                        </span>
                      </div>
                    )}

                    {dropDownValues?.map((option: any, index: any) => (
                      <div
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`${
                          value?.id === option?.id
                            ? "bg-[#F8FAFC]"
                            : "bg-[#fff]"
                        } flex mb-[4px] cursor-pointer rounded-[6px] text-[16px] items-center py-[8px] px-[10px] text-[#121926] hover:bg-[#F8FAFC] overflow-x-hidden `}
                      >
                        <span
                          className={`w-[14px] h-[14px] min-w-[14px] min-h-[14px] border-[1px] border-solid border-[#CDD5DF] rounded-full mr-[8px] ${
                            value?.id === option?.id &&
                            "bg-[#079664] border-none p-[4.5px]"
                          }`}
                        >
                          {value?.id === option?.id && (
                            <hr className="w-full h-full bg-[#fff] block rounded-[50%]" />
                          )}
                        </span>

                        <span
                          className={
                            "text-[#121926] font_medium text-[14px] overflow-hidden whitespace-nowrap text-ellipsis "
                          }
                        >
                          {option?.name}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
