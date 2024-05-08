import { Notification } from "@app/entities/notifications";

export class NotificationViewModelMapper {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId
    }
  }
}