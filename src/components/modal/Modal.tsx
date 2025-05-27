"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { cn } from "@/utils/utils";

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  noCloseButton = true,
}: {
  isOpen: any;
  onClose: any;
  children: any;
  className?: string;
  noCloseButton?: boolean ;
}) => {
  const overlayAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
  };

  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };
  useEffect(() => {
    const html = document.documentElement;
    if (isOpen) {
      html.classList.add("modal-enabled");
    } else {
      html.classList.remove("modal-enabled");
    }

    return () => {
      html.classList.remove("modal-enabled");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center no-scrollbar"
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{ zIndex: "1000" }}
        >
          <motion.div
            className="absolute inset-0 bg-[#0D121C]"
            variants={overlayAnimation}
            onClick={onClose}
            initial="hidden"
            animate="visible"
            exit="hidden"
          ></motion.div>
          <motion.div
            className={cn(
              "bg-white p-4 rounded-lg z-20 relative  max-w-[92%] max-h-[90vh]  overflow-scroll no-scrollbar",
              className
            )}
            variants={modalAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            {noCloseButton ? null : (
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={onClose}
                style={{
                  zIndex: 1,
                }}
              >
                <div className="w-[22px]">
                  <Image
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/components/icons/general/x.svg"
                    }
                    alt="icon"
                    width={1000}
                    height={1000}
                  />
                </div>
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
