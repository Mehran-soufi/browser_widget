import { Input } from "../ui";

export default function InputShowcase() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "flex-start",
      }}
    >
      <header>
        <h1>کامپوننت Input</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          بررسی حالت‌ها و اندازه‌های مختلف ورودی
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(280px, 400px))",
          gap: "24px",
          width: "100%",
        }}
      >
        <Input label="نام کاربری" placeholder="نام کاربری را وارد کن" />

        <Input label="جستجو" placeholder="جستجو..." inputSize="sm" />

        <Input
          label="عنوان یادداشت"
          placeholder="عنوان یادداشت"
          inputSize="lg"
          hint="یک عنوان کوتاه و قابل تشخیص انتخاب کن"
        />

        <Input
          label="ایمیل"
          type="email"
          placeholder="example@email.com"
          error="آدرس ایمیل معتبر نیست"
        />

        <Input
          label="ورودی غیرفعال"
          placeholder="این فیلد غیرفعال است"
          disabled
        />

        <Input
          label="با آیکون"
          placeholder="جستجو در ابزارها"
          rightElement={<span>⌕</span>}
        />
      </section>
    </main>
  );
}
