"use client";

import * as React from "react"
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, Field, FieldLabel, Input } from "@/components/ui"

const units = [
    { name: "Un." },
    { name: "Kg" },
    { name: "L" }
] as const;

interface QuantityFieldProps {
    quantityValue?: string;
    onQuantityChange?: (value: string) => void;
    unitValue?: string | null;
    onUnitChange?: (value: string | null) => void;
}

export function QuantityField({ 
    quantityValue: externalQuantity, 
    onQuantityChange: externalOnQuantityChange,
    unitValue: externalUnit,
    onUnitChange: externalOnUnitChange
}: QuantityFieldProps = {}) {
    const [internalQuantity, setInternalQuantity] = React.useState("");
    const [internalUnit, setInternalUnit] = React.useState<string | null>("Un.");
    const [ isOpen, setIsOpen ] = React.useState(false);
    const [ isFocused, setIsFocused ] = React.useState(false);

    const isQuantityControlled = externalQuantity !== undefined;
    const isUnitControlled = externalUnit !== undefined;
    
    const quantity = isQuantityControlled ? externalQuantity : internalQuantity;
    const selectedQuantity = isUnitControlled ? externalUnit : internalUnit;

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!isQuantityControlled) {
            setInternalQuantity(newValue);
        }
        externalOnQuantityChange?.(newValue);
    };

    const handleUnitChange = (value: string | null) => {
        if (!isUnitControlled) {
            setInternalUnit(value);
        }
        externalOnUnitChange?.(value);
    };

    return (
        <Field className="w-40 gap-2 group">
            <FieldLabel 
                htmlFor="quantity" 
                className={`text-xs transition-colors ${isFocused ? 'text-[#A881E6]' : 'text-[#AFABB6]'}`}
            >
                Quantidade
            </FieldLabel>
            <div id="quantity" className="h-10 flex">
                <Input 
                    value={quantity}
                    onChange={handleQuantityChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-22 h-full text-[#FBF9FE] text-sm leading-4 bg-[#111112] p-3 g-2 rounded-l-md border rounded-r-none border-[#252529] focus-visible:border-[#A881E6] focus-visible:ring-0 focus-visible:ring-offset-0 transition-shadow duration-200"
                />
                <Combobox 
                    value={selectedQuantity} 
                    onValueChange={handleUnitChange}
                    open={isOpen}
                    onOpenChange={setIsOpen}
                >
                    <ComboboxInput className={`w-18 h-full rounded-r-md rounded-l-none bg-[#17171A] border transition-colors ${isOpen ? 'border-[#A881E6]' : 'border-[#252529]'} [&_input]:!text-[10px] [&_input]:text-[#AFABB6] [&_input]:leading-4 [&_input]:uppercase [&_input]:placeholder:!text-[10px] [&_input]:placeholder:text-[#AFABB6]`} />
                    <ComboboxContent className="min-w-0 w-18 bg-[#17171A] border border-b-0 border-[#252529] text-[#FBF9FE]">
                        <ComboboxList>
                            {units.map((unit) => (
                                <ComboboxItem 
                                    key={unit.name} 
                                    value={unit.name}
                                    className="p-3 text-[#FBF9FE] bg-[#17171A] hover:bg-[#252529] gap-2 rounded-none border-b border-[#252529]"
                                >
                                    {unit.name}
                                </ComboboxItem>
                            ))}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>
        </Field>
    )
}