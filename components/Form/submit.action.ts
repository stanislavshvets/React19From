"use server";

const bcrypt = require('bcrypt');
import { z } from "zod";
import { FromValidation } from "@/components/Form/validation/FromValidation";

export const submitData = async (_: unknown, userData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const hashPassword = await bcrypt.hash(userData.get("password") as string, 4);

    const user = {
        username: userData.get("username") as string,
        email: userData.get("email") as string,
        phoneNumber: userData.get("phoneNumber") as string,
        password: hashPassword,
        checkbox: userData.get("checkbox") === "on",
    };

    try {
        FromValidation.parse(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Server validation errors:", error.errors);
            return {
                success: false,
                message: "Invalid input",
                errors: error.errors.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                })),
            };
        }
    }

    console.log("USER--->", user);

    return { success: true, message: "success" };
};