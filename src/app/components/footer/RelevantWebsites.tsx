export const RelevantWebsites = ({
    title, items,
}: {
    title: string;
    items: { link: string; name: string; }[];
}) => (
    <div>
        <h2 className="mb-3 text-sm font-semibold uppercase text-white">
            {title}
        </h2>
        <ul className="text-sm space-4 text-gray-400">
            {items.map((item, i) => (
                <li key={i}>
                    <a href={item.link} className="hover:underline">
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);
