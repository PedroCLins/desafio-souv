import { Button } from "@/components/ui"
import { Plus } from "lucide-react"
import { NewItemModal } from "./new-item-modal"
import * as React from "react"

interface AddItemButtonProps {
    onItemAdded?: () => void;
}

export function AddItemButton({ onItemAdded }: AddItemButtonProps = {}) {
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    
    const handleClose = () => {
        setIsModalOpen(false);
        onItemAdded?.();
    };
    
    return (
        <>
            <Button 
                className="w-10 h-10 p-2 rounded-full bg-[#7450AC] hover:bg-[#523480] cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <Plus className="!w-6 !h-6 text-white" />
            </Button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <NewItemModal onClose={handleClose} />
                    </div>
                </div>
            )}
        </>
    )
}