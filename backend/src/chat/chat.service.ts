import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, Message } from './chat.schema';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
@Injectable()
export class ChatService {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}

  async createPrivateChat(user1Id: string, user2Id: string): Promise<Chat> {
    const chat = new this.chatModel({
      type: 'private',
      participants: [user1Id, user2Id],
    });
    return chat.save();
  }

  async createGroupChat(name: string, participantIds: string[]): Promise<Chat> {
    const chat = new this.chatModel({
      type: 'group',
      groupName: name,
      participants: participantIds,
    });
    return chat.save();
  }

  async createCourseChat(courseId: string, participantIds: string[]): Promise<Chat> {
    const chat = new this.chatModel({
      type: 'course',
      courseId,
      participants: participantIds,
    });
    return chat.save();
  }

  async sendMessage(chatId: string, senderId: string, content: string): Promise<Message> {
    const message = new this.messageModel({
      sender: senderId,
      content,
      chat: chatId,
    });
    const savedMessage = await message.save();

    // Notify participants via WebSocket
    const chat = await this.chatModel.findById(chatId);
    chat.participants.forEach(participantId => {
      this.server.to(participantId.toString()).emit('newMessage', savedMessage);
    });

    return savedMessage;
  }

  async getChatHistory(chatId: string): Promise<Message[]> {
    return this.messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 })
      .populate('sender', 'firstName lastName')
      .exec();
  }

  async getUserChats(userId: string): Promise<Chat[]> {
    return this.chatModel
      .find({ participants: userId, isActive: true })
      .populate('participants', 'firstName lastName')
      .exec();
  }

  async markMessagesAsRead(chatId: string, userId: string): Promise<void> {
    await this.messageModel.updateMany(
      {
        chat: chatId,
        sender: { $ne: userId },
        read: false,
      },
      { read: true }
    ).exec();
  }
}
