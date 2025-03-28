export interface TEvent {
  id: string;
  start: string;
  note: string;
}

export interface TWeek {
  start: Date;
  end: Date;
  events: TEvent[];
} 