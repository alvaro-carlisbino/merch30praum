import { BrandHeader } from "@/components/shell/BrandHeader";
import { BrandFooter } from "@/components/shell/BrandFooter";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { getCart } from "@/lib/cart/actions";

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = await getCart();
  const cartCount = cart?.totalQuantity ?? 0;

  return (
    <>
      <BrandHeader cartCount={cartCount} />
      <main className="flex-1">{children}</main>
      <BrandFooter />
      <CartDrawer />
    </>
  );
}
