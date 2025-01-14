"use client"

import Link from "next/link";
import { CheckboxInputProps } from "@/components/Form/interfaces/form.dao";

const CheckboxInput = ({name, errors, autoComplete, onBlur, checkbox}: CheckboxInputProps) => {
    return (
        <div className="flex flex-col items-start">
            <div className="flex items-center h-5">
                <input
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer"
                    type={checkbox}
                    name={name}
                    autoComplete={autoComplete}
                    id={name}
                    onBlur={onBlur}
                />
                <div className="ml-3 text-sm">
                    <label className="flex font-light text-gray-900">
                        <p>I accept the&nbsp;
                            <Link
                                href="#"
                                className="font-medium text-gray-900 hover:underline"
                            >
                                Terms and Conditions
                            </Link>
                        </p>
                    </label>
                </div>
            </div>
            {errors && (
                <p
                    id={`${name}-error`}
                    className="text-sm text-red-500"
                >
                    {errors}
                </p>
            )}
        </div>
    );
};

export default CheckboxInput;