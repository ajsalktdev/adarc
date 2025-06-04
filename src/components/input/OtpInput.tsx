import React, {KeyboardEvent } from 'react';

function OtpInput({otp,setOtp}:{otp:any, setOtp:any}) {

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (!isNaN(Number(element.value))) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move focus to the next input field
      if (element.nextSibling) {
        (element.nextSibling as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace") {
      if (otp[index] === "") {
        if ((event.target as HTMLInputElement).previousSibling) {
          ((event.target as HTMLInputElement).previousSibling as HTMLInputElement).focus();
        }
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").split("");
    if (pastedData.length === 6 && pastedData.every(char => !isNaN(Number(char)))) {
      setOtp(pastedData);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {otp.map((data:any, index:any) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e)}
          className='bg-[#EFF5FA] rounded-[5px] w-[40px] h-[40px] text-center text-4'        
        />
      ))}
    </div>
  );
}

export default OtpInput;
