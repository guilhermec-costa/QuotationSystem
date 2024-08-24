import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { CircleDollarSign, Eye, EyeOff, LoaderCircle, Mail } from "lucide-react";
import { Input, Button, Separator } from "@/components/ui";
import { notifyError, notifySuccess } from "@/components/ui/Toast/Toasters";
import { useEffect } from "react";
import UserService from "@/api/userService";

const loginSchema = z.object({
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(6, "6 characters min")
});

const Login = ({ visible, setAuthStep, authStep }) => {
    const [isPwdVisible, setIsPwdVisible] = useState(false);
    const navigate = useNavigate();
    const { login, logout } = useAuth();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    useEffect(() => {
        reset();
    }, [authStep])

    const handleLoginSubmit = async (credentials) => {
        try {
            const loginResponse = await login(credentials);
            const currentUserStatus = await UserService.getUserStatus(loginResponse.user);
            if(currentUserStatus === "Inactive") {
                notifyError(`User ${loginResponse.user.email} is current blocked`);
                await logout();
                navigate("/auth");
                return
            }
            notifySuccess("Logged");
            navigate("/");
        } catch (err) {
            notifyError(err.message)
        }
    }

    const handlePwdVisibility = () => {
        setIsPwdVisible(prev => {
            return !prev;
        });
    }

    const getPwdVisibilityComponent = () => {
        return isPwdVisible ? <Eye width={16} className="text-foreground" /> : <EyeOff width={16} className="text-foreground" />
    }

    const loginButtonMessage = () => {
        return isSubmitting ?
            <div className="flex justify-center items-center">
                <p>Logging in...</p>
                <LoaderCircle className="animate-spin ml-2" width={16} />
            </div > :
            <p className="md:text-lg">Login</p>
    }

    return visible && (
        <>
            <h3 className="text-card-foreground text-lg md:text-xl lg:text-3xl">Welcome back!</h3>
            <h4 className="text-sm p-2 text-primary font-bold md:text-lg lg:text-sm">INFNET - Quotation System</h4>
            <CircleDollarSign className="w-[40px] h-[40px] text-yellow-500" />
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="w-full lg:w-4/5">
                <Separator className="bg-input mt-3" />
                <div className="w-full data mt-5 mb-2">
                    <div className="outline-none relative mb-2">
                        <Input {...register("email")} type="text" placeholder="Email"
                            className="focus-visible:ring-transparent ring-offset-transparent bg-input md:text-base
                                data-[email-errors=true]:my-0.5 my-4 mb-4"

                            data-email-errors={!!errors.email} />
                        <Mail className="absolute right-[3%] top-[50%] -translate-y-1/2 w-[16px]" />
                        {errors.email && <div className="form-error">{errors.email.message}</div>}
                    </div>

                    <div className="outline-none relative mb-2">
                        <Input {...register("password")} type={isPwdVisible ? "text" : "password"} placeholder="Password" autoComplete="current-password"
                            className="focus-visible:ring-transparent ring-offset-transparent bg-input md:text-base rounded-radius
                                        data-[pwd-errors=true]:my-0.5"
                            data-pwd-errors={!!errors.email}
                        />
                        <button className="absolute right-[3%] top-[50%] -translate-y-1/2" onClick={handlePwdVisibility} type="button">
                            {getPwdVisibilityComponent()}
                        </button>
                    </div>
                    <small className="login-sublabel md:text-base lg:text-sm" onClick={() => setAuthStep(1)}>Forgot password?</small>
                    {errors.password && <div className="form-error">{errors.password.message}</div>}

                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-primary w-full rounded-radius mt-4 mb-2">
                    {loginButtonMessage()}
                </Button>
                <small className="login-sublabel md:text-base lg:text-sm" onClick={() => setAuthStep(2)}>Don't have an account yet?</small>
            </form>
        </>
    )
}

export default Login;
