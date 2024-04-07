import { ReactNode } from "react";
import { MemberCard } from "./MemberCard";
import { TextWithImageSection } from "../components/section/TextWithImageSection";

enum Title {
  PROFESSOR = 'Professor',
  LAB_MAMAGER = 'Lab manager',
  DOCTORAL_CANDIDATE = 'Doctoral candidate'
}

type Member = {
  name: string;
  title: Title;
  image: string;
  email: string;
  telephone: string;
}

const teamMembers: Member[] = [
  { name: 'Prof. Dr. Christoph Messner', title: Title.PROFESSOR, image: 'christoph.jpeg', email: 'dummy@email.com', telephone: '+410777777777' },
  { name: 'Patrick Westermann', title: Title.LAB_MAMAGER, image: 'patrick.jpeg', email: 'dummy@email.com', telephone: '+410777777777' },
  { name: 'Philipp Gessner', title: Title.DOCTORAL_CANDIDATE, image: 'philipp.jpeg', email: 'dummy@email.com', telephone: '+410777777777' },
  { name: 'Xindong Sun', title: Title.DOCTORAL_CANDIDATE, image: 'xindong.jpeg', email: 'dummy@email.com', telephone: '+410777777777' },
  { name: 'Lopamudra Chatterjee', title: Title.DOCTORAL_CANDIDATE, image: 'lopamudra.jpeg', email: 'dummy@email.com', telephone: '+410777777777' }];


const MemberTable = ({ members }: { members: Member[] }) => {

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
            <tr className="bg-white border-b border-b-gray-200 border-gray-700 text-gray-700" key={`member-${index}`}>
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {member.name}
              </th>
              <td className="px-6 py-4">
                {member.email}
              </td>
              <td className="px-6 py-4">
                {member.telephone}
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>)
}

export default function Team() {
  const professors = teamMembers.filter((v) => v.title === Title.PROFESSOR)
  const labManagers = teamMembers.filter((v) => v.title === Title.LAB_MAMAGER)
  const doctoralCandidates = teamMembers.filter((v) => v.title === Title.DOCTORAL_CANDIDATE)


  return (
    <div className="p-24 space-y-16">
      <TextWithImageSection
        title={'About the lab'}
        imgSrc={'images/siaf_birdview.png'}
        imgAlt="Siaf Birdview"
        text={<>The Precision Proteomics Center is part of <a href='https://www.siaf.uzh.ch/' target="_blank">the Swiss Institute of Allergy and Asthma Research (SIAF)</a> and associated with the University of Zurich. It is based on the medicine campus in Davos and equipped with high-end instrumentation (Thermo Orbitrap Eclipse). At the Precision Proteomics Center, we develop and apply cutting edge MS based technologies for the proteome analyses of clinical samples (body fluids, tissues, cells). We aim to identify new biomarkers and disease mechanisms that contribute to the development of the next generation of personalized treatments.</>}
      />
      <div className="mb-16 space-y-4">
        <h3 className='text-2xl'>Group lead</h3>
        <MemberTable members={professors} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className='text-2xl'>Lab manager</h3>
        <MemberTable members={labManagers} />
      </div>
      <div className="mb-16 space-y-4">
        <h3 className='text-2xl'>Doctoral candidates</h3>
        <MemberTable members={doctoralCandidates} />
      </div>
    </div>

  )
}

