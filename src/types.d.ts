type TWeek = {
  start: Date;
  note?: string;
}
type WeekOfTheYear = {
  start: Date;
  end: Date;
  events?: TWeek[];
}