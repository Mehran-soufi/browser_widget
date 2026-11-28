import { Badge } from "../ui";

export default function BadgeShowcase() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <header>
        <h1>کامپوننت Badge</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          بررسی وضعیت‌ها و اندازه‌های مختلف
        </p>
      </header>

      <section>
        <h2>Variants</h2>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Badge>پیش‌فرض</Badge>
          <Badge variant="success">تکمیل‌شده</Badge>
          <Badge variant="warning">در انتظار</Badge>
          <Badge variant="danger">خطا</Badge>
          <Badge variant="info">اطلاعات</Badge>
        </div>
      </section>

      <section>
        <h2>Sizes</h2>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Badge size="sm">کوچک</Badge>
          <Badge size="md">متوسط</Badge>
        </div>
      </section>

      <section>
        <h2>در کنار محتوا</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span>وضعیت تسک:</span>
          <Badge variant="success">انجام‌شده</Badge>
          <Badge variant="warning">اولویت بالا</Badge>
        </div>
      </section>
    </main>
  );
}
