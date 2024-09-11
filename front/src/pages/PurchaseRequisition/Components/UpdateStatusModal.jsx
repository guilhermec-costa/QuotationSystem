import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogOverlay, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import PurchaseService from '@/api/purchaseService';

const UpdateStatusModal = ({ setIsOpen, purchaseData }) => {
  const [status, setStatus] = useState(purchaseData?.status);

  const handleSave = () => {
    // PurchaseService.mutateStatus(purchaseData.id, )
    PurchaseService.mutateStatus(purchaseData.id, "status aleatório")
    setIsOpen(false);
  };

  return (
     <Dialog open={true} onOpenChange={setIsOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Status</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="pending">Pendente</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
          </DialogFooter>
          <DialogClose />
        </DialogContent>
      </Dialog>
  )

};


export default UpdateStatusModal;
