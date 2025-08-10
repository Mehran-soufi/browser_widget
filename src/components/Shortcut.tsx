import { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface WebItem {
  id: number;
  name: string;
  url: string;
  favicon: string;
}

function Shortcut() {
  const [websites, setWebsites] = useState<WebItem[]>([
    {
      id: 1,
      name: "گوگل",
      url: "https://google.com",
      favicon: "/svg/google.svg",
    },
    {
      id: 2,
      name: "یوتیوب",
      url: "https://youtub.com",
      favicon: "/svg/youtube.svg",
    },
    {
      id: 3,
      name: "جیمیل",
      url: "https://mail.google.com/mail",
      favicon: "/svg/gmail.svg",
    },
    {
      id: 4,
      name: "لینکدین",
      url: "https://mail.linkedin.com",
      favicon: "/svg/linkedin.svg",
    },
    {
      id: 5,
      name: "تلگرام",
      url: "https://telegram.org",
      favicon: "/svg/telegram.svg",
    },
    {
      id: 6,
      name: "اسپاتیفای",
      url: "https://open.spotify.com",
      favicon: "/svg/spotify.svg",
    },
    {
      id: 7,
      name: "آمازون",
      url: "https://www.amazon.com",
      favicon: "/svg/amazon.svg",
    },
    {
      id: 8,
      name: "ردیت ",
      url: "https://www.reddit.com",
      favicon: "/svg/reddit.svg",
    },
    {
      id: 9,
      name: "فیسبوک ",
      url: "https://www.facebook.com/",
      favicon: "/svg/facebook.svg",
    },
  ]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", url: "" });
  const editorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sites");
    if (stored) {
      setWebsites(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = websites.filter((item) => item.id !== id);
    setWebsites(updated);
    localStorage.setItem("sites", JSON.stringify(updated));
  };
  const handleEdit = (item: WebItem) => {
    setEditingId(item.id);
    setFormData({ name: item.name, url: item.url });
    setShowEditor(true);
  };

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        openMenuId !== null &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, [openMenuId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEditor &&
        editorRef.current &&
        !editorRef.current.contains(event.target as Node)
      ) {
        setShowEditor(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEditor]);

  const handleSubmit = () => {
    const tempFavicon = `https://www.google.com/s2/favicons?sz=64&domain=${
      new URL(formData.url).hostname
    }`;
    const img = new Image();
    img.src = tempFavicon;

    img.onload = () => {
      const favicon = img.complete && img.naturalWidth !== 0 ? tempFavicon : "";

      if (editingId !== null) {
        const updated = websites.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.name,
                url: formData.url,
                favicon: favicon || item.favicon,
              }
            : item
        );
        setWebsites(updated);
        localStorage.setItem("sites", JSON.stringify(updated));
      } else {
        const newItem: WebItem = {
          id: Date.now(),
          name: formData.name,
          url: formData.url,
          favicon,
        };
        const updated = [...websites, newItem];
        setWebsites(updated);
        localStorage.setItem("sites", JSON.stringify(updated));
      }

      setFormData({ name: "", url: "" });
      setEditingId(null);
      setShowEditor(false);
    };
    img.onerror = () => {
      if (editingId !== null) {
        const updated = websites.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.name,
                url: formData.url,
                favicon: item.favicon,
              }
            : item
        );
        setWebsites(updated);
        localStorage.setItem("sites", JSON.stringify(updated));
      } else {
        const newItem: WebItem = {
          id: Date.now(),
          name: formData.name,
          url: formData.url,
          favicon: "",
        };
        const updated = [...websites, newItem];
        setWebsites(updated);
        localStorage.setItem("sites", JSON.stringify(updated));
      }

      setFormData({ name: "", url: "" });
      setEditingId(null);
      setShowEditor(false);
    };
  };

  return (
    <div className="lg:w-full flex items-center justify-center gap-2 lg:flex-wrap flex-nowrap relative">
      {websites.map((item) => (
        <div
          key={item.id}
          className="lg:w-16 w-14 lg:h-16 h-14 rounded-lg bg-zinc-800/40 backdrop-blur-sm relative group transition duration-200 hover:shadow-md shadow-zinc-800"
        >
          <a
            href={item.url}
            target="_blank"
            className="w-full h-full flex flex-col justify-between items-center p-0.5 py-1"
          >
            <img src={item.favicon} alt={item.name} className="lg:w-7 w-5 lg:h-7 h-5" />
            <p className="lg:text-sm text-[12px]">{item.name}</p>
          </a>
          <button
            className="absolute top-0.5 right-0 cursor-pointer hidden group-hover:inline"
            onClick={() =>
              setOpenMenuId(openMenuId === item.id ? null : item.id)
            }
          >
            <IoMdMore size={20} />
          </button>
          {openMenuId === item.id && (
            <div
              className="w-full h-full absolute top-0 right-0 bg-zinc-800 rounded-lg flex flex-col justify-between p-1"
              ref={menuRef}
            >
              <button
                className="flex items-center gap-0.5 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => handleEdit(item)}
              >
                <MdEdit className="text-sm" />
                ویرایش
              </button>
              <button
                className="flex items-center gap-0.5 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => handleDelete(item.id)}
              >
                <FaRegTrashAlt className="text-sm" />
                حذف
              </button>
            </div>
          )}
        </div>
      ))}

      {/* دکمه افزودن */}
      {websites.length < 16 && (
        <div
          className="lg:w-16 w-14 lg:h-16 h-14 rounded-lg bg-zinc-800/40 backdrop-blur-sm relative
       group transition duration-200 hover:shadow-md shadow-zinc-800 cursor-pointer"
          onClick={() => {
            setShowEditor(true);
            setEditingId(null);
            setFormData({ name: "", url: "" });
          }}
        >
          <div className="w-full h-full flex flex-col justify-between items-center p-0.5">
            <img src="svg/plus.svg" alt="افزودن" className="lg:w-7 w-5 lg:h-7 h-5" />
            <p className="lg:text-sm text-[12px]">افزودن</p>
          </div>
        </div>
      )}

      {/* پنجره افزودن/ویرایش */}
      {showEditor && (
        <div className="absolute top-0 right-0 backdrop-blur-[2px] w-full h-full z-50">
          <div className="w-full h-full flex justify-center items-center">
            <div
              ref={editorRef}
              className="max-w-80 bg-zinc-800 rounded-lg shadow-md shadow-zinc-800 flex flex-col gap-8 p-4 text-right rtl"
            >
              <p className="text-right font-bold text-white">افزودن / ویرایش</p>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 1,
                    width: "250px",
                    display: "flex",
                    flexDirection: "column",
                    direction: "rtl",
                    textAlign: "right",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="name_address"
                  label="نام سایت"
                  variant="outlined"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{
                    sx: {
                      right: "25px",
                      left: "auto",
                      transformOrigin: "top right",
                      textAlign: "right",
                      fontFamily: "vazirmatn",
                      color: "rgba(255, 255, 255, 0.632)",
                    },
                  }}
                  slotProps={{
                    htmlInput: {
                      style: { textAlign: "right", fontFamily: "vazirmatn" },
                    },
                  }}
                />

                <TextField
                  id="site_address"
                  label="آدرس سایت"
                  variant="outlined"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{
                    sx: {
                      right: "25px",
                      left: "auto",
                      transformOrigin: "top right",
                      textAlign: "right",
                      fontFamily: "vazirmatn",
                      color: "rgba(255, 255, 255, 0.632)",
                    },
                  }}
                  slotProps={{
                    htmlInput: {
                      style: { textAlign: "right", fontFamily: "vazirmatn" },
                    },
                  }}
                />
              </Box>
              <Button variant="contained" onClick={handleSubmit}>
                انجام شد
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shortcut;
