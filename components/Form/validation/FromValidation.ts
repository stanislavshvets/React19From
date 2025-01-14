import { z } from "zod";

export const FromValidation = z
    .object({
        username: z
            .string()
            .regex(
                /^([a-zA-ZА-ЯЁІЇҐЄЭа-яёіїґєэ']{2,50})\s?$/,
                "The name must contain only letters and be between 2 and 50 characters long"
            )
            .nonempty("The name cannot be empty"),
        email: z
            .string()
            .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
            .nonempty("The email cannot be empty"),
        phoneNumber: z
            .string()
            .regex(
                /^\+380(39|67|68|96|97|98|50|66|95|99|63|73|93|91|92|89|94)\d{7}$/,
                "Invalid phone number"
            )
            .nonempty("The phone number cannot be empty"),
        password: z
            .string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/, "The password is too weak")
            .nonempty("The password cannot be empty"),

        checkbox: z
            .boolean()
            .refine((value) => value === true, {
                message: "You must agree to the terms and conditions",
            }),
    })
