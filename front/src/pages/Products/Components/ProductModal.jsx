import { Button, Input, Separator } from "@/components/ui";
import { notifyInfo, notifySuccess } from "@/components/ui/Toast/Toasters";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProductSchema = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    quantity: z.number()
})


const ProductModal = ({
    rowData, rowIndex, onOpenChange, onConfirm, mode, setData
}) => {
    const editAvailable = mode === "edit" ? true : false;
    const [productMessages, setProductMessages] = useState({});
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: rowData
    });

    const generateProductModalMessages = useCallback(() => {
        return mode === "edit" ?
            {
                action: "Editing"
            } :
            {
                action: "Visualizing"
            }
    }, [mode])

    useEffect(() => {
        setProductMessages(generateProductModalMessages);
    }, [mode])

    const deleteProductFromData = () => {
        setData(prevProducts => prevProducts.filter((_, i) => i !== rowIndex));
        onConfirm();
    }

    const renderActionButtons = useCallback(() => {
        switch (mode) {
            case "edit": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-gray-100 hover:bg-white" type="button" onClick={onOpenChange}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground hover:bg-green-600 font-bold" type="submit">Confirm</Button>
                    </div>
                )
            };
            case "delete": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-gray-100 hover:bg-white" onClick={onOpenChange}>Cancel</Button>
                        <Button className="w-[48%] bg-destructive text-card-foreground font-bold hover:bg-red-700" onClick={deleteProductFromData}>Delete</Button>
                    </div>
                )
            }
        }
    }, [mode])

    const submitProductUpdate = (newProduct) => {
        setData(prevProducts => prevProducts.map((product, i) => {
            if (i === rowIndex) {
                product = {
                    ...product,
                    ...newProduct
                }
            }
            return product
        }))
        notifySuccess("Product updated");
        onConfirm();
    }

    return <Dialog defaultOpen={true} onOpenChange={onOpenChange}>
        <DialogContent className="bg-secondary text-secondary-foreground">
            <DialogHeader>
                <DialogTitle className="text-primary">{productMessages.action} product</DialogTitle>
                <DialogDescription>
                </DialogDescription>
            </DialogHeader>
            <Separator className="bg-card" />
            <form onSubmit={handleSubmit(submitProductUpdate)}>
                <Label htmlFor="name">Name</Label>
                <Input disabled={!editAvailable} {...register("name")}
                    className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                data-[name-errors=true]:my-0.5 my-1"
                    data-name-errors={!!errors.name}
                />
                {errors.name && <div className="form-error">{errors.name.message}</div>}
                <Label htmlFor="description">Description</Label>
                <Input disabled={!editAvailable} {...register("description")}
                    className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                data-[description-errors=true]:my-0.5 my-1"
                    data-description-errors={!!errors.description}
                />
                {errors.description && <div className="form-error">{errors.description.message}</div>}
                <Label htmlFor="price">Price</Label>
                <Input disabled={!editAvailable} {...register("price", { valueAsNumber: true })}
                    className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                data-[price-errors=true]:my-0.5 my-1"
                    data-price-errors={!!errors.price}
                />
                {errors.price && <div className="form-error">{errors.price.message}</div>}

                <Label htmlFor="quantity">Quantity</Label>
                <Input disabled={!editAvailable} {...register("quantity", { valueAsNumber: true })}
                    className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                data-[price-errors=true]:my-0.5 my-1"
                    data-quantity-errors={!!errors.quantity}
                />
                {errors.quantity && <div className="form-error">{errors.quantity.message}</div>}
                <Separator />
                <div className="flex mx-auto w-full gap-4">
                    {renderActionButtons()}
                </div>
            </form>
        </DialogContent>
    </Dialog>
}


export default ProductModal;
