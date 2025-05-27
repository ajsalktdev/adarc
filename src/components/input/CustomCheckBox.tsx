"use client";
import React from "react";
import { cn } from "@/utils/utils";

interface CustomCheckBoxProps {
  formData: { [key: string]: any };
  setData: any;
  name?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
}

export default function CustomCheckBox({
  formData,
  setData,
  name,
  height = 18,
  width = 18,
  className,
}: CustomCheckBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name) {
      setData((prevData: any) => ({
        ...prevData,
        [name]: e.target.checked,
      }))
    }
    else {
      setData(e.target.checked)
    }

  };

  return (
    <div
      className={cn("flex", className)}
    >
      <input
        type="checkbox"
        className={cn("cursor-pointer", "custom-checkbox")}
        checked={name ? !!formData[name] : false} 
        style={{ height, width }}
        onChange={handleChange}
      />
    </div>
  );
}
