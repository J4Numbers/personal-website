import type StandardBlogDataHandler from '../db/blog/standard-blog-data-handler';
import type { BlogDataItem } from '../objects/BlogDataItem';

export default class BlogHandler {
  private readonly blogDataHandler: StandardBlogDataHandler;

  public constructor (blogDataHandler: StandardBlogDataHandler) {
    this.blogDataHandler = blogDataHandler;
  }

  public async getBlogById (id: string): Promise<BlogDataItem> {
    return this.blogDataHandler.findBlogByRawId(id);
  }

  public async lookupBlogs (title: string, tags: Array<string>): Promise<Array<BlogDataItem>> {
    return this.blogDataHandler.findBlogsByQuery({
      $or: [
        {
          tags: {
            $all: tags,
          },
        },
        {
          'long_title': {
            $regex:   title,
            $options: 'i',
          },
        },
      ],
    }, 0, 10, { 'long_title': -1 });
  }

  public async listBlogPosts (
    currentPage: number, maxPerPage: number, visible: boolean,
  ): Promise<Array<BlogDataItem>> {
    return this.blogDataHandler.findAllBlogs(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'time_posted': -1 }, visible,
    );
  }

  public async getTotalBlogCount (visible: boolean): Promise<number> {
    return this.blogDataHandler.getTotalBlogCount(visible);
  }

  public async submitBlog (blogDetails: BlogDataItem): Promise<BlogDataItem> {
    return this.blogDataHandler.upsertBlog(blogDetails);
  }

  public async deleteBlog (blogIdToDelete: string): Promise<BlogDataItem> {
    return this.blogDataHandler.deleteBlogById(blogIdToDelete);
  }
}
