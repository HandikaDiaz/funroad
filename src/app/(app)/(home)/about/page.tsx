import { RocketIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const Page = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
            <section className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#7EC8E3] to-[#96E6B3] bg-clip-text text-transparent">
                    About Our Marketplace
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Welcome to the future of e-commerce - a multi-vendor platform where innovation meets opportunity,
                    and where every seller gets the tools to succeed in the digital marketplace.
                </p>
            </section>

            <section className="mb-16 bg-white p-8 rounded-2xl">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#FFB347]/10 text-[#FFB347] dark:bg-[#FFB347]/20">
                        <RocketIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-[#FFB347]">Our Mission</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We're democratizing e-commerce by creating a fair, transparent marketplace where vendors of all sizes can thrive. Our platform combines cutting-edge technology with human-centric design to empower sellers and delight buyers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">Why Choose Our Platform</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <ShoppingCartIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold">For Sellers</h3>
                        </div>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Beautiful, customizable storefronts</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Direct access to thousands of customers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Low commission rates with transparent pricing</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Powerful seller tools and analytics</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                <UsersIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold">For Buyers</h3>
                        </div>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Discover unique products from independent sellers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Secure checkout with multiple payment options</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Verified seller reviews and ratings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Dedicated customer support</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Page;