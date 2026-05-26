import { Taskbar } from "@/components/lanhouse/Taskbar";
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
      <div className="wallpaper" aria-hidden />
      <main className="relative z-[1] min-h-[calc(100svh-34px)]">{children}</main>
      <Taskbar cartCount={cartCount} />
      <CartDrawer />
    </>
  );
}
