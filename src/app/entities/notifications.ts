import { Replace } from 'src/helpers/Replace';
import { Content } from './content';
import { randomUUID } from 'node:crypto';

export interface NotificationsProps {
  recipientId: string;
  content: Content;
  category: string;
  createAt: Date;
  canceledAt?: Date | null;
  readAt?: Date | null;
}

export class Notification {
  private _id: string;
  private props: NotificationsProps; // Private: apenas dentro da minha entidade eu posso manipula-los

  constructor(props: Replace<NotificationsProps, { createAt?: Date }>, id?: string) { // Omitindo o createAt das minhas props, pois ele pode ser definido ou não
    this._id = id ?? randomUUID() // Se o id exitir eu uso ele, se não eu crio um
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date()
    };
  }

  // Setar valores
  public set recipientId(recipientId: string) { this.props.recipientId = recipientId; }
  public set content(content: Content) { this.props.content = content; }
  public set category(category: string) { this.props.category = category; }
  public set createAt(createAt: Date) { this.props.createAt = createAt; }

  public cancel() {
    this.props.canceledAt = new Date()
  }

  public read() {
    this.props.readAt = new Date()
  }

  public unRead() {
    this.props.readAt = null
  }

  // Pegar valores
  public get id() { return this._id; }
  public get recipientId() { return this.props.recipientId; }
  public get content() { return this.props.content; }
  public get category() { return this.props.category; }
  public get canceledAt(): Date | null | undefined { return this.props.canceledAt; }
  public get readAt(): Date | null | undefined { return this.props.readAt; }
}
