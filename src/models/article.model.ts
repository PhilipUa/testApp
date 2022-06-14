export interface ArticleDto {
  id: string;
  title: string;
  slug: string;
  private?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date | null | undefined;
}
