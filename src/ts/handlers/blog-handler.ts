import StandardBlogDataHandler from '../db/blog/standard-blog-data-handler';
import {BlogDataItem} from '../objects/BlogDataItem';

export default class BlogHandler {
  blogDataHandler: StandardBlogDataHandler;

  constructor(blogDataHandler: StandardBlogDataHandler) {
    this.blogDataHandler = blogDataHandler;
  }

  async getBlogById(id: string): Promise<BlogDataItem> {
    return this.blogDataHandler.findBlogByRawId(id);
  }

  async lookupBlogs(title: string, tags: Array<string>): Promise<Array<BlogDataItem>> {
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

  async listBlogPosts(currentPage: number, maxPerPage: number, visible: boolean) {
    return this.blogDataHandler.findAllBlogs(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'time_posted': -1 }, visible,
    );
  }

  async getTotalBlogCount(visible: boolean) {
    return this.blogDataHandler.getTotalBlogCount(visible);
  }

  async submitBlog(blogDetails: BlogDataItem): Promise<BlogDataItem> {
    return this.blogDataHandler.upsertBlog(blogDetails);
  }

  async deleteBlog(blogIdToDelete: string): Promise<BlogDataItem> {
    return this.blogDataHandler.deleteBlogById(blogIdToDelete);
  }
}
