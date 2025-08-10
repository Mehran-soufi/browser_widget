import { useEffect, useState } from "react";
import { FaList, FaCalendarAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { MdDone, MdEdit } from "react-icons/md";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

function TodoList() {
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [listItems, setListItems] = useState<
    { object: string; status: boolean; date: DateObject | null }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);

  const removeTask = (index: number) => {
    setListItems((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  const toggleTaskStatus = (index: number) => {
    setListItems((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], status: !newList[index].status };
      return newList;
    });
  };

  const startEditing = (index: number) => {
    setEditIndex(index);
    setEditText(listItems[index].object);
  };

  const saveEdit = (index: number) => {
    if (editText.trim()) {
      setListItems((prevList) => {
        const newList = [...prevList];
        newList[index] = { ...newList[index], object: editText };
        return newList;
      });
      setEditIndex(null);
    }
  };

  const addToList = () => {
    if (text.trim()) {
      setListItems((prevList) => [
        ...prevList,
        { object: text, status: false, date: selectedDate },
      ]);
      setText("");
      setSelectedDate(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addToList();
    }
  };

  const formatDate = (date: DateObject | null) => {
    if (!date) return "بدون تاریخ";
    return date.format("DD MMMM YYYY");
  };

  useEffect(() => {
    const savedList = localStorage.getItem("todoList");
    if (savedList) {
      const parsedList = JSON.parse(savedList).map((item: any) => ({
        ...item,
        date: item.date ? new DateObject(item.date) : null,
      }));
      setListItems(parsedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(listItems));
  }, [listItems]);

  return (
    <div className="w-full lg:h-full h-96 overflow-y-auto">
      <div className="w-full h-full flex flex-col gap-4 items-center justify-between">
        {/* main */}
        <div className="w-full h-full flex flex-col gap-4">
          {/* Title */}
          <div className="w-full flex items-center gap-2 pb-4 border-b border-slate-500">
            <FaList className="text-slate-300" />
            <p className="font-semibold">لیست کارها :</p>
          </div>

          {listItems.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center gap-1">
              <p className="font-bold text-xl text-slate-200">
                کاری وجود ندارد!
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-1">
              {listItems.map((item, index) => (
                <div
                  key={index}
                  className={`w-full rounded-lg p-2 flex items-center justify-between gap-1 flex-wrap ${
                    item.status ? "bg-green-900/30" : "bg-zinc-800"
                  }`}
                >
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(index)}
                      onKeyPress={(e) => e.key === "Enter" && saveEdit(index)}
                      className="flex-1 bg-transparent outline-none border-b border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <div className="flex flex-col gap-1 flex-1">
                      <p
                        className={`font-semibold ${
                          item.status ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item.object}
                      </p>
                      <span className="text-sm text-zinc-300">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-0.5">
                    <button
                      className="p-1 rounded-md border-none outline-none cursor-pointer hover:bg-zinc-700 transition"
                      onClick={() =>
                        editIndex === index
                          ? saveEdit(index)
                          : startEditing(index)
                      }
                    >
                      {editIndex === index ? <MdDone /> : <MdEdit />}
                    </button>
                    <button
                      className={`p-1 rounded-md border-none outline-none cursor-pointer hover:bg-zinc-700 transition ${
                        item.status ? "text-green-500" : ""
                      }`}
                      onClick={() => toggleTaskStatus(index)}
                    >
                      <MdDone />
                    </button>
                    <button
                      className="p-1 rounded-md border-none outline-none cursor-pointer hover:bg-zinc-700 transition hover:text-red-500"
                      onClick={() => removeTask(index)}
                    >
                      <IoMdTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* input */}
        <div
          className={`w-full flex flex-col gap-2 items-center justify-center sticky bottom-0 ${
            listItems.length > 3 ? "bg-zinc-800 py-1 backdrop-blur-sm" : ""
          }`}
        >
          <div className="w-full flex items-center flex-wrap sm:flex-nowrap gap-2">
            <DatePicker
              value={selectedDate}
              onChange={(date: DateObject) => {
                setSelectedDate(date);
              }}
              calendar={persian}
              locale={persian_fa}
              render={(_, openCalendar) => (
                <button
                  onClick={openCalendar}
                  className="p-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
                >
                  <FaCalendarAlt />
                </button>
              )}
              containerClassName="relative"
              className="!bg-zinc-800 !text-white !rounded-xl shadow-lg !w-[300px]"
              calendarPosition="top-right"
            />

            <div className="w-full py-1 rounded-full bg-blue-300/30 flex items-center justify-between gap-1 px-2">
              <input
                type="text"
                placeholder="یک کار جدید اضافه کن"
                className="flex-1 p-1 outline-none border-none placeholder:text-slate-300 placeholder:opacity-80 bg-transparent"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <button
                className="flex items-center justify-center border-none outline-none px-3 py-1 rounded-full bg-blue-600 cursor-pointer transition duration-200 hover:bg-blue-700 disabled:opacity-50 text-white"
                onClick={addToList}
                disabled={!text.trim()}
              >
                <FiSend />
              </button>
            </div>
          </div>

          {selectedDate && (
            <div className="text-sm text-blue-400">
              تاریخ انتخاب شده: {formatDate(selectedDate)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
