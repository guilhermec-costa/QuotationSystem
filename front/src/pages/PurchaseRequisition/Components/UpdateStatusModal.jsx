import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PurchaseService from "@/api/purchaseService";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui";
import { useQuotations } from "@/hooks/useQuotations";

const PurchaseStatuses = {
  OPENED: "Opened",
  IN_QUOTATION: "In Quotation",
  QUOTED: "Quoted",
};

const UpdateStatusModal = ({ setIsOpen, purchaseData, setData }) => {
  const [status, setStatus] = useState(purchaseData?.status);
  const [quotationsData, setQuotationsData] = useState([]);
  const [isQuotationsModalOpen, setIsQuotationsModalOpen] = useState(false); 
  const { data: quotations } = useQuotations();

  const numberOfQuotationsForCurrentProduct = React.useMemo(() => {
    const quotationsForCurrentProduct = quotations.filter(
      (quotation) => quotation.productId === purchaseData.productId
    );
    setQuotationsData(quotationsForCurrentProduct);
    return quotationsForCurrentProduct.length;
  }, [purchaseData.productId, quotations]);

  const handleSave = async () => {
    await PurchaseService.mutateStatus(purchaseData.id, status);
    setData();
    setIsOpen(false);
  };

  const getNextPurchaseStatus = () => {
    switch (numberOfQuotationsForCurrentProduct) {
      case 1:
      case 2:
        return PurchaseStatuses.IN_QUOTATION;
      case 3:
        return PurchaseStatuses.QUOTED;
      default:
        return PurchaseStatuses.OPENED;
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="bg-secondary text-secondary-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary">Purchase requisition</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <h3
            className="cursor-pointer underline" 
            onClick={() => setIsQuotationsModalOpen(true)} 
          >
            Quotations associated: {numberOfQuotationsForCurrentProduct}
          </h3>
          <Separator className="bg-card" />
          <Select
            onValueChange={(value) => setStatus(value)}
            defaultValue={purchaseData.status}
          >
            <SelectTrigger>
              <SelectValue placeholder="choose a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Statuses</SelectLabel>
                <SelectItem value={getNextPurchaseStatus()}>
                  {getNextPurchaseStatus()}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <section className="flex justify-end gap-x-4">
            <Button onClick={handleSave}>Salvar</Button>
            <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
          </section>
        </DialogContent>
      </Dialog>

      <Dialog open={isQuotationsModalOpen} onOpenChange={setIsQuotationsModalOpen}>
        <DialogOverlay />
        <DialogContent className="bg-secondary text-secondary-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary">Quotations Details</DialogTitle>
            <DialogClose onClick={() => setIsQuotationsModalOpen(false)} />
          </DialogHeader>
          <DialogDescription>
            {quotationsData.length > 0 ? (
              <ul>
                {quotationsData.map((quotation) => (
                  <li key={quotation.id}>
                    {quotation.productName} - ${quotation.price} on {quotation.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No quotations available.</p>
            )}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsQuotationsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateStatusModal;
