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

interface ShopifyResponse {
  data: {
    products: {
      edges: {
        node: ShopifyProduct;
      }[];
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

  const result = (await response.json()) as ShopifyResponse;
  return result.data.products.edges.map((edge) => edge.node);
}
