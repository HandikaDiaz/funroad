import { StarPicker } from "@/components/star-picker";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ReviewsGetOneOutput } from "@/module/reviews/type";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
    productId: string;
    initialData?: ReviewsGetOneOutput;
};

const formSchema = z.object({
    rating: z.number().min(1, { message: "Rating is required" }).max(5),
    description: z.string().min(1, { message: "Description is required" }),
})

export const ReviewForm = ({ productId, initialData }: Props) => {
    const [isPreview, setIsPreview] = useState(!!initialData);

    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const createReview = useMutation(trpc.reviews.create.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({
                productId
            }));
            setIsPreview(true);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }));

    const updateReview = useMutation(trpc.reviews.update.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({
                productId
            }));
            setIsPreview(true);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }));

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: initialData?.rating ?? 0,
            description: initialData?.description ?? "",
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (initialData) {
            updateReview.mutate({
                reviewId: initialData.id,
                rating: values.rating,
                description: values.description
            })
        } else {
            createReview.mutate({
                productId,
                rating: values.rating,
                description: values.description
            });
        };
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-y-4"
                onSubmit={form.handleSubmit(onSubmit)}>
                <p className="font-medium">
                    {isPreview ? "Your rating:" : "Liked it? Give it a rating"}
                </p>
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <StarPicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isPreview} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="What to leave a written review?"
                                    disabled={isPreview}
                                    {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {!isPreview && (
                    <Button
                        variant="elevated"
                        disabled={createReview.isPending || updateReview.isPending}
                        type="submit"
                        size="lg"
                        className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit">
                        {initialData ? "Update review" : "Post review"}
                    </Button>
                )}
            </form>
            {isPreview && (
                <Button onClick={() => setIsPreview(false)}
                    size="lg"
                    type="button"
                    variant="elevated"
                    className="w-fit mt-4">
                    Edit
                </Button>
            )}
        </FormProvider>
    )
};

export const ReviewFormSkeleton = () => {
    return (
        <form
            className="flex flex-col gap-y-4">
            <p className="font-medium">
                Liked it? Give it a rating
            </p>
            <StarPicker disabled />

            <Textarea
                disabled
                placeholder="What to leave a written review?" />
            <Button
                variant="elevated"
                type="submit"
                size="lg"
                className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit">
                Post review
            </Button>
        </form>
    )
}