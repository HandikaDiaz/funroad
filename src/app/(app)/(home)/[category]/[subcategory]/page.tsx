import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/module/products/search-params";
import { ProductListView } from "@/module/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
    params: Promise<{
        category: string;
        subcategory: string;
    }>;
    searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic";

const Page = async ({ params, searchParams }: Props) => {
    const { subcategory } = await params
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            ...filters,
            category: subcategory,
            limit: DEFAULT_LIMIT
        }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory} />
        </HydrationBoundary>
    );
};

export default Page;