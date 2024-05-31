import { Button, Input } from "@/components/ui";
import { Separator } from "@/components/ui";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Mail } from "lucide-react";

const accountCreationSchema = z.object({
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(6, "6 characters min"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

const CreateAccount = ({ visible, setAuthStep, authStep }) => {
    const { createAccount } = useAuth();
    const [isPwdVisible, setIsPwdVisible] = useState(false);
    const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);
    const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(accountCreationSchema)
    });

    const getPwdVisibilityComponent = () => {
        return isPwdVisible ? <Eye width={16} className="text-foreground" /> : <EyeOff width={16} className="text-foreground" />
    }

    const getConfirmPwdVisibilityComponent = () => {
        return isConfirmPwdVisible ? <Eye width={16} className="text-foreground" /> : <EyeOff width={16} className="text-foreground" />
    }

    const handleCreateAccountSubmit = async (credentials) => {
        await createAccount(credentials);
        reset();
        setAuthStep(0);
    }

    useEffect(() => {
        reset();
    }, [authStep])

    return visible && (
        <>
            <h3 className="text-card-foreground text-lg md:text-xl lg:text-3xl">Password recovering</h3>
            <form onSubmit={handleSubmit(handleCreateAccountSubmit)} className="w-full lg:w-4/5">
                <Separator className="bg-input mt-3" />
                <div className="w-full data mt-5">
                    <div className="outline-none relative mb-2">
                        <Input {...register("email")} type="text" placeholder="Email"
                            className="focus-visible:ring-transparent ring-offset-transparent bg-input
                                data-[email-errors=true]:my-0.5 my-4 md:text-base"

                            data-email-errors={!!errors.email} />
                        <Mail className="absolute right-[3%] top-[50%] -translate-y-1/2 w-[16px]" />
                        {errors.email && <div className="form-error">{errors.email.message}</div>}
                    </div>

                    <div className="outline-none border-solid border-gray-100 relative">
                        <Input {...register("password")} type={isPwdVisible ? "text" : "password"} placeholder="Password" autoComplete="current-password"
                            className="focus-visible:ring-transparent ring-offset-transparent bg-input md:text-base
                                        data-[pwd-errors=true]:my-0.5 my-4"
                            data-pwd-errors={!!errors.password}
                        />
                        <button className="absolute right-[3%] top-[50%] -translate-y-1/2" onClick={() => setIsPwdVisible(prev => !prev)} type="button">
                            {getPwdVisibilityComponent()}
                        </button>
                    </div>
                    {errors.password && <div className="form-error">{errors.password.message}</div>}
                    <div className="outline-none border-solid border-gray-100 relative">
                        <Input {...register("confirmPassword")} type={isConfirmPwdVisible ? "text" : "password"} placeholder="Confirm password" autoComplete="confirm-password"
                            className="focus-visible:ring-transparent ring-offset-transparent bg-input md:text-base
                                        data-[pwd-errors=true]:my-0.5 my-4"
                            data-pwd-errors={!!errors.confirmPassword}
                        />
                        <button className="absolute right-[3%] top-[50%] -translate-y-1/2" onClick={() => setIsConfirmPwdVisible(prev => !prev)} type="button">
                            {getConfirmPwdVisibilityComponent()}
                        </button>
                    </div>
                    {errors.confirmPassword && <div className="form-error">{errors.confirmPassword.message}</div>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-primary w-full rounded-2xl mt-4 mb-2">
                    Create Account
                </Button>
                <small className="login-sublabel md:text-base lg:text-sm" onClick={() => setAuthStep(0)}>Already have an account?</small>
            </form>
        </>
    )
}

export default CreateAccount;
