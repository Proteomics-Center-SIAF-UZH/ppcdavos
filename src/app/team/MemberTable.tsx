import { Member } from "../content/types";

export const MemberTable = ({ members }: { members: Member[] }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-100">
        <thead className="text-xs text-gray-700 bg-gray-200 uppercase">
          <tr >
            <th scope="col" className="pl-2 py-3 w-5/10 text-wrap">
              Name
            </th>
            <th scope="col" className="pl-2 py-3 w-3/10 text-wrap">
              Email
            </th>
            <th scope="col" className="pl-2 py-3 w-2/10 text-wrap">
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
              <td scope="row" className="pl-2 py-2 w-5/10 font-medium text-wrap">
                {member.name}
              </td>
              <td scope='row' className="pl-2 py-2 w-3/10 break-words" >
                <a href={`mailto:${member.email}`} className="email">
                  <span>
                    {member.email}
                  </span>
                </a>
              </td>
              <td scope='row' className="pl-2 py-2 w-2/10 text-wrap">{member.telephone || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
