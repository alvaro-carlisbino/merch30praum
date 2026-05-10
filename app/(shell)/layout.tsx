import { BrandHeader } from "@/components/shell/BrandHeader";
import { BrandFooter } from "@/components/shell/BrandFooter";
import { BrandMarquee } from "@/components/shell/BrandMarquee";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { TrustBand } from "@/components/shell/TrustBand";
import { FreeShippingBar } from "@/components/shell/FreeShippingBar";
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
      <FreeShippingBar />
      <TrustBand />
      <BrandHeader cartCount={cartCount} />
      <BrandMarquee />
      <main className="flex-1">{children}</main>
      <BrandFooter />
      <CartDrawer />
    </>
  );
}
