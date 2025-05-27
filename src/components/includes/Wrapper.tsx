import { cn } from '@/utils/utils';
import React from 'react';

interface WrapperProps {
    children: React.ReactNode;
    className?: string; 
}

const Wrapper: React.FC<WrapperProps> = ({ children, className = '' }) => {
    return <div className={cn(`px-[48px] max-lg:px-[30px] max-md:px-5 wr sm:pt-[177px] pt-[128px]  max-w-[1600px] items-center w-[100%] mx-auto my-0 `,className)}>{children}</div>;
};

export default Wrapper;

