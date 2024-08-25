import QuotationService from "@/api/quotationService";
import { Button, Input, Separator, Select, Label } from "@/components/ui";
import { notifySuccess } from "@/components/ui/Toast/Toasters";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SelectItem, SelectLabel, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const QuotationSchema = z.object({
    date: z.string().refine(val => val.match(/^\d{4}-\d{2}-\d{2}$/), {
        message: "Date must be in the format YYYY-MM-DD"
    }),
    price: z.string(),
    productId: z.string()
});

const QuotationModal = ({
    rowData,
    onConfirm,
    mode,
    setData
}) => {
    const editAvailable = mode === "edit" || mode === "create";
    const [quotationMessages, setQuotationMessages] = useState({});
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(QuotationSchema),
        defaultValues: rowData ? rowData : {}

    });

    const { data: products } = useProducts();

    const generateQuotationModalMessages = useCallback(() => {
        switch (mode) {
            case "edit": return { action: "Editing" };
            case "create": return { action: "Creating" };
            case "delete": return { action: "Deleting" };
            case "view": return { action: "Viewing" };
            default: return { action: "Editing" };
        }
    }, [mode]);

    useEffect(() => {
        setQuotationMessages(generateQuotationModalMessages());
    }, [mode]);

    const deleteQuotationFromData = async () => {
        QuotationService.delete(rowData.id);
        notifySuccess("Quotation deleted");
        setData(await QuotationService.list());
        onConfirm();
    };

    const renderActionButtons = useCallback(() => {
        switch (mode) {
            case "edit": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-destructive hover:bg-red-800" type="button" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground font-bold" type="submit">Confirm</Button>
                    </div>
                )
            };
            case "delete": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-destructive hover:bg-red-800" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground font-bold" onClick={deleteQuotationFromData}>Delete</Button>
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
    }, [mode]);

    const updateQuotationDataset = async (newQuotation) => {
        if (mode === "create") {
            await QuotationService.create(newQuotation);
            notifySuccess("Quotation created!");
        }

        else if (mode === "edit") {
            await QuotationService.updateOne(rowData.id, newQuotation);
            notifySuccess("Quotation updated");
        }

        setData(await QuotationService.list());
        onConfirm();
    };

    return (
        <Dialog defaultOpen={true} onOpenChange={onConfirm}>
            <DialogContent className="bg-secondary text-secondary-foreground">
                <DialogHeader>
                    <DialogTitle className="text-primary">{quotationMessages.action} quotation</DialogTitle>
                </DialogHeader>
                <Separator className="bg-card" />
                <form onSubmit={handleSubmit(updateQuotationDataset)}>
                    <Label htmlFor="productName">Product</Label>
                    <Select
                        disabled={!editAvailable}
                        {...register("productName")}
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base"
                        defaultValue={rowData?.productId}
                        onValueChange={value => setValue("productId", value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Products</SelectLabel>
                                {products.map(product => (
                                    <SelectItem key={product.id} value={product.id}>
                                        {product.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.productName && <div className="form-error">{errors.productName.message}</div>}

                    <Label htmlFor="date">Date</Label>
                    <Input
                        disabled={!editAvailable}
                        {...register("date")}
                        type="date"
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base"
                    />
                    {errors.date && <div className="form-error">{errors.date.message}</div>}

                    <Label htmlFor="price">Price</Label>
                    <Input
                        disabled={!editAvailable}
                        {...register("price")}
                        type="string"
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base"
                    />
                    {errors.price && <div className="form-error">{errors.price.message}</div>}

                    <Separator />
                    <div className="flex mx-auto w-full gap-4">
                        {renderActionButtons()}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default QuotationModal;
