export interface TimeType {
  unix: Unix;
  timestamp: Unix;
  timezone: Timezone;
  season: Timezone;
  time12: Time12;
  time24: Time24;
  date: Date;
}

interface Date {
  full: Full2;
  other: Other;
  year: Year;
  month: Month;
  day: Day;
  weekday: Weekday;
}

interface Weekday {
  name: string;
  champ: string;
  number: Number;
}

interface Day {
  name: string;
  events: Events;
  number: Number;
}

interface Events {
  local: Local;
  holy?: any;
  global?: any;
}

interface Local {
  text: string;
  holiday: boolean;
}

interface Month {
  name: string;
  asterism: string;
  number: Number;
}

interface Year {
  name: string;
  animal: string;
  leapyear: string;
  agone: Agone;
  left: Agone;
  number: Number;
}

interface Agone {
  days: Number;
  percent: Number;
}

interface Other {
  gregorian: Official;
  ghamari: Official;
}

interface Full2 {
  official: Official;
  unofficial: Official;
}

interface Official {
  iso: Number;
  usual: Number;
}

interface Time24 {
  full: Number;
  hour: Number;
  minute: Number;
  second: Number;
}

interface Time12 {
  full: Full;
  hour: Number;
  minute: Number;
  second: Number;
  microsecond: Number;
  shift: Shift;
}

interface Shift {
  short: string;
  full: string;
}

interface Full {
  short: Number;
  full: Number;
}

interface Timezone {
  name: string;
  number: Number;
}

interface Number {
  fa: string;
  en: string;
}

interface Unix {
  fa: string;
  en: number;
}

// weather
export interface WeatherType {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf?: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coord {
  lon: number;
  lat: number;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}
export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface FuthreWeather {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface EventType {
  is_holiday: boolean;
  events: Event[];
}

interface Event {
  description: string;
  additional_description: string;
  is_holiday: boolean;
  is_religious: boolean;
}