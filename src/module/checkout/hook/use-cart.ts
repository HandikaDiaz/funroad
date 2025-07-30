import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store"
import { useShallow } from "zustand/react/shallow"

export const useCart = (tenantSlug: string) => {
    const addProduct = useCartStore((state) => state.addProduct);
    const removeProduct = useCartStore((state) => state.removeProduct);
    const clearCart = useCartStore((state) => state.clearCart);
    const clearAllCarts = useCartStore((state) => state.clearAllCarts);

    const productIds = useCartStore(useShallow((state) => state.tenantCarts[tenantSlug]?.productIds || []));

    const toggleProduct = useCallback((proudctId: string) => {
        if (productIds.includes(proudctId)) {
            removeProduct(tenantSlug, proudctId);
        } else {
            addProduct(tenantSlug, proudctId);
        }
    }, [addProduct, removeProduct, productIds, tenantSlug]);

    const isProductInCart = useCallback((productId: string) => {
        return productIds.includes(productId);
    }, [productIds]);

    const clearTenantCart = useCallback(() => {
        clearCart(tenantSlug);
    }, [clearCart, tenantSlug]);

    const handleAddProduct = useCallback((productId: string) => {
        addProduct(tenantSlug, productId);
    }, [addProduct, tenantSlug]);

    const handleRemoveProduct = useCallback((productId: string) => {
        removeProduct(tenantSlug, productId);
    }, [removeProduct, tenantSlug]);

    return {
        productIds,
        addProduct: handleAddProduct,
        removeProduct: handleRemoveProduct,
        clearCart: clearTenantCart,
        clearAllCarts,
        toggleProduct,
        isProductInCart,
        totalItems: productIds.length,
    };
};