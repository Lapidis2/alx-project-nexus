import { AdminProductDetails, ApiResponse } from "@/interfaces/product";

export async function fetchProducts(): Promise<AdminProductDetails[]> {
  const res = await fetch("/api/products");
  const data: AdminProductDetails[] = await res.json();
  return data.map((p: any) => ({ ...p, id: p._id, images: p.images || [] }));
}

export async function addProduct(newProduct: Omit<AdminProductDetails, "id">): Promise<AdminProductDetails> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  const data: ApiResponse<AdminProductDetails> = await res.json();
  if (!res.ok || !data.product || !data.id) throw new Error(data.message);
  return { ...data.product, id: data.id, images: data.product.images || [] };
}

export async function updateProduct(product: AdminProductDetails): Promise<void> {
  const res = await fetch("/api/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const data: ApiResponse<AdminProductDetails> = await res.json();
  if (!res.ok) throw new Error(data.message);
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
  const data: ApiResponse<AdminProductDetails> = await res.json();
  if (!res.ok) throw new Error(data.message);
}
