export class CreateBookDto {
  title: string;
  quantity: number;
  author: string;
  image?: string;
  description?: string;
  costPrice: number;
  sellingPrice: number;
}