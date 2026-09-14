import { Member } from "../content/types";

const MemberAvatar = ({ imageUrl, name }: { imageUrl?: string | null; name: string }) => {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <div className="relative w-8 h-8 flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-semibold">
        {initials}
      </div>
      {imageUrl && (
        <div
          className="absolute inset-0 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
    </div>
  );
};

export const MemberTable = ({ members }: { members: Member[] }) => {
  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full table-fixed text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-500 bg-gray-50 uppercase tracking-wider">
          <tr>
            <th scope="col" className="pl-4 py-3 w-5/10">Name</th>
            <th scope="col" className="pl-4 py-3 w-3/10">Email</th>
            <th scope="col" className="pl-4 py-3 w-2/10">Telephone</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              className="bg-white border-t border-gray-100 hover:bg-sky-50 transition-colors"
              key={`member-${index}`}
            >
              <td className="pl-4 py-3 w-5/10 font-medium">
                <div className="flex items-center gap-3">
                  <MemberAvatar imageUrl={(member as any).imageUrl} name={member.name} />
                  <a
                    href={`/team/${member.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                    className="hover:text-sky-700 hover:underline"
                  >
                    {member.prefix ? `${member.prefix.trim()} ` : ""}
                    {member.name}
                    {member.isVisiting ? " (visiting)" : ""}
                  </a>
                </div>
              </td>
              <td className="pl-4 py-3 w-3/10 break-words">
                <a href={`mailto:${member.email}`} className="text-sky-700 hover:underline">
                  {member.email}
                </a>
              </td>
              <td className="pl-4 py-3 w-2/10 text-gray-500">
                {member.telephone || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
