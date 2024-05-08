import { makeNotification } from "@test/factories/notification-factory";
import { ReadNotification } from "./read-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";

describe('Read notification', () => {
  it('should be able to read a notification.', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepositories);

    const notification = makeNotification();

    notificationsRepositories.create(notification);

    await readNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepositories.notifications[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to read a non existing notification', () => {
    const notificationsRepositories = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepositories);

    expect(() => {
      return readNotification.execute({
        notificationId: 'exemplo-notification-id'
      })
    }).rejects.toThrow(NotificationNotFoundError)

  })
})