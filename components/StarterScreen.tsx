type StarterScreenProps = {
  title: string;
  description: string;
};

export default function StarterScreen({
  title,
  description,
}: StarterScreenProps) {
  return (
    <main className="starter">
      <span className="starter__label">VAGHTNEGAR V2</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}
