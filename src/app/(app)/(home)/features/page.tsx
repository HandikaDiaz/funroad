"use client";
import {
    StoreIcon,
    CreditCardIcon,
    ShieldCheckIcon,
    StarIcon,
    LayoutDashboardIcon,
    LibraryIcon,
    ZapIcon,
    UsersIcon,
    FileTextIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const featureCategories = [
    {
        title: "For Vendors",
        description: "Tools to help creators succeed",
        features: [
            {
                title: "Custom Storefronts",
                description: "Each vendor gets a beautifully designed, customizable storefront to showcase their digital products and brand identity.",
                icon: <StoreIcon className="w-5 h-5" />,
            },
            {
                title: "Direct Payouts via Stripe",
                description: "Instant, secure payments directly to your bank account with Stripe Connect integration.",
                icon: <CreditCardIcon className="w-5 h-5" />,
            },
            {
                title: "Advanced Analytics",
                description: "Track sales, customer behavior, and product performance with detailed dashboards.",
                icon: <FileTextIcon className="w-5 h-5" />,
            },
        ],
        colorClass: "bg-blue-50 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
        title: "For Buyers",
        description: "Seamless shopping experience",
        features: [
            {
                title: "Personal Libraries",
                description: "Instant access to all purchased digital goods in your personal cloud library, available anytime.",
                icon: <LibraryIcon className="w-5 h-5" />,
            },
            {
                title: "Ratings & Reviews",
                description: "Share your experience and read authentic feedback from other buyers.",
                icon: <StarIcon className="w-5 h-5" />,
            },
            {
                title: "One-Click Purchases",
                description: "Checkout in seconds with saved payment methods and instant downloads.",
                icon: <ZapIcon className="w-5 h-5" />,
            },
        ],
        colorClass: "bg-purple-50 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
        title: "Platform Features",
        description: "Built for security and scale",
        features: [
            {
                title: "Role-Based Access",
                description: "Secure, granular permissions for admins, vendors, and buyers to keep everything organized.",
                icon: <ShieldCheckIcon className="w-5 h-5" />,
            },
            {
                title: "Unified Dashboards",
                description: "Beautiful, intuitive interfaces for managing all aspects of your marketplace experience.",
                icon: <LayoutDashboardIcon className="w-5 h-5" />,
            },
            {
                title: "Multi-Vendor Support",
                description: "Thousands of creators can join and sell simultaneously with our scalable infrastructure.",
                icon: <UsersIcon className="w-5 h-5" />,
            },
        ],
        colorClass: "bg-green-50 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400"
    }
];

const Page = () => {
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    return (
        <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 transition-opacity duration-300 ease-in">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#7EC8E3] to-[#96E6B3]">
                        Powerful Marketplace Features
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                        Designed for creators and buyers alike. Everything you need to sell and discover amazing digital products.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {featureCategories.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className={`${category.colorClass} p-6 rounded-xl h-full transition-shadow duration-300 hover:shadow-lg`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 rounded-lg ${category.colorClass} ${category.iconColor}`}>
                                        {category.features[0]?.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
                                            {category.title}
                                        </h2>
                                        <p className="text-neutral-600 dark:text-neutral-300">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {category.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                                        >
                                            <div className={`flex items-center gap-3 mb-2 ${category.iconColor}`}>
                                                {feature.icon}
                                                <h3 className="font-medium text-neutral-800 dark:text-white">
                                                    {feature.title}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16 transition-opacity duration-500 ease-in">
                    <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
                        Ready to get started?
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {session.data?.user ? (
                            <Link href="/admin">
                                <Button size="lg" className="transition-transform hover:scale-105">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                size="lg"
                                className="transition-transform hover:scale-103 bg-black text-white hover:bg-white hover:text-black">

                                Join as Vendor
                            </Button>
                        )}
                        <Link href="/">
                            <Button
                                size="lg"
                                variant="outline"
                                className="transition-transform hover:scale-103 bg-white text-black hover:bg-black hover:text-white">
                                Explore Marketplace
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;