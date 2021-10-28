import {QueryOptions, SortValues} from 'mongoose';
import {BlogDataItem} from '../../objects/BlogDataItem';

export default abstract class StandardBlogDataHandler {
  abstract findBlogByRawId (rawId: string): Promise<BlogDataItem>;

  abstract findAllBlogs (skip: number, limit: number, sort: { [key: string]: SortValues }, visible: boolean): Promise<Array<BlogDataItem>>;

  abstract findBlogsByQuery (query: QueryOptions, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<BlogDataItem>>;

  abstract getTotalBlogCount (visible: boolean): Promise<number>;

  abstract upsertBlog (blogToUpsert: BlogDataItem): Promise<BlogDataItem>;

  abstract deleteBlogById (blogIdToRemove: string): Promise<BlogDataItem>;
}
