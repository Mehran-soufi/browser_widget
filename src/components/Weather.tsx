import { useEffect, useState } from "react";
import PersianNumber from "./PersianNumber";
import type { FuthreWeather, WeatherType } from "../types";
import { LineChart } from "@mui/x-charts";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

const weather_api = import.meta.env.VITE_APP_Weather_API_KEY;

function Weather() {
  const [city, setCity] = useState<string>("تهران");
  const [weatherData, setWeatherData] = useState<WeatherType | null>(null);
  const [forecastData, setForecastData] = useState<FuthreWeather | null>(null);
  const [lat, setLat] = useState<number | null>(35.6944);
  const [lon, setLon] = useState<number | null>(51.4215);

  // گرفتن آب‌وهوا با مختصات
  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api}&units=metric&lang=fa`
      );
      if (!response.ok) throw new Error("خطا در دریافت اطلاعات آب‌وهوا");

      const data: WeatherType = await response.json();
      setWeatherData(data);
      setCity(data.name);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      getFuthreWeatherByCoords(data.coord.lat, data.coord.lon);
    } catch {
      toast.error("❌ دریافت اطلاعات آب‌وهوا با لوکیشن ناموفق بود.");
    }
  };

  // گرفتن آب‌وهوا با نام شهر
  const getWeatherByCity = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api}&units=metric&lang=fa`
      );
      if (!response.ok) throw new Error("شهر مورد نظر پیدا نشد");

      const data: WeatherType = await response.json();
      setWeatherData(data);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setCity(data.name);
      getFuthreWeatherByCoords(data.coord.lat, data.coord.lon);
    } catch {
      toast.error("❌ شهر مورد نظر پیدا نشد. لطفاً نام صحیح وارد کنید.", {
        style: {
          fontFamily: "Vazir, sans-serif",
          direction: "rtl",
        },
      });
      setCity("تهران");
    }
  };

  // گرفتن پیش‌بینی آب‌وهوا
  const getFuthreWeatherByCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weather_api}&units=metric&lang=fa`
      );
      const FuthreData: FuthreWeather = await response.json();
      setForecastData(FuthreData);
    } catch {
      toast.error("❌ دریافت پیش‌بینی آب‌وهوا ناموفق بود.");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
        toast.success("✅ موقعیت مکانی شما دریافت شد", {
          style: {
            fontFamily: "Vazir, sans-serif",
            direction: "rtl",
          },
        });
        getWeather();
      },
      () => {
        toast.error("❌ دسترسی به موقعیت مکانی ممکن نیست. استفاده از تهران به عنوان پیش‌فرض.", {
          style: {
            fontFamily: "Vazir, sans-serif",
            direction: "rtl",
          },
        });
        getWeatherByCity();
      }
    );
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2">
      <div className="w-full flex flex-col gap-1 items-center justify-center">
        <div className="w-full flex items-center justify-center gap-1">
          {weatherData?.main?.temp !== undefined && (
            <>
              <div className="flex items-start gap-0.5">
                <span className="text-purple-300/60">C°</span>
                <p className="text-4xl text-purple-500 font-bold">
                  <PersianNumber number={weatherData.main.temp} />
                </p>
              </div>
              <div className="w-10 h-10">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="icon"
                  className="w-full h-full"
                />
              </div>
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-center gap-1">
          <p className="text-lg">هوای {city}</p>
          <p className="text-lg">{weatherData?.weather[0].description}ه</p>
        </div>
        <div className="w-full flex items-center justify-around gap-1">
          {weatherData?.main.temp_min && (
            <div className="flex items-center gap-1">
              <p className="text-sm opacity-70">حداقل:</p>
              <p className="text-sm">
                <PersianNumber number={weatherData.main.temp_min} />°
              </p>
            </div>
          )}
          {weatherData?.main.temp_max && (
            <div className="flex items-center gap-1">
              <p className="text-sm opacity-70">حداکثر:</p>
              <p className="text-sm">
                <PersianNumber number={weatherData.main.temp_max} />°
              </p>
            </div>
          )}
        </div>
      </div>

      {forecastData?.list && (
        <LineChart
          className="flex items-center justify-center"
          height={160}
          series={[
            {
              data: forecastData.list
                .slice(0, 8)
                .map((item) => Math.round(item.main.temp)),
              color: "#a855f7",
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: forecastData.list
                .slice(0, 8)
                .map((item) => item.dt_txt.split(" ")[1].slice(0, 5)),
              tickLabelStyle: {
                fill: "#cad5e2",
                fontSize: 12,
              },
            },
          ]}
          yAxis={[
            {
              tickLabelStyle: {
                fill: "#cad5e2",
                fontSize: 12,
              },
            },
          ]}
          sx={{
            direction: "rtl",
            backgroundColor: "transparent",
            ".MuiLineElement": {
              strokeWidth: 3,
            },
            ".MuiChartsAxisLine-root": {
              stroke: "#e5e7eb",
            },
            ".MuiChartsGrid-line": {
              stroke: "#f3f4f6",
            },
          }}
          margin={{ top: 10, bottom: 10, left: 0, right: 10 }}
        />
      )}

      <div className="w-full py-1 rounded-full bg-blue-300/30 flex items-center justify-between gap-1 px-2">
        <input
          type="text"
          placeholder="آب و هوای کجا رو میخوای؟"
          className="flex-1 p-1 outline-none border-none placeholder:text-slate-300 placeholder:opacity-80"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeatherByCity();
            }
          }}
        />
        <button
          className="flex items-center justify-center border-none outline-none px-3 py-1 rounded-full bg-blue-600 cursor-pointer transition duration-200 hover:bg-blue-700"
          onClick={getWeatherByCity}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}

export default Weather;