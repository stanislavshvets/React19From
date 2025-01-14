"use client";

import MaskTextField from "@/components/Form/FormComponents/MaskTextField";
import { useState } from "react";
import RegularInput from "@/components/Form/FormComponents/RegularInput";
import { TextFieldProps } from "@/components/Form/interfaces/form.dao";
import CheckboxInput from "@/components/Form/FormComponents/CheckboxInput";

const TextField = ({
                       label,
                       name,
                       type,
                       errors,
                       mask,
                       checkbox,
                       placeholder,
                       onBlur,
                       autoComplete,
                   }: TextFieldProps) => {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsTouched(true);
        onBlur(e);
    };

    const getClassName = () => {
        if (!isTouched) return "";
        return errors
            ? "border-red-500 focus:border-red-500"
            : "border-green-300 focus:border-green-300";
    };

    return (
        <div className="p-6 space-y-4 md:space-y-6">
            <div>
                {!checkbox && (
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        {label}
                    </label>
                )}
                {mask ? (
                    <div>
                        <MaskTextField
                            mask={mask}
                            type={type}
                            name={name}
                            id={name}
                            autoComplete={autoComplete}
                            onBlur={handleBlur}
                            inputMode="tel"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 ${getClassName()} placeholder-gray-300 outline-none`}
                        />
                        {errors && (
                            <p id="email-error" className="text-sm text-red-500">
                                {errors}
                            </p>
                        )}
                    </div>
                ) : checkbox ? (
                    <CheckboxInput
                        checkbox={checkbox}
                        name={name}
                        autoComplete={autoComplete}
                        onBlur={onBlur}
                        errors={errors}
                    />
                ) : (
                    <RegularInput
                        name={name}
                        type={type}
                        errors={errors}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        onBlur={handleBlur}
                        getClassName={getClassName}
                    />
                )}
            </div>
        </div>
    );
};

export default TextField;
