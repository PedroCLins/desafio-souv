import { Button, Field, FieldTitle } from "@/components/ui"
import { ItemSearchField, CategoryField, QuantityField } from "@/components";
import * as React from "react";
import api from "@/services/api";
import { toast } from "sonner";


interface NewItemModalProps {
    onClose: () => void;
    itemId?: string;
    initialData?: {
        name: string;
        category: string | null;
        quantity: string;
        unit: string | null;
    };
}

export function NewItemModal({ onClose, itemId, initialData }: NewItemModalProps) {
    const [itemName, setItemName] = React.useState(initialData?.name || "");
    const [category, setCategory] = React.useState<string | null>(initialData?.category || null);
    const [quantity, setQuantity] = React.useState(initialData?.quantity || "");
    const [unit, setUnit] = React.useState<string | null>(initialData?.unit || "Un.");

    const isEditMode = !!itemId;

    async function handleSubmit() {
        try {
            if (isEditMode) {
                await api.patch(`/item/${itemId}`, {
                    name: itemName,
                    category: category,
                    quantity: Number(quantity),
                    unit: unit
                });
                toast.success('Item atualizado com sucesso!');
            } else {
                await api.post('/item', {
                    name: itemName,
                    category: category,
                    quantity: Number(quantity),
                    unit: unit
                });
                toast.success('Item adicionado com sucesso!');
            }
            onClose();
        } catch (error) {
            console.error('Failed to save item:', error);
            toast.error('Erro ao salvar item. Tente novamente.');
        }
    }

    return (
        <Field className="p-4 w-60 h-auto bg-[#17171A] border border-[#252529] rounded-lg flex flex-col">
            <FieldTitle className="text-[#FBF9FE] text-sm font-bold">
                {isEditMode ? 'Editar Item' : 'Novo Item'}
            </FieldTitle>
            <ItemSearchField value={itemName} onChange={setItemName} />
            <CategoryField value={category} onChange={setCategory} />
            <QuantityField quantityValue={quantity} onQuantityChange={setQuantity} unitValue={unit} onUnitChange={setUnit} />
            <Button 
                className="mt-4 w-full bg-[#7450AC] hover:bg-[#523480] font-semibold text-sm text-[#FBF9FE] cursor-pointer"
                onClick={handleSubmit}
            >
                {isEditMode ? 'Atualizar Item' : 'Adicionar Item'}
            </Button>
        </Field>
    )
}