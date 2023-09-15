import Index from "./Index";

export default function IndexPage() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('photo-1604093882750-3ed498f3178b.jpg')" }}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-cover bg-center opacity-30"></div>
      <h1 className="z-10 mb-8 text-5xl font-bold md:text-7xl">Coming Soon</h1>
      <p className="text-xl md:text-2xl">
        We&lsquo;re working hard to bring you something amazing. Stay tuned!</p>
      <Index />
    </main>
  );
  //return <Index />;
}
