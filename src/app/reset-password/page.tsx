// "use client"
// import Wrapper from '@/components/includes/Wrapper'
// import React, { useState } from 'react'
// import VerifyEmail from '../signup/_components/VerifyEmail';
// import ForgetPassword from '../login/_components/ForgetPassword';
// import SetPassword from '../login/_components/SetPassword';
// import postApiData from '@/config/post-api-data';

// function Page() {
//     const colors = ['#FDB615', '#1F1F1F', '#FDB615', '#1F1F1F'];
//     const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
//     const [VerifyModal, setVerifyModal] = useState(false)
//     const [isverified, setVerified] = useState(false)
//     const hostName = window.location.hostname; // Get the hostname dynamically
// console.log(hostName,'hellooooo')    
//     const [formData, setFormData] = useState({ email: '' });
//     const [isError, setError] = useState(false);
//     const [errorFields, setErrorFields] = useState({});

//     const handleSend = async () => {
//             setError(false);
//             try {
//                 const responseData = await postApiData("users/forget-password/", {
//                     email: formData.email,
                   
//                 });
        
//                 const { status_code, message } = responseData;
        
//                 if (status_code === 6000) {
//                     setVerifyModal(true);
//                     window.alert("OTP sent successfully");
//                 } else {
//                     setError(true);
//                     console.error("Error sending OTP:", message);
//                 }
//             } catch (error) {
//                 console.error("Error in OTP API call:", error);
//             } finally {
//             }
//     }
//     const handlePasswordSubmit = async () => {
//         setError(false);
//         setErrorFields({});
//         try {
//             const responseData = await postApiData("users/update-password/", {
                
//                 new_password: formData.new_password,
//                 confirm_password: formData.confirm_password,
//             });
    
//             const { status_code, message } = responseData;
    
//             if (status_code === 6000) {
//                 window.alert("Password updated successfully");
//             } else {
//                 setError(true);
//                 window.alert(message || "An error occurred while updating the password.");
//                 if (responseData.error_fields) {
//                     setErrorFields(responseData.error_fields);
//                 }
//             }
//         } catch (error) {
//             console.error("Error updating password:", error);
//             window.alert("An unexpected error occurred. Please try again.");
//         }
//     };

//     return (
//         <div className='bg-[#E4E4E4]'>
//             <Wrapper
//                 className={`min-h-[calc(100vh-85px)]  flex justify-center items-center
//       `}
//             >
//                 <div className='bg-[white] flex flex-col max-w-[500px] w-[30%]  min-w-[320px]'>
//                     <div className='w-full flex  justify-between h-[8px]'>
//                         {colors.map((color, index) => (
//                             <div
//                                 key={index}
//                                 className='w-1/4 h-full'
//                                 style={{ backgroundColor: color }}
//                             ></div>
//                         ))}
//                     </div>
//                     <div className='p-6'>


//                         {VerifyModal ?
//                             <VerifyEmail
//                                 formData={formData}
//                                 otp={otp}
//                                 setOtp={setOtp}
//                                 setVerifyModal={setVerifyModal}
//                                 setVerified={setVerified}
//                             /> : isverified ? <SetPassword
//                                 formData={formData}
//                                 setFormData={setFormData}
//                                 isError={isError}
//                                 errorFields={errorFields} 
//                                 handleSubmit ={ handlePasswordSubmit}/>
//                                 :
//                                 <ForgetPassword
//                                     handleSend={handleSend}
//                                     formData={formData}
//                                     setFormData={setFormData}
//                                  />}


//                     </div>
//                 </div>
//             </Wrapper>
//         </div>
//     )
// }

// export default Page
