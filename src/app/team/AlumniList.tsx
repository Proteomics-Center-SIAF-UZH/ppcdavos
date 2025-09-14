import { Member } from "../content/types";

export const AlumniList = ({ members }: { members: Member[] }) => {
  return (
    <div className="text-slate-700">
      {members.map((member, index) => (
        <div key={index}>
          {member.prefix && <span>{member.prefix}</span>}
          {member.name} ({member.title.toLowerCase()})
          {index < members.length - 1 && ", "}
        </div>
      ))}
    </div>
  );
};
