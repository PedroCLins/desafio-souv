"use client";

import * as React from "react";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, Field, FieldLabel } from "@/components/ui";
import Image from "next/image";
import { iconApple, iconCake, iconCarrot, iconMeat, iconMilk } from "@/assets";

const categories = [
    { name: "Padaria", icon: iconCake },
    { name: "Legume", icon: iconCarrot },
    { name: "Carne", icon: iconMeat },
    { name: "Fruta", icon: iconApple },
    { name: "Bebida", icon: iconMilk },
] as const;

interface CategoryFieldProps {
    value?: string | null;
    onChange?: (value: string | null) => void;
}

export function CategoryField({ value: externalValue, onChange: externalOnChange }: CategoryFieldProps = {}) {
    const [internalValue, setInternalValue] = React.useState<string | null>(null);
    const [ isOpen, setIsOpen ] = React.useState(false);
    
    const isControlled = externalValue !== undefined;
    const selectedCategory = isControlled ? externalValue : internalValue;

    const handleChange = (value: string | null) => {
        if (!isControlled) {
            setInternalValue(value);
        }
        externalOnChange?.(value);
    };
    
    return (
        <Field className="w-58 gap-2 group">
            <FieldLabel 
                htmlFor="category" 
                className={`text-xs transition-colors ${isOpen || selectedCategory ? 'text-[#A881E6]' : 'text-[#AFABB6]'}`}
            >
                Categoria
            </FieldLabel>
            <Combobox 
                value={selectedCategory} 
                onValueChange={handleChange}
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <ComboboxInput 
                    placeholder="Selecionar categoria" 
                    className={`h-10 placeholder:text-sm placeholder:text-[#AFABB6] text-[#FBF9FE] text-sm focus-visible:ring-1 focus-visible:ring-[#A881E6] bg-[#17171A] border transition-colors ${isOpen ? 'border-[#A881E6]' : 'border-[#252529]'} [&>div]:transition-colors [&>div]:${isOpen ? 'border-[#A881E6]' : 'border-[#252529]'}`}
                />
                <ComboboxContent className="w-58 bg-[#17171A] border border-b-0 border-[#252529] text-[#FBF9FE]">
                    <ComboboxList>
                        <ComboboxItem 
                            value=""
                            className="p-3 text-sm text-[#FBF9FE] bg-[#17171A] hover:bg-[#252529] gap-2 rounded-none border-b border-[#252529]"
                        >
                            -- Nenhuma --
                        </ComboboxItem>
                        {categories.map((category) => (
                            <ComboboxItem 
                                key={category.name} 
                                value={category.name}
                                className="p-3 text-sm text-[#FBF9FE] bg-[#17171A] hover:bg-[#252529] gap-2 rounded-none border-b border-[#252529]"
                            >
                                <Image src={category.icon} alt={category.name} width={16} height={16} />
                                {category.name}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </Field>
    );
}