export const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-10 pb-6 border-b border-gray-200">
    <h1 className="text-3xl font-bold text-sky-950 tracking-tight">{title}</h1>
    {subtitle && <p className="text-gray-500 mt-1.5">{subtitle}</p>}
  </div>
);
