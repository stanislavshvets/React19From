import { useReducer } from "react";
import { z } from "zod";

type ValidationSchema = z.ZodObject<any>;
type ErrorsState = Record<string, string>;

type Action =
    | { type: "SET_ERROR"; payload: { field: string; message: string } }
    | { type: "CLEAR_ERROR"; payload: { field: string } };

const errorsReducer = (state: ErrorsState, action: Action): ErrorsState => {
    switch (action.type) {
        case "SET_ERROR":
            return { ...state, [action.payload.field]: action.payload.message };
        case "CLEAR_ERROR":
            const { [action.payload.field]: _, ...rest } = state;
            return rest;
        default:
            throw new Error(`Unknown action type: ${(action as Action).type}`);
    }
};

const useValidation = (validationSchema: ValidationSchema) => {
    const [errors, dispatch] = useReducer(errorsReducer, {});

    const validateField = (name: string, value: unknown) => {
        const processedValue =
            name === "checkbox" ? value === "on" : value;
        try {
            validationSchema.pick({ [name]: true }).parse({ [name]: processedValue });
            dispatch({ type: "CLEAR_ERROR", payload: { field: name } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                dispatch({
                    type: "SET_ERROR",
                    payload: { field: name, message: error.errors[0].message },
                });
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        console.log(`Validating field: ${name}, value: ${value}`);
        validateField(name, value);
    };

    const validateForm = (formData: FormData): boolean => {
        const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData.entries());

        const processedData = {
            ...data,
            checkbox: data.checkbox === "on",
        };

        try {
            validationSchema.parse(processedData);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formErrors = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {} as ErrorsState);
                for (const [field, message] of Object.entries(formErrors)) {
                    dispatch({
                        type: "SET_ERROR",
                        payload: { field, message },
                    });
                }
            }
            return false;
        }
    };

    return {
        errors,
        handleBlur,
        validateForm,
    };
};

export default useValidation;