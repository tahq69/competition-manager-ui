import { Id } from "@/typings";

export class CreateMessage {
  public to: Id | null = null;
  public subject: string | null = null;
  public body: string | null = null;
  public importance_level?: number;
}
