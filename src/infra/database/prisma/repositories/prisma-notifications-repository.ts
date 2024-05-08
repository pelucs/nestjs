import { Injectable } from "@nestjs/common";
import { Notification } from "src/app/entities/notifications";
import { PrismaService } from "../prisma.service";
import { NotificationsRepository } from "src/app/repositories/notifications-repository";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(
    private prisma: PrismaService  
  ) {}

  // Pegando por id
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    });

    if(!notification){
      return null
    }

    return PrismaNotificationMapper.toDoamin(notification)
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      }
    });

    // return notifications.map(notification => {
    //   return PrismaNotificationMapper.toDoamin(notification)
    // });

    // OU

    return notifications.map(PrismaNotificationMapper.toDoamin) // Forma simplificada
  }

  // Pegando a quantidade de notificações
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      }
    });

    return count
  } 

  // Create notification
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    
    await this.prisma.notification.create({
      data: raw,
    })
  }

  // Salvando novas atualizações na notificação
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id
      },
      data: raw,
    });
  }
}