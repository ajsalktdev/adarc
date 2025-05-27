import React, { useEffect } from "react";
import Icon from "../includes/Icon";
import RedClose from "../../../public/assets/icons/redClose.svg";
import GreenCheck from "../../../public/assets/icons/greenCheck.svg";
import { verifyPasswordData } from "@/utils/staticUtils"; // This should be an array of condition messages

export default function PasswordVerify({ isDisabled, setDisabled, data }: any) {
  const verifyPassword = (password: string) => {
    // Define validation conditions
    const conditions = [
      {
        message: "Must be 7 - 16 Characters",
        isValid: password.length >= 7 && password.length <= 16,
      },
      {
        message: "Cannot contain spaces or . , - | \\ / = _",
        isValid: data.length > 0 && !/[ .,|\-\\\/=_]/.test(data),
    },
      {
        message: "Must contain at least one uppercase",
        isValid: /[A-Z]/.test(password),
      },
      {
        message: "Must contain at least one lowercase",
        isValid: /[a-z]/.test(password),
      },
      {
        message: "Must contain at least one numeric",
        isValid: /[0-9]/.test(password),
      },
    ];

    return conditions;
  };

  const conditions = verifyPassword(data);

  // Check if all conditions are valid
  const allValid = conditions.every((condition) => condition.isValid);

  // Enable/disable the button based on validation
  useEffect(() => {
    setDisabled(!allValid);
  }, [allValid, setDisabled]);

  return (
    <div>
      <ul>
        {conditions.map((item, index) => (
          <li className="flex items-center" key={index}>
          {!item.isValid &&  <Icon
              src={RedClose}
              alt={"warningIcon"}
              width={16}
              height={16}
            />}
            <span
              className={`text-rubik_regular ${
                item.isValid ? "ml-4 text-green-700 line-through" : "text-error_red"
              }`}
            >
              {item.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
