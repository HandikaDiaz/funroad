import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/module/products/search-params";
import { ProductListView } from "@/module/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";

interface Props {
    searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            ...filters,
            limit: DEFAULT_LIMIT
        }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView />
        </HydrationBoundary>
    );
};

export default Page;