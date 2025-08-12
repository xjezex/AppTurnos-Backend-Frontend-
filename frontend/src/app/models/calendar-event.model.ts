export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}
