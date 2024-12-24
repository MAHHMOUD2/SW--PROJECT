import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForumPost, ForumComment } from './forum.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel('ForumPost') private readonly postModel: Model<ForumPost>,
    @InjectModel('ForumComment') private readonly commentModel: Model<ForumComment>,
  ) {}

  async createPost(createPostDto: CreatePostDto, authorId: string): Promise<ForumPost> {
    const post = new this.postModel({
      ...createPostDto,
      author: authorId,
    });
    return post.save();
  }

  async getCoursePosts(courseId: string): Promise<ForumPost[]> {
    return this.postModel
      .find({ course: courseId, isActive: true })
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 })
      .exec();
  }

  async addComment(postId: string, createCommentDto: CreateCommentDto, authorId: string): Promise<ForumComment> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Forum post not found');
    }

    const comment = new this.commentModel({
      ...createCommentDto,
      author: authorId,
      post: postId,
    });
    const savedComment = await comment.save();

    await this.postModel.findByIdAndUpdate(
      postId,
      { $push: { comments: savedComment._id } }
    ).exec();

    return savedComment;
  }

  async getPostComments(postId: string): Promise<ForumComment[]> {
    return this.commentModel
      .find({ post: postId, isActive: true })
      .populate('author', 'firstName lastName')
      .sort({ createdAt: 1 })
      .exec();
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.postModel.findOne({ _id: postId, author: userId });
    if (!post) {
      throw new NotFoundException('Post not found or unauthorized');
    }
    
    await this.postModel.findByIdAndUpdate(postId, { isActive: false }).exec();
    await this.commentModel.updateMany(
      { post: postId },
      { isActive: false }
    ).exec();
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentModel.findOne({ _id: commentId, author: userId });
    if (!comment) {
      throw new NotFoundException('Comment not found or unauthorized');
    }
    
    await this.commentModel.findByIdAndUpdate(commentId, { isActive: false }).exec();
  }
}
