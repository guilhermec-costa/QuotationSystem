import React, { useState } from 'react';
import { Pencil, Delete, View, ShoppingCart } from 'lucide-react';
import ActionsEllipses from '@/components/ActionsEllipses';
import PurchaseModal from './PurchaseModal';
import { useAuth } from '@/hooks/useAuth';

const ActionsCell = ({ row, table }) => {
    const { renderProductModal } = table.options.meta;
    const { getIsAdmin } = useAuth();
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handlePurchaseClick = (product) => {
        setSelectedProduct(product);
        setIsPurchaseModalOpen(true);
    };

    return (
        <>
            <ActionsEllipses
                actions={[
                    {
                        title: "Edit",
                        callback: () => renderProductModal(row.original, row.index, "edit"),
                        icon: <Pencil className="w-[18px] mr-3" />,
                        disabled: !getIsAdmin() ? true : false
                    },
                    {
                        title: "Delete",
                        callback: () => renderProductModal(row.original, row.index, "delete"),
                        icon: <Delete className="w-[18px] mr-3" />,
                        disabled: !getIsAdmin() ? true : false
                    },
                    {
                        title: "View",
                        callback: () => renderProductModal(row.original, row.index, "view"),
                        icon: <View className="w-[18px] mr-3" />,
                        disabled: !getIsAdmin() ? true : false
                    },
                    row.original.quantity > 0 && {
                        title: "purchase",
                        callback: () => handlePurchaseClick(row.original),
                        icon: <ShoppingCart className="w-[18px] mr-3" />,
                        disabled: !getIsAdmin() ? true : false
                    }
                ]}
            />
            {selectedProduct && (
                <PurchaseModal
                    product={selectedProduct}
                    isOpen={isPurchaseModalOpen}
                    onClose={() => setIsPurchaseModalOpen(false)}
                />
            )}
        </>
    );
};

export default ActionsCell;
