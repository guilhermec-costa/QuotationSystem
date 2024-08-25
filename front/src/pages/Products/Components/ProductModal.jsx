import ProductService from "@/api/productService";
import { Button, Input, Separator } from "@/components/ui";
import { notifySuccess } from "@/components/ui/Toast/Toasters";
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
    rowData, onConfirm, mode, setData
}) => {
    const editAvailable = (mode === "edit" || mode === "create") ? true : false;
    const [productMessages, setProductMessages] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: rowData ? rowData : null
    });

    const generateProductModalMessages = useCallback(() => {
        switch (mode) {
            case "edit": return { action: "Editing" }
            case "create": return { action: "Creating" }
            case "delete": return { action: "Deleting" }
            case "view": return { action: "Visualizing" }
        }
    }, [mode])

    useEffect(() => {
        setProductMessages(generateProductModalMessages);
    }, [mode])

    const deleteProductFromData = async () => {
        ProductService.delete(rowData.id);
        notifySuccess("Product deleted");
        setData(await ProductService.list());
        onConfirm();
    }

    const renderActionButtons = useCallback(() => {
        switch (mode) {
            case "edit": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-destructive hover:bg-red-800" type="button" onClick={onConfirm} variant="outline">Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground font-bold" type="submit">Confirm</Button>
                    </div>
                )
            };
            case "delete": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-destructive hover:bg-red-800" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground font-bold" onClick={deleteProductFromData}>Delete</Button>
                    </div>
                )
            };
            case "create": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-destructive hover:bg-red-800" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground font-bold" type="submit">Create</Button>
                    </div>
                )
            }
        }
    }, [mode])

    const updateProductDataset = async (newProduct) => {
        if (mode === "create") {
            await ProductService.create(newProduct);
            notifySuccess("Product created");
        }

        else if (mode === "edit") {
            await ProductService.updateOne(rowData.id, newProduct)
            notifySuccess("Product updated");
        }

        setData(await ProductService.list());
        onConfirm();
    }

    return <Dialog defaultOpen={true} onOpenChange={onConfirm}>
        <DialogContent className="bg-secondary text-secondary-foreground">
            <DialogHeader>
                <DialogTitle className="text-primary">{productMessages.action} product</DialogTitle>
                <DialogDescription>
                </DialogDescription>
            </DialogHeader>
            <Separator className="bg-card" />
            <form onSubmit={handleSubmit(updateProductDataset)}>
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
