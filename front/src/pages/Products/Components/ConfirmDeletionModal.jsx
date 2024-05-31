import { Button, Separator } from "@/components/ui";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ConfirmDeletionModal = ({
    rowData, rowIndex, visible, onOpenChange, onConfirm
}) => {
    return <Dialog defaultOpen={true} onOpenChange={onOpenChange} className="bg-secondary text-secondary-foreground">
        <DialogContent className="bg-secondary text-secondary-foreground">
            <DialogHeader>
                <DialogTitle>Deleting product "{rowData.name}"</DialogTitle>
                <DialogDescription>
                    Are you sure?
                </DialogDescription>
            </DialogHeader>
            <h3>{rowData.name}</h3>
            <h3>{rowData.description}</h3>
            <h3>{rowData.quantity}</h3>
            <h3>{rowData.price}</h3>
            <Separator />
            <div className="flex mx-auto w-full gap-4">
                <Button className="w-1/3 bg-gray-100 hover:bg-white" onClick={onOpenChange}>Cancel</Button>
                <Button className="bg-destructive text-card-foreground hover:bg-green-600 w-1/3 font-bold" onClick={onConfirm}>Delete</Button>
            </div>
        </DialogContent>
    </Dialog>
}


export default ConfirmDeletionModal;
