import { Member } from "../content/types";

export const AlumniList = ({ members }: { members: any[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
    {members.map((member, index) => {
      const initials = member.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("");
      return (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden flex flex-col h-full opacity-70"
          style={{ boxShadow: "0 2px 12px -2px rgba(15,23,42,0.08), 0 1px 3px -1px rgba(15,23,42,0.06)" }}
        >
          <div className="relative aspect-square overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
              <span className="text-slate-300 font-semibold select-none" style={{ fontSize: "4rem" }}>
                {initials}
              </span>
            </div>
            {member.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-top grayscale"
                style={{ backgroundImage: `url(${member.imageUrl})` }}
              />
            )}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <p className="font-semibold text-gray-700 text-sm leading-snug">
              {member.prefix ? `${member.prefix.trim()} ` : ""}
              {member.name}
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mt-1">
              {member.title}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);
