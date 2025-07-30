import { Footer } from "@/module/home/ui/components/footer";
import { Navbar } from "@/module/home/ui/components/navbar";
import { SearchFilter, SearchFiltersSkeleton } from "@/module/home/ui/components/search-filter";
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

interface Props {
    children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.categories.getMany.queryOptions(),
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<SearchFiltersSkeleton />}>
                    <SearchFilter />
                </Suspense>
            </HydrationBoundary>
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;