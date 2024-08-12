export const TaskContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid justify-center items-center content-start gap-4 bg-primary-foreground h-[calc(100vh-68px)] w-full overflow-auto rounded-md px-2 pb-24">
      {children}
    </section>
  );
};
