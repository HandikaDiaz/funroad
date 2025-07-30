"use client";
import { DEFAULT_BG_COLOR } from "@/module/home/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { BreadcrumbNavigation } from "./breadcrumbs-navigation";
import { useProductFilter } from "@/module/products/hooks/use-product-fillter";

export const SearchFilter = () => {
    const pathname = usePathname();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    const [filters, setFilters] = useProductFilter();

    const params = useParams();
    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || "all";

    const activeCategoryData = data.find((category) => category.slug === activeCategory);

    const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
    const activeCategoryName = activeCategoryData?.name || null;

    const activeSubcategory = params.subcategory as string | undefined;
    const activeSubcategoryName = activeCategoryData?.subcategories?.find(
        (subCategory) => subCategory.slug === activeSubcategory
    )?.name || null;

    const hideOnPaths = ["/about", "/features", "/pricing", "/contact"];
    const isHidden = hideOnPaths.includes(pathname);

    if (isHidden) return null;

    return (
        <div
            className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
            style={{ backgroundColor: activeCategoryColor }}>
            <SearchInput
                defaultValue={filters.search}
                onChange={(value) => setFilters({
                    search: value
                })} />
            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
            <BreadcrumbNavigation
                activeCategory={activeCategory}
                activeCategoryName={activeCategoryName}
                activeSubcategoryName={activeSubcategoryName}
            />
        </div>
    )
}

export const SearchFiltersSkeleton = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: "#F5F5F5" }}>
            <SearchInput disabled />
            <div className="hidden lg:block">
                <div className="h-11" />
            </div>
        </div>
    )
}