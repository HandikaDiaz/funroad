import { CategoriesGetManyOutput } from "@/module/categories/types";
import Link from "next/link";

interface Props {
    category: CategoriesGetManyOutput[1];
    isOpen: boolean;
}

export const SubCategoryMenu = ({
    category,
    isOpen,
}: Props) => {
    if (!isOpen || !category.subcategories || category.subcategories.length === 0) return null;

    const backgroundColor = category.color || "#F5F5F5";

    return (
        <div className="absolute z-100"
            style={{
                top: "100%",
                left: 0,
            }}>
            <div className="h-3 w-60" />
            <div
                style={{ backgroundColor }}
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] -translate-x-[2px] -translate-y-[2px]">
                <div>
                    {category.subcategories?.map((subCategory) => (
                        <Link
                            key={subCategory.slug}
                            href={`/${category.slug}/${subCategory.slug}`}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium">
                            {subCategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}