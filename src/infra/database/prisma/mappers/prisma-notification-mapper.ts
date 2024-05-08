import { Notification as RawNotification } from '@prisma/client';
import { Notification } from "@app/entities/notifications";
import { Content } from '@app/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readyAt: notification.readAt,
      createAt: notification.createAt
    }
  }

  static toDoamin(raw: RawNotification): Notification {
    return new Notification({
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      readAt: raw.readyAt,
      canceledAt: raw.canceledAt,
      createAt: raw.createAt,
    }, raw.id)
  }
}