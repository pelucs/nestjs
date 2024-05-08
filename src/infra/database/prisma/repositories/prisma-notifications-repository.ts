import { Notification } from "src/app/entities/notifications";
import { NotificationsRepository } from "src/app/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(
    private prismaService: PrismaService  
  ) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readyAt: notification.readAt,
        createAt: notification.createAt
      }
    })
  }
}