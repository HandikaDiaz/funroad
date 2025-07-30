import { CheckIcon, StarIcon, ZapIcon, UsersIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
    const plans = [
        {
            name: "Starter",
            price: "Free",
            description: "Perfect for creators just getting started.",
            features: [
                "1 Storefront",
                "Unlimited Digital Products",
                "Basic Analytics",
                "Standard Support",
            ],
            cta: "Get Started",
            popular: false,
            color: "#96E6B3",
            icon: <ZapIcon className="w-5 h-5" />
        },
        {
            name: "Pro",
            price: "$12/month",
            description: "For growing vendors who need more tools.",
            features: [
                "Everything in Starter",
                "Custom Storefront Domain",
                "Advanced Analytics",
                "Email Support",
                "Platform Fee Reduction",
            ],
            cta: "Go Pro",
            popular: true,
            color: "#7EC8E3",
            icon: <UsersIcon className="w-5 h-5" />
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Tailored solution for high-volume vendors.",
            features: [
                "Everything in Pro",
                "Priority Support",
                "White-label Option",
                "Dedicated Manager",
                "Custom Integrations",
            ],
            cta: "Contact Sales",
            popular: false,
            color: "#D8B5FF",
            icon: <MailIcon className="w-5 h-5" />
        },
    ];

    return (
        <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC8E3] to-[#96E6B3] mb-4">
                        Flexible Pricing
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300">
                        Choose a plan that fits your needs. Start for free and upgrade as you grow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative border rounded-xl p-6 transition-all hover:shadow-lg 
                                ${plan.popular
                                    ? `border-[${plan.color}] dark:border-[${plan.color}] bg-gradient-to-b from-[${plan.color}]/10 to-transparent dark:from-[${plan.color}]/10`
                                    : "border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                                }`}
                        >
                            {plan.popular && (
                                <div className={`absolute top-0 right-6 -translate-y-1/2 bg-[${plan.color}] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center`}>
                                    <StarIcon className="w-3 h-3 mr-1" />
                                    Most Popular
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-lg bg-[${plan.color}]/10 text-[${plan.color}]`}>
                                    {plan.icon}
                                </div>
                                <h2 className="text-xl font-semibold text-neutral-800 dark:text-white">
                                    {plan.name}
                                </h2>
                            </div>

                            <div className="mb-6">
                                <p className="text-3xl font-bold text-[${plan.color}] mb-1">
                                    {plan.price}
                                    {plan.price !== "Free" && (
                                        <span className="text-sm font-normal text-neutral-600 dark:text-neutral-400">/month</span>
                                    )}
                                </p>
                                <p className="text-neutral-600 dark:text-neutral-300">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-neutral-700 dark:text-neutral-200"
                                    >
                                        <CheckIcon className={`w-5 h-5 text-[${plan.color}] flex-shrink-0 mt-0.5`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                size="lg"
                                className="w-full bg-black text-white hover:bg-white hover:text-black"
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    <p>Need help choosing? <Link href="/contact" className="text-[#7EC8E3] hover:underline">Contact our sales team</Link></p>
                    <p className="mt-2">All plans come with a 14-day money-back guarantee.</p>
                </div>
            </div>
        </main>
    );
};

export default Page;