import { ItemBox, ItemBoxProps } from "@/components/item-box";

interface ItemListProps {
    itemList: ItemBoxProps[];
    onUpdate?: () => void;
}

export function ItemList({ itemList, onUpdate }: ItemListProps) {
    return (
        <div className="flex flex-col gap-3">
            {itemList.map((item) => (
                <ItemBox 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    unit={item.unit}
                    category={item.category}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    )
}