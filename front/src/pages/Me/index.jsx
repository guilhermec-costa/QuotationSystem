import React, { useState, memo, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button, Input, Label } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { notifyError, notifySuccess } from '@/components/ui/Toast/Toasters';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const accountCreationSchema = z.object({
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(6, "6 characters min"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

const Me = () => {
    const { createAccount } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch
    } = useForm({
        resolver: zodResolver(accountCreationSchema)
    });

    const password = watch('password');

    const onSubmit = async (credentials) => {
        try {
            await createAccount(credentials);
        } catch (err) {
            notifyError(err.message)
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Cadastrar Usuário</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastro de Usuário</DialogTitle>
                    <DialogDescription>
                        Preencha as informações para criar uma nova conta.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="login">Login</Label>
                        <Input
                            id="email"
                            {...register('email', { required: 'Login é obrigatório' })}
                            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Senha é obrigatória' })}
                            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirme a Senha</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword', {
                                required: 'Confirmação de senha é obrigatória',
                                validate: value => value === password || 'Senhas não coincidem',
                            })}
                            className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <Button type="submit">Cadastrar</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default memo(Me);
