import { useEffect, useState } from "react";
import type { EventType, TimeType } from "../types";

function Time() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [time, setTime] = useState<TimeType | null>(null);
  const [events, setEvents] = useState<EventType | null>(null);
  const [fulltime, setFullTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleTimeString("fa-IR", { hour12: false });
  });

  async function getTime() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://api.keybit.ir/time/");
      if (!res.ok) throw new Error("خطا در دریافت زمان");
      const resData = await res.json();
      setTime(resData);
      setError(false);
    } catch (e) {
      console.error("خطا در دریافت زمان:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function getHoliday(year: number, month: number, day: number) {
    try {
      const res = await fetch(
        `https://holidayapi.ir/jalali/${year}/${month}/${day}`
      );
      if (!res.ok) throw new Error("خطا در دریافت مناسبت تاریخی");
      const resData = await res.json();
      setEvents(resData);
    } catch (e) {
      console.error("خطا در دریافت مناسبت تاریخی:", e);
      setEvents(null);
    }
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setFullTime(now.toLocaleTimeString("fa-IR", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchData() {
      await getTime();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (
      time &&
      time.date &&
      time.date.year &&
      time.date.month &&
      time.date.day
    ) {
      const year = Number(time.date.year) || new Date().getFullYear();
      const month =
        Number(time.date.month.number.fa) || new Date().getMonth() + 1;
      const day = Number(time.date.day.number.fa) || new Date().getDate();
      getHoliday(year, month, day);
    } else {
      const now = new Date();
      const persianDate = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).formatToParts(now);

      let year = 0,
        month = 0,
        day = 0;
      for (const part of persianDate) {
        if (part.type === "year") year = Number(part.value);
        else if (part.type === "month") month = Number(part.value);
        else if (part.type === "day") day = Number(part.value);
      }
      if (year && month && day) getHoliday(year, month, day);
    }
  }, [time]);

  const localDate = new Date();

  const fallbackTime: TimeType = {
    unix: { fa: localDate.getTime().toString(), en: localDate.getTime() },
    timestamp: { fa: localDate.getTime().toString(), en: localDate.getTime() },
    timezone: { name: "نامشخص", number: { fa: "نامشخص", en: "unknown" } },
    season: { name: "نامشخص", number: { fa: "نامشخص", en: "unknown" } },
    time12: {
      full: {
        short: { fa: fulltime, en: fulltime },
        full: { fa: fulltime, en: fulltime },
      },
      hour: { fa: "00", en: "00" },
      minute: { fa: "00", en: "00" },
      second: { fa: "00", en: "00" },
      microsecond: { fa: "000", en: "000" },
      shift: { short: "AM", full: "صبح" },
    },
    time24: {
      full: { fa: fulltime, en: fulltime },
      hour: { fa: fulltime.split(":")[0], en: fulltime.split(":")[0] },
      minute: { fa: fulltime.split(":")[1], en: fulltime.split(":")[1] },
      second: { fa: fulltime.split(":")[2], en: fulltime.split(":")[2] },
    },
    date: {
      weekday: {
        name: localDate.toLocaleDateString("fa-IR", { weekday: "long" }),
        champ: "",
        number: {
          fa: localDate.getDay().toString(),
          en: localDate.getDay().toString(),
        },
      },
      day: {
        name: "",
        number: {
          fa: localDate.getDate().toString(),
          en: localDate.getDate().toString(),
        },
        events: {
          local: {
            holiday: false,
            text: "-",
          },
        },
      },
      month: {
        name: localDate.toLocaleDateString("fa-IR", { month: "long" }),
        asterism: "",
        number: {
          fa: (localDate.getMonth() + 1).toString(),
          en: (localDate.getMonth() + 1).toString(),
        },
      },
      year: {
        name: "",
        animal: "",
        leapyear: "",
        agone: {
          days: { fa: "0", en: "0" },
          percent: { fa: "0", en: "0" },
        },
        left: {
          days: { fa: "0", en: "0" },
          percent: { fa: "0", en: "0" },
        },
        number: {
          fa: localDate.getFullYear().toString(),
          en: localDate.getFullYear().toString(),
        },
      },
      other: {
        gregorian: {
          usual: {
            fa: localDate.toLocaleDateString("fa-IR"),
            en: localDate.toLocaleDateString("en-US"),
          },
          iso: {
            fa: localDate.toISOString(),
            en: localDate.toISOString(),
          },
        },
        ghamari: {
          usual: { fa: "نامشخص", en: "unknown" },
          iso: { fa: "نامشخص", en: "unknown" },
        },
      },
      full: {
        official: {
          iso: {
            fa: localDate.toISOString(),
            en: localDate.toISOString(),
          },
          usual: {
            fa: localDate.toLocaleDateString("fa-IR"),
            en: localDate.toLocaleDateString("en-US"),
          },
        },
        unofficial: {
          iso: {
            fa: localDate.toISOString(),
            en: localDate.toISOString(),
          },
          usual: {
            fa: localDate.toLocaleDateString("fa-IR"),
            en: localDate.toLocaleDateString("en-US"),
          },
        },
      },
    },
  };

  const displayTime = !loading && !error && time ? time : fallbackTime;

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-center">
        <p className="text-4xl font-bold text-blue-500">{fulltime}</p>
      </div>
      <div className="w-full flex items-center justify-center gap-0.5 text-lg">
        <p className="pe-0.5">{displayTime.date.weekday?.name || ""}</p>
        <p>{displayTime.date.day?.number?.fa || ""}</p>
        <p>
          {displayTime.date.month?.name ||
            displayTime.date.month?.number?.fa ||
            ""}
        </p>
        <p>{displayTime.date.year?.number?.fa || ""}</p>
        {(displayTime.date.weekday?.name === "جمعه" ||
          displayTime.date.day?.events?.local?.holiday) && (
          <p className="text-red-400 pe-0.5 text-base">(تعطیل)</p>
        )}
      </div>
      <div className="w-full flex items-center justify-around">
        <p className="text-base text-slate-400">
          {displayTime.date.other.gregorian?.usual?.fa || ""}
        </p>
        <p className="text-base text-slate-400">
          {displayTime.date.other.ghamari?.usual?.fa || ""}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <p className="font-semibold text-slate-300">مناسبت روز:</p>
        <p className="text-sm">
          {displayTime.date.day?.events?.local?.text || "-"}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <p className="font-semibold text-slate-300">مناسبت تاریخی:</p>
        <p className="text-sm">
          {events && events.events && events.events.length > 0
            ? events.events.map((ev, i) => (
                <span key={i}>
                  {ev.description}
                  {i !== events.events.length - 1 ? "، " : ""}
                </span>
              ))
            : "-"}
        </p>
      </div>
    </div>
  );
}

export default Time;
