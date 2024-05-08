import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import {  
  Post,
  Body, 
  Controller, 
} from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {

  constructor(
    private sendNotification: SendNotification
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category  } = body;    

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content, 
      category
    })  
  }
}
