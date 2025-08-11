import PersianCalendar from "./components/Calendar";
import Price from "./components/Price";
import SearchCom from "./components/SearchCom";
import Time from "./components/Time";
import TodoList from "./components/TodoList";
import Weather from "./components/Weather";

function App() {
  return (
    <div
      className="w-full lg:h-screen bg-no-repeat bg-center overflow-x-hidden lg:py-0 py-4"
      style={{ backgroundImage: "url(/background/background1.webp)" }}
    >
      <div className="w-full h-full bg-black/40 flex items-center justify-center">
        <div className="xl:w-4/5 w-11/12 h-11/12">
          <div className="w-full h-full grid grid-cols-4 lg:grid-rows-6 gap-4">
            {/* Time & Date */}
            <div className="lg:row-span-3 lg:col-end-2 lg:row-start-1 row-start-2 lg:col-span-1 md:col-span-2 col-span-full bg-zinc-800/40 backdrop-blur-sm rounded-lg p-4">
              <Time />
            </div>
            {/* Search Box */}
            <div className="lg:col-span-2 lg:row-span-3 col-span-full">
              <SearchCom />
            </div>
            {/* Weather */}
            <div className="lg:row-span-4 lg:col-span-1 md:col-span-2 col-span-full bg-zinc-800/40 backdrop-blur-sm rounded-lg p-4">
              <Weather />
            </div>
            {/* Calendar */}
            <div className="lg:row-span-3 lg:col-span-1 md:col-span-2 col-span-full bg-zinc-800/40 backdrop-blur-sm rounded-lg p-4">
              <PersianCalendar />
            </div>
            {/* Todo List */}
            <div className="lg:col-span-2 col-span-full lg:row-span-3 bg-zinc-800/40 backdrop-blur-sm rounded-lg p-4">
              <TodoList />
            </div>
            {/* Price */}
            <div className="lg:row-span-2 lg:col-span-1 md:col-span-2 col-span-full row-start-3 bg-zinc-800/40 backdrop-blur-sm rounded-lg p-4">
              <Price />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
