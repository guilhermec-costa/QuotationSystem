import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { notifyError, notifySuccess, notifyWarning } from '@/components/ui/Toast/Toasters';
import PurchaseService from '@/api/purchaseService';
import { usePurchaseRequisition } from '@/hooks/usePurchaseRequisitions';
import { getFormmatedPurchases } from '@/hooks/usePurchaseRequisitions';

const PurchaseModal = ({ product, isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userData } = useAuth();
    const { setData: setPurchaseRequisitions } = usePurchaseRequisition();

    const onSubmit = async (data) => {
        const userId = userData.uid;
        const quantityToPurchase = parseInt(data.quantity, 10);
        if (quantityToPurchase > product.quantity) {
            notifyWarning(`Você não pode comprar mais do que o disponível. Quantidade disponível: ${product.quantity}`);
            return;
        }
        try {
            await PurchaseService.create(product.id, userId, quantityToPurchase)
            setPurchaseRequisitions(await PurchaseService.list());
            setPurchaseRequisitions(await getFormmatedPurchases());
        } catch (error) {
            notifyError("Failed to create purchase requisition: ", error.message);
        }
        notifySuccess(`Purchase requisition for ${product.name} created!`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Comprar {product.name}</DialogTitle>
                    <DialogDescription>
                        Quantidade disponível: {product.quantity}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                        <Input
                            id="quantity"
                            type="number"
                            min="1"
                            max={product.quantity}
                            defaultValue="1"
                            {...register('quantity', {
                                required: 'Quantidade é obrigatória',
                                min: { value: 1, message: 'Quantidade mínima é 1' },
                                max: { value: product.quantity, message: `Quantidade máxima é ${product.quantity}` }
                            })}
                            className={`border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {errors.quantity && (
                            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
                        )}
                    </div>
                    <Button type="submit">Confirmar Compra</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PurchaseModal;
