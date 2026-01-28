"use client";

import * as React from "react";
import { Input, Field, FieldLabel } from "@/components/ui";

interface ItemSearchFieldProps {
    value?: string;
    onChange?: (value: string) => void;
}

export function ItemSearchField({ value: externalValue, onChange: externalOnChange }: ItemSearchFieldProps = {}) {
    const [internalValue, setInternalValue] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);

    const isControlled = externalValue !== undefined;
    const value = isControlled ? externalValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!isControlled) {
            setInternalValue(newValue);
        }
        externalOnChange?.(newValue);
    };

    return (
        <Field className="w-58 gap-2 group">
            <FieldLabel 
                htmlFor="item-search" 
                className={`text-xs transition-colors ${isFocused || value ? 'text-[#A881E6]' : 'text-[#AFABB6]'}`}
            >
                Item
            </FieldLabel>
            <Input 
                id="item-search" 
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="bg-[#111112] border border-[#252529] text-[#FBF9FE] text-sm leading-4 focus-visible:ring-1 focus-visible:ring-[#A881E6] focus-visible:ring-offset-0 transition-shadow duration-200"
            />
        </Field>
    );
}