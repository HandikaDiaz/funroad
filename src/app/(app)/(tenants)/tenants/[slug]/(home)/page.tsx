import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/module/products/search-params";
import { ProductListView } from "@/module/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
    searchParams: Promise<SearchParams>;
    params: Promise<{ slug: string }>
};

export const dynamic = "force-dynamic";

const Page = async ({ searchParams, params }: Props) => {
    const { slug } = await params;
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            ...filters,
            tenantSlug: slug,
            limit: DEFAULT_LIMIT
        }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView tenantSlug={slug} narrowView />
        </HydrationBoundary>
    )
};

export default Page;


