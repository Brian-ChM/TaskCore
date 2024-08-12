import { auth } from "@/auth";
import { SignInButton } from "@/components/sigin-button";
import { redirect } from "next/navigation";
import { GrGithub, GrGoogle } from "react-icons/gr";

export default async function Page() {
  const session = await auth();

  if (!session || !session?.user) {
    redirect("/");
  }

  return (
    <section className="flex items-center justify-center w-full h-dvh bg-primary-foreground">
      <div className="min-w-max max-w-md space-y-8 rounded-md px-8 py-12">
        <div className="flex gap-2 items-center justify-center px-12">
          <h1 className="text-6xl font-bold">TaskCore</h1>
        </div>
        <p className="text-[0.8rem] text-muted-foreground text-center">
          Inicia sesión con tu método preferido.
        </p>

        <div className="flex flex-col gap-2">
          <SignInButton provider="github">
            <GrGithub className="mr-2 w-5 h-5" />
            Iniciar sesión con Github
          </SignInButton>
          <SignInButton provider="google">
            <GrGoogle className="mr-2 w-5 h-5" />
            Iniciar sesión con Google
          </SignInButton>
        </div>
      </div>
    </section>
  );
}
