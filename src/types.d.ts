type TWeek = {
  start: Date;
  note?: string;
}
type TEvent = {
  start: Date;
  end?: Date;
  note?: string;
}
type WeekOfTheYear = {
  start: Date;
  end: Date;
  events?: TWeek[];
}