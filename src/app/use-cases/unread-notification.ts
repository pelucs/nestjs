import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

interface UnreadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(
    private notificationsRepository: NotificationsRepository,
  ) {}

  async execute(request: UnreadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if(!notification){
      throw new NotificationNotFoundError()
    }

    notification.unRead();

    await this.notificationsRepository.save(notification);
  }
}