import { Button } from "@/components/ui/button";

export default function Notifications() {
  return (
    <section className="m-2 flex flex-col justify-between items-center content-start gap-2 bg-primary-foreground h-[calc(100vh-16px)] w-full overflow-auto rounded-md p-2">
      <section className="w-full">
        <article className="rounded-md bg-primary-foreground justify-between items-center p-2 flex gap-2 border w-full">
          <div className="">
            <h2 className="text-xl font-semibold">
              <strong className="font-bold">TaskCore</strong> esta a dos dias
              del vencimiento
            </h2>
            <p className="text-muted-foreground text-sm max-w-[70ch]">
              <strong>TaskCore</strong> esta a dos dias del vencimiento. Esta
              tarea tiene una prioridad baja y aún no ha sido completada. Para
              que no se pierda la informacion, es recomendable que revises las
              tareas pendientes y las que tienes pendientes de completar.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Abir</Button>
            <Button variant="outline">Marcar como leido</Button>
          </div>
        </article>

        <h1 className="pt-10 font-black text-4xl text-center text-muted-foreground">
          -&gt; Esta funcionalidad esta en construcción &lt;-
        </h1>
      </section>

      <Button variant="destructive" className="w-full">
        Borrar notificaciones
      </Button>
    </section>
  );
}
