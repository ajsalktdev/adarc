import React from 'react';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomButton({
  unavailable = false,
  onClick,
  title,
  leftIcon,
  rightIcon,
  titleClass,
  buttonClass,
  isTitle = true,
  istTitleClass = false,
  isButtonClass = false,
  isLeftIcon = false,
  active = false,
  isSelect = false,
  isRightIcon = false,
  isLoading = false,
  rotateIcon = false,
  isDisabled = false,
}: any) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        !isDisabled && 'hover:opacity-[.8]',
        'relative flex flex-row items-center justify-center h-[40px] w-full overflow-hidden',
        isSelect
          ? 'rounded-[6px] border-[.6px] border-solid border-select_border_grey'
          : 'rounded-[4px] border border-solid border-eerie_black',
        active && 'rounded-[6px] border-[1.6px] border-solid border-BLACK',
        isButtonClass && buttonClass,
        isDisabled && 'opacity-[.6]'
      )}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-4 border-t-transparent border-gray-400 border-solid rounded-full animate-spin"></div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${title}-${leftIcon}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            {isLeftIcon && (
              <div className="flex justify-center items-center h-[24px] w-[24px] ">
                <Image width={100} height={100} src={leftIcon} alt="buttonIcon" />
              </div>
            )}

            {isTitle && (
              <p
                className={cn(
                  'text-BLACK',
                  isSelect
                    ? 'rubik_normal text-[12px] leading-[14px] text-dark_charcoal'
                    : 'rubik_medium text-[16px] leading-[20px]',
                  active && 'rubik_semibold text-[12px] leading-[14px]',
                  titleClass ?? null
                )}
              >
                {title}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {isRightIcon && (
        <div
          className={cn(
            'flex justify-center items-center h-[24px] w-[24px] transition-transform duration-200',
            rotateIcon && 'rotate-180',
            isTitle && 'ml-[8px]'
          )}
        >
          <Image width={100} height={100} src={rightIcon} alt="buttonIcon" loading="lazy" />
        </div>
      )}

      {unavailable && (
        <div className="absolute bottom-0 flex">
          <span className="text-error_red text-[10px] rubik_regular">not in stock</span>
        </div>
      )}
    </button>
  );
}
