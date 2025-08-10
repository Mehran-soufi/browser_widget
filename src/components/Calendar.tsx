import { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import type { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function PersianCalendar() {
  const [value, setValue] = useState<DateObject | null>(null);

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-between">
      <Calendar
        value={value}
        onChange={setValue}
        calendar={persian}
        locale={persian_fa}
        className="w-full h-full bg-transparent"
      />
      
    </div>
  );
}
