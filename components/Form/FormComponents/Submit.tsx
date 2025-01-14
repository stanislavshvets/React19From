"use client"

import {useFormStatus} from "react-dom";
import { SubmitProps } from "@/components/Form/interfaces/form.dao";

const Submit = ( {disabled, state} : SubmitProps ) => {

    const { pending } = useFormStatus()

    return (
        <div className="flex items-center justify-between">
            <button
                type="submit"
                className={`p-2 bg-pinkDark rounded-md mt-2 border bg-gray-50 border-gray-300 
                    ${pending || !disabled ? "hover:bg-gray-200 focus:bg-gray-300" : ""}
                `}
                disabled={ pending || disabled}
            >
                {pending ? "Submitting..." : "Submit"}
            </button>
            {state.message && <p className="text-green-500">{state.message}</p>}
        </div>
    );
};

export default Submit;