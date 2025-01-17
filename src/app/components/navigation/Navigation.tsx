const LinkItem = ({ name, href }: { name: string; href: string }) => (
  <a
    href={href}
    className="hover:bg-sky-50 hover:rounded-md hover:text-sky-950 transition-all px-2 inline-flex items-center"
  >
    {name}
  </a>
);

const Navigation = () => {
  const shouldDisplayLogo = false;
  return (
    <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-between items-end px-16 py-8 bg-sky-950 text-white">
      <a href="/" className="flex items-center">
        <h1 className="text-xl font-bold flex items-end">
          {shouldDisplayLogo && <img
            src={'/logos/White bg + logo 5k.png'}
            alt="Precision Proteomic Center Davos logo"
            className="w-14 h-auto mb-1"
          />}
          <p className="px-2">Precision Proteomic Center Davos</p>
        </h1>
      </a>
      <div className="flex flex-col sm:flex-row sm:flex-nowrap items-end">
        <LinkItem href="/aboutUs" name="About us" />
        <LinkItem href="/team" name="Team" />
        <LinkItem href="/publications" name="Publications" />
        <LinkItem href="/infrastructure" name="Infrastructure" />
        <LinkItem href="/openPositions" name="Open Positions" />
      </div>
    </div>
  );
};

export default Navigation;
