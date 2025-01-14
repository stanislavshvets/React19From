"use client";

import Form from "next/form";

import { useActionState } from "react";
import useValidation from "@/components/Form/hooks/useValidation";
import { FromValidation } from "@/components/Form/validation/FromValidation";
import { submitData } from "@/components/Form/submit.action";
import TextField from "@/components/Form/FormComponents/TextField";
import { FormState } from "@/components/Form/interfaces/form.dao";
import Submit from "@/components/Form/FormComponents/Submit";

const MainForm = () => {
    const initialState: FormState = {
        success: false,
        message: "",
    };

    const [state, formAction, isPending] = useActionState(submitData, initialState);

    const { errors, handleBlur, validateForm } = useValidation(FromValidation);

    const handleSubmit = (formData: FormData) => {
        if (!validateForm(formData)) return;
        formAction(formData);
    };

    return (
        <div className="w-full bg-white rounded-lg border border-gray-500 shadow-2xl px-6 py-8 sm:max-w-2xl md:mx-0 mx-2.5">
            <h5 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Create an account</h5>
            <Form action={handleSubmit}>
                <TextField
                    label="Your username"
                    name="username"
                    type="text"
                    errors={errors.username}
                    autoComplete="given-name"
                    onBlur={handleBlur}
                />
                <TextField
                    label="Your email"
                    name="email"
                    type="email"
                    errors={errors.email}
                    autoComplete="email"
                    onBlur={handleBlur}
                />
                <TextField
                    label="Your Phone Number"
                    name="phoneNumber"
                    type="tel"
                    errors={errors.phoneNumber}
                    autoComplete="tel"
                    onBlur={handleBlur}
                    mask="+380000000000"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors.password}
                    autoComplete="new-password"
                    onBlur={handleBlur}
                />
                <TextField
                    checkbox={"checkbox"}
                    label="checkbox"
                    name="checkbox"
                    type="checkbox"
                    errors={errors.checkbox}
                    autoComplete="off"
                    onBlur={handleBlur}
                />
                <Submit disabled={Object.values(errors).some((error) => error)} state={state} />
            </Form>
        </div>
    );
};

export default MainForm;
