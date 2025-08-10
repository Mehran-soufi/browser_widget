import { useEffect, useState } from "react";

const price_api = import.meta.env.VITE_APP_PRICE_API_KEY;

interface PriceType {
  gold: [
    {
      date: string;
      time: string;
      time_unix: number;
      symbol: string;
      name_en: string;
      name: string;
      price: number;
      change_value: number;
      change_percent: string;
      unit: string;
    }
  ];
  currency: [
    {
      date: string;
      time: string;
      time_unix: number;
      symbol: string;
      name_en: string;
      name: string;
      price: number;
      change_value: number;
      change_percent: string;
      unit: string;
    }
  ];
  cryptocurrency: [
    {
      date: string;
      time: string;
      time_unix: number;
      symbol: string;
      name_en: string;
      name: string;
      price: number;
      change_value: number;
      change_percent: string;
      unit: string;
    }
  ];
}

function Price() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [price, setPrice] = useState<PriceType | null>(null);
  async function getPrice() {
    setLoading(true);
    setError(false);
    try {
      const data = await fetch(
        `https://brsapi.ir/Api/Market/Gold_Currency.php?key=${price_api}`
      );
      const resData = await data.json();
      setPrice(resData);
      setError(false);
    } catch (e) {
      console.error("خطا در دریافت زمان:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPrice();
  }, []);

  const todayDate = new Date().toLocaleDateString("fa");
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      {loading && <p>درحال بارگذاری...</p>}
      {error && (
        <div className="w-full h-full flex items-center justify-center flex-col gap-1">
          <p>مشکلی پیش آمده</p>
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 cursor-pointer"
            onClick={() => getPrice()}
          >
            تلاش مجدد
          </button>
        </div>
      )}
      {price && !error && !loading && (
        <>
          <div className="w-full lg:h-full h-96 flex flex-col items-center justify-between gap-2">
            <div className="w-full flex items-center justify-between flex-wrap gap-1 pb-1 border-b border-slate-400">
              <p>قیمت ارز و طلا </p>
              <p className="font-bold">{todayDate}</p>
            </div>
            <div className="w-full h-full overflow-y-auto flex flex-col gap-1">
              {/* Header */}
              <ul className="w-full flex items-center justify-between rounded-md p-1">
                <li className="font-semibold">نام</li>
                <li className="font-semibold">قیمت</li>
                <li className="font-semibold">ساعت</li>
              </ul>
              {/* Content */}
              {/* Gold */}
              {price?.gold.map((gold, index) => (
                <ul
                  key={index}
                  className={`w-full flex items-center justify-between rounded-md p-1 ${
                    index % 2 ? "bg-slate-400/10" : "bg-slate-400/15"
                  }`}
                >
                  <li className="font-semibold text-sm">{gold.name}</li>
                  <li className="font-semibold text-sm flex items-center gap-1">
                    {gold.price} {gold.unit}
                  </li>
                  <li className="font-semibold text-sm">{gold.time}</li>
                </ul>
              ))}
              {/* currency */}
              {price?.currency.slice(1, 5).map((currency, index) => (
                <ul
                  key={index}
                  className={`w-full flex items-center justify-between rounded-md p-1 ${
                    index % 2 ? "bg-slate-400/10" : "bg-slate-400/15"
                  }`}
                >
                  <li className="font-semibold text-sm">{currency.name}</li>
                  <li className="font-semibold text-sm flex items-center gap-1">
                    {currency.price} {currency.unit}
                  </li>
                  <li className="font-semibold text-sm">{currency.time}</li>
                </ul>
              ))}
              {/* cryptocurrency */}
              {price?.cryptocurrency
                .slice(0, 3)
                .map((cryptocurrency, index) => (
                  <ul
                    key={index}
                    className={`w-full flex items-center justify-between rounded-md p-1 ${
                      index % 2 ? "bg-slate-400/10" : "bg-slate-400/15"
                    }`}
                  >
                    <li className="font-semibold text-sm">{cryptocurrency.name}</li>
                    <li className="font-semibold text-sm flex items-center gap-1">
                      {cryptocurrency.price} {cryptocurrency.unit}
                    </li>
                    <li className="font-semibold text-sm">{cryptocurrency.time}</li>
                  </ul>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Price;
