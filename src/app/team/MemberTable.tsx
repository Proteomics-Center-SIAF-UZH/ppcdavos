import { Member } from "../content/types";

export const MemberTable = ({ members }: { members: Member[] }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-100 ">
        <thead className="text-xs text-gray-700 bg-gray-200 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 w-full w-4/10">
              Name
            </th>
            <th scope="col" className="px-6 py-3 w-3/10">
              Email
            </th>
            <th scope="col" className="px-6 py-3 w-3/10">
              Telephone
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              className="bg-white border-b border-b-gray-200 border-gray-700 text-gray-700"
              key={`member-${index}`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {member.name}
              </th>
              <td className="px-6 py-4">{member.email}</td>
              <td className="px-6 py-4">{member.telephone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
