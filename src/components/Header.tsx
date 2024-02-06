export default async function Header() {
  return (
    <header className="flex items-center flex-col w-full px-12 justify-center">
      <h1 className="text-4xl font-bold mb-10">WikiCountries 🌎</h1>

      <p className="text-center mb-8 text-lg max-w-prose">
        Obtiene la informacion de un pais determinado{" "}
        <strong>sin esperas.</strong> Selecciona un pais de la lista y
        descubrelo!
      </p>
    </header>
  );
}
