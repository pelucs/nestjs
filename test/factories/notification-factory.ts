import { Content } from "@app/entities/content";
import { Notification, NotificationsProps } from "@app/entities/notifications";

type Override = Partial<NotificationsProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: "social",
    content: new Content("Nova solicitação de amizade!"),
    recipientId: "recipient-2",
    ...override
  })
}