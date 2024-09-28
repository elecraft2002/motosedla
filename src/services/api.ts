interface Product {
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
    this.fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    };
  }

  // Vyhledání produktů podle názvu
  public async searchProductsByName(name: string): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}/products/search?name=${name}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }

  // Vyhledání kategorií podle názvu
  public async searchCategoriesByName(name: string): Promise<any[]> {
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
}
export default new Motosedla("https://motosedla-7644.rostiapp.cz/api");
