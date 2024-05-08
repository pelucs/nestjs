import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification";

describe('Send notification', () => {
  it('should be able to send a notification.', async () => {
    const notificationsRepositories = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepositories);

    const { notification} = await sendNotification.execute({
      category: 'Social',
      content: 'This is a notification',
      recipientId: crypto.randomUUID()
    });

    expect(notificationsRepositories.notifications).toHaveLength(1);
    expect(notificationsRepositories.notifications[0]).toEqual(notification)
  })
})