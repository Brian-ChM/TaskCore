import { BellRing, ChartPie, ListTodo, LogOut, Menu, Pin } from "lucide-react";
import Link from "next/link";
import { LogOutButton } from "./logout-button";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="relative flex flex-col justify-between bg-primary-foreground h-dvh w-full max-w-[12rem] md:max-w-[14rem] px-5 py-5">
      <Button
        className="absolute right-5 top-5 z-50"
        variant="ghost"
        size="icon"
      >
        <Menu className="w-6 h-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <h1 className="text-2xl font-bold">TaskCore</h1>

      <ul className="flex flex-col gap-4">
        <Button className="flex justify-start" variant="link" asChild>
          <Link className="flex gap-2 items-center" href="/">
            <ListTodo className="mr-2 w-5 h-5" />
            <span className="text-base font-semibold">Tareas</span>
          </Link>
        </Button>

        <Button className="flex justify-start" variant="link" asChild>
          <Link className="flex gap-2 items-center" href="/quick-acces">
            <Pin className="mr-2 w-5 h-5" />
            <span className="text-base font-semibold">Acceso Rapido</span>
          </Link>
        </Button>

        <Button className="flex justify-start" variant="link" asChild>
          <Link className="flex gap-2 items-center" href="/statistics">
            <ChartPie className="mr-2 w-5 h-5" />
            <span className="text-base font-semibold">Estadisticas</span>
          </Link>
        </Button>

        <Button className="flex justify-start" variant="link" asChild>
          <Link className="flex gap-2 items-center" href="notifications">
            <BellRing className="mr-2 w-5 h-5" />
            <span className="text-base font-semibold">Notificaciones</span>
          </Link>
        </Button>
      </ul>

      <div className="flex flex-col gap-3">
        <ModeToggle />
        <LogOutButton>
          <LogOut className="mr-2 w-4 h-4" />
          Cerrar sesión
        </LogOutButton>
      </div>
    </nav>
  );
};
