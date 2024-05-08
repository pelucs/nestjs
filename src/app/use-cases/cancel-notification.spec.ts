import { makeNotification } from "@test/factories/notification-factory";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";

describe('Cancel notification', () => {
  it('should be able to send a notification.', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepositories);

    const notification = makeNotification();

    notificationsRepositories.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepositories.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to cancel a non existing notification', () => {
    const notificationsRepositories = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepositories);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'exemplo-notification-id'
      })
    }).rejects.toThrow(NotificationNotFoundError)

  })
})