"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const dynamic = "force-dynamic";

const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        toast.promise(
            fetch('/api/nodemailer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to send message');
                    }
                    return response.json();
                })
                .then(() => {
                    setFormData({ name: '', email: '', message: '' });
                }),
            {
                loading: 'Sending your message...',
                success: 'Message sent successfully!',
                error: (error) => {
                    console.error('Error:', error.message);

                    if (error.message.includes('API key')) {
                        return 'Server configuration error. Please contact support.';
                    }
                    return error.message || 'Failed to send message';
                },
            }
        );
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#7EC8E3] to-[#96E6B3]">
                    Contact Us
                </h1>
                <p className="text-center text-neutral-600 dark:text-neutral-300 mb-10">
                    Have questions, feedback, or need help? We'd love to hear from you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-3">
                        <MailIcon className="w-5 h-5 text-primary" />
                        funroad@gmail.com
                    </div>
                    <div className="flex items-center gap-3">
                        <PhoneIcon className="w-5 h-5 text-primary" />
                        +62 852 2404 0865
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPinIcon className="w-5 h-5 text-primary" />
                        Remote Worldwide
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                        />
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                        />
                    </div>

                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Your Message"
                        required
                    />

                    <div className="text-center">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white hover:bg-white hover:text-black">
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Page;