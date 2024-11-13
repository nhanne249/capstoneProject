export class BookDto {
  id: number;
  title: string;
  quantity?: number;
  author: string;
  image?: string[];
  description?: string;
  costPrice?: number;
  sellingPrice: number;
}