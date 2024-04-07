import Link from "next/link";

const LinkItem = ({ name, href }: { name: string; href: string }) => (
  <Link
    href={href}
    className="hover:bg-sky-50 hover:rounded-md hover:text-sky-950 transition-all px-2 my-1"
  >
    {name}
  </Link>
);

const Navigation = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-between px-16 py-8 bg-sky-950 text-white">
      <div>
        <Link href="/">
          <h1 className="text-xl font-bold px-2 my-1">Precision Proteomic Center Davos</h1>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-nowrap">
        <LinkItem href="/team" name="Team" />
        <LinkItem href="/publications" name="Publications" />
        <LinkItem href="/infrastructure" name="Infrastructure" />
        <LinkItem href="/openPositions" name="Open Positions" />
      </div>
    </div>

  );
};

export default Navigation;
