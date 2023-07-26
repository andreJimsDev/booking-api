export abstract class BookingNotification {
  abstract sendNotification(payload: any): Promise<boolean>;
}
