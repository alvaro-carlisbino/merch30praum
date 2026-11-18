// Nomes dos cookies do carrinho, compartilhados entre servidor e navegador.
// O id do carrinho é httpOnly. A quantidade fica num cookie legível pelo
// navegador, para o header mostrar o contador sem renderizar a página no
// servidor (assim as páginas continuam estáticas e servidas pela CDN).
export const CART_COOKIE = "cartId";
export const CART_QTY_COOKIE = "cartQty";
export const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
