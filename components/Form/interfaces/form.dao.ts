type FormState = {
    success: boolean;
    message: string;
};

interface SubmitProps {
    disabled: boolean;
    state: {
        message: string;
    };
}

interface BaseProps {
    label: string;
    name: string;
    type: string;
    errors: string | undefined;
    placeholder?: string;
    autoComplete: string;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

interface MaskProps extends BaseProps {
    mask: string;
    checkbox?: never;
}

interface CheckboxProps extends BaseProps {
    checkbox: string;
    mask?: never;
}

interface StandardInputProps extends BaseProps {
    mask?: never;
    checkbox?: never;
}

type TextFieldProps = MaskProps | CheckboxProps | StandardInputProps;

interface RegularInputProps extends Omit<BaseProps, 'label'> {
    getClassName: () => string;
}

interface CheckboxInputProps extends Omit<RegularInputProps, 'type' | 'placeholder' | 'getClassName'> {
    checkbox: string;
}

export type { FormState, SubmitProps, TextFieldProps, RegularInputProps, CheckboxInputProps };