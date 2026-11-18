const IMAGE_FIELDS = `
  url
  altText
  width
  height
`;

const MONEY_FIELDS = `
  amount
  currencyCode
`;

export const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Product {
    id
    handle
    title
    tags
    productType
    availableForSale
    featuredImage {
      ${IMAGE_FIELDS}
    }
    priceRange {
      minVariantPrice { ${MONEY_FIELDS} }
      maxVariantPrice { ${MONEY_FIELDS} }
    }
    compareAtPriceRange {
      minVariantPrice { ${MONEY_FIELDS} }
    }
  }
`;

export const PRODUCT_DETAIL_FRAGMENT = `
  fragment ProductDetailFields on Product {
    ...ProductCardFields
    description
    descriptionHtml
    options {
      name
      optionValues { name }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions { name value }
          price { ${MONEY_FIELDS} }
          image { ${IMAGE_FIELDS} }
        }
      }
    }
    images(first: 10) {
      edges {
        node { ${IMAGE_FIELDS} }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!, $first: Int!) @inContext(country: BR) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image { ${IMAGE_FIELDS} }
      products(first: $first) {
        edges {
          node {
            ...ProductDetailFields
          }
        }
      }
    }
  }
  ${PRODUCT_DETAIL_FRAGMENT}
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) @inContext(country: BR) {
    product(handle: $handle) {
      ...ProductDetailFields
    }
  }
  ${PRODUCT_DETAIL_FRAGMENT}
`;

// Catálogo inteiro, paginado de 100 em 100.
export const GET_ALL_PRODUCTS = `
  query GetAllProducts($first: Int!, $after: String) @inContext(country: BR) {
    products(first: $first, after: $after, sortKey: CREATED_AT, reverse: true) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          ...ProductDetailFields
        }
      }
    }
  }
  ${PRODUCT_DETAIL_FRAGMENT}
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { ${MONEY_FIELDS} }
      totalAmount { ${MONEY_FIELDS} }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { ${MONEY_FIELDS} }
            amountPerQuantity { ${MONEY_FIELDS} }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions { name value }
              image { ${IMAGE_FIELDS} }
              product {
                id
                handle
                title
                tags
                featuredImage { ${IMAGE_FIELDS} }
              }
            }
          }
        }
      }
    }
  }
`;

const USER_ERRORS = `
  userErrors { field message }
`;

export const CART_CREATE = `
  mutation CartCreate($input: CartInput!) @inContext(country: BR) {
    cartCreate(input: $input) {
      cart { ...CartFields }
      ${USER_ERRORS}
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_GET = `
  query CartGet($cartId: ID!) @inContext(country: BR) {
    cart(id: $cartId) { ...CartFields }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_ADD = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) @inContext(country: BR) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      ${USER_ERRORS}
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_UPDATE = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) @inContext(country: BR) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      ${USER_ERRORS}
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_LINES_REMOVE = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) @inContext(country: BR) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      ${USER_ERRORS}
    }
  }
  ${CART_FRAGMENT}
`;
