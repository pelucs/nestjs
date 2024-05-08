import { makeNotification } from "@test/factories/notification-factory";
import { UnreadNotification } from "./unread-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";

describe('Unread notification', () => {
  it('should be able to read a notification.', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepositories);

    const notification = makeNotification({
      readAt: new Date() // Quando criar uma notificação, já criar com uma data de leitura
    });

    notificationsRepositories.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepositories.notifications[0].readAt).toBeNull();
  });

  it('should not be able to read a non existing notification', () => {
    const notificationsRepositories = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepositories);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'exemplo-notification-id'
      })
    }).rejects.toThrow(NotificationNotFoundError)

  })
})