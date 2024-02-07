export default async function Header() {
  return (
    <header className="flex w-full flex-col items-center justify-center px-12">
      <h1 className="mb-10 text-4xl font-bold">WikiCountry 🌎</h1>

      <p className="mb-8 max-w-prose text-center text-lg">
        Obtiene la informacion de un pais determinado{' '}
        <strong>sin esperas.</strong> Selecciona un pais de la lista y
        descubrelo!
      </p>
    </header>
  )
}
