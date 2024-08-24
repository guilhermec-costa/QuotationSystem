import { Button, Input, Separator } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CircleDollarSign } from "lucide-react";
import { Mail } from "lucide-react";

const recoverPasswordSchema = z.object({
    email: z.string().email("Invalid email format")
})

export default function RecoverPassword({ visible, setAuthStep, authStep }) {
    const { recoverPassword } = useAuth();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(recoverPasswordSchema)
    })

    const handleRecoveringPassword = async (credentials) => {
        const { email } = credentials;
        await recoverPassword(email);
        reset();
        setAuthStep(0);
    }

    useEffect(() => {
        reset();
    }, [authStep])

    return visible && (
        <>
            <h3 className="text-card-foreground text-lg md:text-xl lg:text-3xl">Password recovering</h3>
            <CircleDollarSign className="w-[40px] h-[40px] text-yellow-500" />
            <form onSubmit={handleSubmit(handleRecoveringPassword)} className="w-full lg:w-4/5">
                <Separator className="bg-input mt-3" />
                <div className="w-full data mt-5">
                    <div className="outline-none relative mb-2">
                        <Input {...register("email")} type="text" placeholder="Email" autoComplete="recover-email"
                            className="focus-visible:ring-transparent ring-offset-transparent bg-input md:text-base
                                data-[email-errors=true]:my-0.5 my-4"

                            data-email-errors={!!errors.email} />
                        <Mail className="absolute right-[3%] top-[50%] -translate-y-1/2 w-[16px]" />
                        {errors.email && <div className="form-error">{errors.email.message}</div>}
                    </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-primary w-full rounded-2xl mt-4 mb-1">
                    Send email
                </Button>
                <small className="login-sublabel md:text-base lg:text-sm" onClick={() => setAuthStep(0)}>Already have an account?</small>
            </form>
        </>

    )
}
