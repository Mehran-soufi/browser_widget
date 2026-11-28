import { Button } from "../ui";

export default function ButtonShowcase() {
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
        <h1>کامپوننت Button</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          بررسی حالت‌ها و اندازه‌های مختلف دکمه
        </p>
      </header>

      <section>
        <h2>Variants</h2>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button variant="primary">اصلی</Button>
          <Button variant="secondary">ثانویه</Button>
          <Button variant="ghost">شفاف</Button>
          <Button variant="danger">حذف</Button>
        </div>
      </section>

      <section>
        <h2>Sizes</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Button size="sm">کوچک</Button>
          <Button size="md">متوسط</Button>
          <Button size="lg">بزرگ</Button>
        </div>
      </section>

      <section>
        <h2>Disabled</h2>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button disabled>اصلی غیرفعال</Button>
          <Button variant="secondary" disabled>
            ثانویه غیرفعال
          </Button>
          <Button variant="danger" disabled>
            حذف غیرفعال
          </Button>
        </div>
      </section>

      <section>
        <h2>Interactions</h2>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button onClick={() => alert("Button works!")}>
            تست کلیک
          </Button>

          <Button variant="secondary" type="submit">
            تست نوع Submit
          </Button>
        </div>
      </section>
    </main>
  );
}