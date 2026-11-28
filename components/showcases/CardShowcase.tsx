import { Button, Card } from "../ui";

export default function CardShowcase() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <header>
        <h1>کامپوننت Card</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          بررسی ساختار و حالت‌های مختلف کارت
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        <Card>
          <h3>کارت ساده</h3>
          <p>این یک کارت بدون Header و Footer است.</p>
        </Card>

        <Card
          title="کارت عنوان‌دار"
          description="توضیح کوتاهی درباره محتوای کارت"
        >
          <p>محتوای اصلی کارت در این قسمت قرار می‌گیرد.</p>
        </Card>

        <Card
          title="کارت با عملیات"
          description="دارای دکمه در بخش Header"
          headerAction={
            <Button size="sm" variant="ghost">
              بیشتر
            </Button>
          }
        >
          <p>این کارت یک عملیات در قسمت بالایی دارد.</p>
        </Card>

        <Card
          title="کارت با Footer"
          footer={
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Button size="sm">مشاهده جزئیات</Button>
            </div>
          }
        >
          <p>این کارت دارای بخش پایینی مجزا است.</p>
        </Card>

        <Card title="کارت تعاملی" interactive>
          <p>موس را روی این کارت ببر تا حالت Hover را ببینی.</p>
        </Card>
      </section>
    </main>
  );
}
