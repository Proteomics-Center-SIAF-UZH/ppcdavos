export const PageHeader = ({ title }: { title: string }) => (
  <div className="mb-14 pb-8">
    <h1 className="text-3xl font-bold text-sky-950 tracking-tight">{title}</h1>
    <div className="w-12 h-1 bg-sky-950 rounded-full mt-4" />
  </div>
);
