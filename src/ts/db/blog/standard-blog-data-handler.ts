import type { QueryOptions, SortValues } from 'mongoose';
import type { BlogDataItem } from '../../objects/BlogDataItem';

export default abstract class StandardBlogDataHandler {
  public abstract findBlogByRawId (rawId: string): Promise<BlogDataItem>;

  public abstract findAllBlogs (
    skip: number, limit: number, sort: Record<string, SortValues>, visible: boolean,
  ): Promise<Array<BlogDataItem>>;

  public abstract findBlogsByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<BlogDataItem>>;

  public abstract getTotalBlogCount (visible: boolean): Promise<number>;

  public abstract upsertBlog (blogToUpsert: BlogDataItem): Promise<BlogDataItem>;

  public abstract deleteBlogById (blogIdToRemove: string): Promise<BlogDataItem>;
}
