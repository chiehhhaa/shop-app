export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  featuredImage: {
    id: string;
    url: string;
  } | null;
  variants: {
    edges: {
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: {
    url: string;
  } | null;
}

interface ShopifyProductsResponse {
  data: {
    products: {
      edges: {
        node: ShopifyProduct;
      }[];
    };
  };
}

interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: {
        node: ShopifyCollection;
      }[];
    };
  };
}

interface ShopifyCollectionProductsResponse {
  data: {
    collection: {
      products: {
        edges: {
          node: ShopifyProduct;
        }[];
      };
    };
  };
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            featuredImage {
              id
              url
            }
            variants(first: 3) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://mock.shop/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = (await response.json()) as ShopifyProductsResponse;
  return result.data.products.edges.map((edge) => edge.node);
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  const query = `
    {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://mock.shop/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch collections");
  }

  const result = (await response.json()) as ShopifyCollectionsResponse;
  return result.data.collections.edges.map((edge) => edge.node);
}

export async function getProductsByCollection(
  handle: string
): Promise<ShopifyProduct[]> {
  const query = `
    {
      collection(handle: "${handle}") {
        products(first: 20) {
          edges {
            node {
              id
              title
              description
              featuredImage {
                id
                url
              }
              variants(first: 3) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://mock.shop/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch collection products");
  }

  const result = (await response.json()) as ShopifyCollectionProductsResponse;
  return result.data.collection.products.edges.map((edge) => edge.node);
}
