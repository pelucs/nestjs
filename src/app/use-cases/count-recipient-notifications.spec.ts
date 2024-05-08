import { makeNotification } from "@test/factories/notification-factory";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";

describe('Count recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotifications(notificationsRepositories);

    await notificationsRepositories.create(makeNotification({ recipientId: 'recipient-1' }))

    await notificationsRepositories.create(makeNotification({ recipientId: 'recipient-1' }))

    await notificationsRepositories.create(makeNotification({ recipientId: 'recipient-2' }))

    const { count } = await countRecipientNotifications.execute({
      notificationId: "recipient-1"
    });

    expect(count).toEqual(2);
  });
})