import Logo from "../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-zinc-800 mt-28 flex flex-col items-center gap-4 w-full">
      <img src={Logo} alt="Logo do LocalNews" className="size-20" />
      <div className="h-[1px] bg-zinc-500 w-[60%]"></div>
      <p className="text-zinc-300">
        © 2024 LocalNews. Todos os direitos reservados.
      </p>
      <div className="flex flex items-left pt-2 pb-12 gap-3">
        <p className="text-zinc-300 text-lg font-bold">
          Criado por Gustavo Borges Vasconcelos Silva
        </p>
      </div>
    </footer>
  );
}
