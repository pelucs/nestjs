import { Replace } from 'src/helpers/Replace';
import { Content } from './content';
import { randomUUID } from 'node:crypto';

export interface NotificationsProps {
  recipientId: string;
  content: Content;
  category: string;
  createAt: Date;
  readAt?: Date | null;
}

export class Notification {
  private _id: string;
  private props: NotificationsProps; // Private: apenas dentro da minha entidade eu posso manipula-los

  constructor(props: Replace<NotificationsProps, { createAt?: Date }>) { // Omitindo o createAt das minhas props, pois ele pode ser definido ou não
    this._id = randomUUID()
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date()
    };
  }

  
  public set recipientId(recipientId: string) { this.props.recipientId = recipientId; }
  public set content(content: Content) { this.props.content = content; }
  public set category(category: string) { this.props.category = category; }
  public set readAt(readAt: Date | null | undefined) { this.props.readAt = readAt; }
  public set createAt(createAt: Date) { this.props.createAt = createAt; }

  public get id() { return this._id; }
  public get recipientId() { return this.props.recipientId; }
  public get content() { return this.props.content; }
  public get category() { return this.props.category; }
  public get readAt(): Date | null | undefined { return this.props.readAt; }
}
