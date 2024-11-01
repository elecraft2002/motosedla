export interface Category {
  id: number;
  parent_id: number | null;
  name: string;
}
export interface Product {
  id: number;
  category_id: number;
  uid: string;
  name: string;
  price: number;
  last_modified: string;
  image_url: string;
}
interface Image {
  image_url: string;
}
class Motosedla {
  private baseUrl: string;
  private fetchOptions: RequestInit;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.fetchOptions =
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["motosedla"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } };
  }

  // Vyhledání produktů podle názvu
  public async searchProductsByName(name: string): Promise<Product[]> {
    const response = await fetch(
      `${this.baseUrl}/products/search?name=${name}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }

  // Vyhledání podkategorií podle id
  public async getSubcategoriesById(
    id: number,
    recursive: boolean = false
  ): Promise<Category[]> {
    const response = await fetch(
      `${this.baseUrl}/categories/subcategories?categoryId=${id}&recursive=${recursive}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }
  // Vyhledání podkategorie podle jména
  public async getCategoryByName(name: string): Promise<Category> {
    const response = await fetch(
      `${this.baseUrl}/categories/name?name=${name}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }
  // Vyhledání produktů podle id více kategorií
  public async getProductsByCategoryIds(ids: number[]): Promise<Product[]> {
    const response = await fetch(
      `${this.baseUrl}/products/byCategories?categoryIds=${ids.join(",")}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }

  // Vyhledání kategorií podle názvu
  public async searchCategoriesByName(name: string): Promise<Category[]> {
    const response = await fetch(
      `${this.baseUrl}/categories/search?name=${name}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }
  // Vyhledání produktu podle uid
  public async getProductByUid(uid: string): Promise<Product> {
    const response = await fetch(
      `${this.baseUrl}/products/uid?productUid=${uid}`,
      this.fetchOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }
  // Vyhledání produktu podle id kategorie
  public async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    const response = await fetch(
      `${this.baseUrl}/products/categoryId?categoryId=${categoryId}`,
      this.fetchOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }
  // Vyhledání obrázků podle id produktu
  public async getImagesByProductId(uid: number): Promise<Image[]> {
    const response = await fetch(
      `${this.baseUrl}/images/id?productId=${uid}`,
      this.fetchOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    return response.json();
  }
  public async getAllProducts(): Promise<Product[]> {
    const response = await fetch(
      `${this.baseUrl}/products/all`,
      this.fetchOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
  public async getAllCategories(): Promise<Category[]> {
    const response = await fetch(
      `${this.baseUrl}/categories/all`,
      this.fetchOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
  public async getCategoryByPath(path: string): Promise<Category> {
    const response = await fetch(
      `${this.baseUrl}/categories/path?path=${path}`,
      this.fetchOptions
    );
    const json = await response.json();
    if (!response.ok || json === null) {
      throw new Error("Failed to fetch products");
    }
    return json;
  }
  public async getRootCategories(): Promise<Category[]> {
    const response = await fetch(
      `${this.baseUrl}/categories/root`,
      this.fetchOptions
    );
    const json = await response.json();
    if (!response.ok || json === null) {
      throw new Error("Failed to fetch products");
    }
    return json;
  }
  public async getCategoryById(id: number | any): Promise<Category> {
    const response = await fetch(
      `${this.baseUrl}/categories/id?id=${id}`,
      this.fetchOptions
    );
    const json = await response.json();
    if (!response.ok || json === null) {
      throw new Error("Failed to fetch products");
    }
    return json;
  }
}
export default new Motosedla("https://motosedla-7644.rostiapp.cz/api");
