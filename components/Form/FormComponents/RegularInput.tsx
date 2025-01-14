"use client"

import { useState } from "react";
import { RegularInputProps } from "@/components/Form/interfaces/form.dao";

const RegularInput = ({name, type, errors, placeholder, autoComplete, onBlur, getClassName}: RegularInputProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="relative">
                <input
                    type={type === "password" && showPassword ? "text" : type}
                    name={name}
                    id={name}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 ${getClassName()} placeholder-gray-300 outline-none`}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
            {errors && (
                <p id={`${name}-error`} className="text-sm text-red-500">
                    {errors}
                </p>
            )
            }
        </>
    );
};

export default RegularInput;