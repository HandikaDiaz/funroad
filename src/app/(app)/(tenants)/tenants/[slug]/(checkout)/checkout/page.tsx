import { CheckoutView } from "@/module/checkout/ui/views/checkout-views";

interface PageProps {
    params: Promise<{ slug: string }>;
};

const Page = async ({ params }: PageProps) => {
    const { slug } = await params;
    
    return <CheckoutView tenantSlug={slug} />
};

export default Page;