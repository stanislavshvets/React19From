'use client'

import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface MaskTextFieldProps {
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (event: { target: { name: string; e: Event } }) => void;
    mask: string | RegExp | ((value: string) => boolean);
    autoComplete?: string;
    name: string;
    className?: string;
    [key: string]: any;
}

const MaskTextField = forwardRef<HTMLInputElement, MaskTextFieldProps>(
    (props, inputRef) => {
        const { onBlur, onChange, mask, autoComplete, className, ...other } = props;

        return (
            <IMaskInput
                mask={mask}
                inputRef={inputRef}
                autoComplete={autoComplete}
                onAccept={(value: string) => {
                    if (onChange) {
                        onChange({ target: { name: other.name, value } });
                    }
                }}
                onBlur={onBlur}
                className={className}
                {...other}
            />
        );
    }
);

export default MaskTextField;