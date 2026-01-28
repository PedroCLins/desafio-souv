"use client";

import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui";
import * as React from "react";
import Image from "next/image";
import { iconApple, iconCarrot, iconCake, iconMeat, iconMilk, iconMeatballs } from "@/assets";
import { Trash, Pencil } from "lucide-react";
import { NewItemModal } from "./new-item-modal";
import api from "@/services/api";
import { toast } from "sonner";

export interface ItemBoxProps {
  id: string;
  name: string,
  quantity: number,
  unit: "unidade" | "kg" | "litro",
  category: "fruta" | "legume" | "padaria" | "carne" | "bebida",
  onUpdate?: () => void;
};

const icons = {
  "fruta": iconApple,
  "legume": iconCarrot,
  "padaria": iconCake,
  "carne": iconMeat,
  "bebida": iconMilk,
};

const colors = {
  "fruta": { "bg": "#261A17", "text": "#E07B67" },
  "legume": { "bg": "#1C2015", "text": "#8CAD51" },
  "padaria": { "bg": "#211E12", "text": "#BB9F3A" },
  "carne": { "bg": "#251622", "text": "#DB5BBF" },
  "bebida": { "bg": "#1A1D23", "text": "#7B94CB" },
};

export function ItemBox({id, name, quantity, unit, category, onUpdate}: ItemBoxProps) {
  const [ checked, setChecked ] = React.useState(false);
  const [ isEditModalOpen, setIsEditModalOpen ] = React.useState(false);

  const icon = icons[category];

  // Map backend values to frontend values for editing
  const unitMapping = {
    "unidade": "Un." as const,
    "kg": "Kg" as const,
    "litro": "L" as const,
  };

  const categoryMapping = {
    "fruta": "Fruta" as const,
    "legume": "Legume" as const,
    "padaria": "Padaria" as const,
    "carne": "Carne" as const,
    "bebida": "Bebida" as const,
  };

  async function handleDelete() {
    try {
      // Set a timeout to refresh regardless (backend doesn't send proper response)
      const timeoutId = setTimeout(() => {
        toast.success('Item removido com sucesso!');
        onUpdate?.();
      }, 100);
      
      await api.delete(`/item/${id}`);
      
      clearTimeout(timeoutId);
      toast.success('Item removido com sucesso!');
      onUpdate?.();
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast.error('Erro ao remover item. Tente novamente.');
      onUpdate?.();
    }
  }

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    onUpdate?.();
  };

  return (
    <>
      <div 
        className="w-180 h-17 rounded-lg flex items-center justify-between p-4 border border-[#252529]"
        style={{
          backgroundColor: checked ? '#111112' : '#17171A',
          borderColor: checked ? '#17171A' : '#252529'
        }}
      >
        <div className="flex items-center gap-4">
          <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)}/>
          <div className="flex flex-col gap-0.5">
            <p 
              className="text-[#FBF9FE] text-sm leading-[130%]"
              style={{ 
                textDecoration: checked ? 'line-through' : 'none' ,
                fontWeight: checked ? 'normal' : 'bold'
              }}
            >{name}</p>
            <p className="text-[#AFABB6] text-xs leading-[130%]">{quantity} {unit}{quantity > 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center px-4 py-2 gap-1.5 rounded-full"
            style={{ backgroundColor: colors[category].bg }}
          >
            <Image src={icon} alt={category} width={16} height={16} />
            <p 
            className="leading-[130%] text-xs font-semibold"
            style={{ color: colors[category].text }}
            >
            {category}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button className="p-0 cursor-pointer">
              <Image src={iconMeatballs} alt="Mais opções" width={20} height={20} />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40 bg-[#17171A] border-[#252529] text-[#FBF9FE] rounded-lg">
            <DropdownMenuLabel className="font-normal text-xs text-[#AFABB6]">Mais Opções</DropdownMenuLabel>
            <DropdownMenuItem 
              className="justify-between text-xs text-[#7B94CB] hover:bg-[#252529] cursor-pointer"
              onClick={() => setIsEditModalOpen(true)}
            >
              Editar item
              <Pencil className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="justify-between text-xs text-[#E07B67] hover:bg-[#252529] cursor-pointer"
              onClick={handleDelete}
            >
              Remover item
              <Trash className="h-4 w-4" />
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsEditModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <NewItemModal 
              onClose={handleEditClose}
              itemId={id}
              initialData={{
                name,
                category: categoryMapping[category],
                quantity: quantity.toString(),
                unit: unitMapping[unit],
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}