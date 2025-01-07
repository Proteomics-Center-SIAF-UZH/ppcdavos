const LinkItem = ({ name, href }: { name: string; href: string }) => (
  <a
    href={href}
    className="hover:bg-sky-50 hover:rounded-md hover:text-sky-950 transition-all px-2 py-1"
  >
    {name}
  </a>
);

const Navigation = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-between px-16 py-8 bg-sky-950 text-white">
      <a href="/" className="flex items-center">
        <h1 className="text-xl font-bold my-1 flex items-center">
          <img
            src={'/logos/White bg + logo 5k.png'}
            alt={'Precision Proteomic Center Davos logo'}
            className="w-10 h-auto%"
          />
          <p className="px-2">Precision Proteomic Center Davos</p>
        </h1>
      </a>
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
