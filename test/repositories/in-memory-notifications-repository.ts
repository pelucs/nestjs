import { Notification } from "@app/entities/notifications";
import { NotificationsRepository } from "@app/repositories/notifications-repository";

export class InMemoryNotificationsRepository implements NotificationsRepository  {
  
  public notifications: Notification[] = [];
  
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId
    );

    if(!notification) {
      return null;
    }

    return notification
  }

  // Pega todos as notificações do usuário
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );
  }

  // Pega a quantidade de notificações do usuário
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId
    ).length
  }
  
  // Cria uma notificação
  async create(notification: Notification){
    this.notifications.push(notification)
  }
  
  // Atualizar uma notificação
  async save(notification: Notification): Promise<void> {

    // Irá pegar uma notificação com base no index
    const notificationsIndex = this.notifications.findIndex(
      (item) => item.id === notification.id
    );

    // Irá sobrepor a notificação com uma nova atualização
    if(notificationsIndex >= 0){
      this.notifications[notificationsIndex] = notification
    }
  }
}