import { MemberCard } from "./MemberCard";

const dummyProps = [
  {name:'Christoph Messner', title: 'Professor', email:'dummy@email.com', telephone: '+410771239823'},
  {name:'Patrick Westermann', title: 'Lab technician', email:'dummy@email.com', telephone: '+410771239823'},
  {name:'Philipp Gessner', title: 'Ph.D. Student', image:'philipp.jpeg', email:'dummy@email.com', telephone: '+410771239823'},
  {name:'Xindong Sun', title: 'Ph.D. Student', email:'dummy@email.com', telephone: '+410771239823'},];

export default function About() {
  return (
    <div className="p-24 space-y-16">
      <div>
        <h2 className='text-2xl mb-6'>About the lab</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-center">
            <span className="text-slate-700">The Precision Proteomics Center is part of <a href='https://www.siaf.uzh.ch/' target="_blank">the Swiss Institute of Allergy and Asthma Research (SIAF)</a> and associated with the University of Zurich. It is based on the medicine campus in Davos and equipped with high-end instrumentation (Thermo Orbitrap Eclipse). At the Precision Proteomics Center, we develop and apply cutting edge MS based technologies for the proteome analyses of clinical samples (body fluids, tissues, cells). We aim to identify new biomarkers and disease mechanisms that contribute to the development of the next generation of personalized treatments.</span>       
          </div>
          <img className="h-auto w-auto rounded-lg" src="images/siaf_birdview.png" alt="image description"/>
        </div>
      </div>
      <div>
        <h2 className='text-2xl mb-6'>Our team</h2>
          <div className="flex space-x-8">
          {dummyProps.map((member)=>(
            <div className="w-full max-w-xs h-full max-h-sm">
            <MemberCard {...member}/>
          </div>
          ))}
          </div>
      </div>
    </div>
  )
}

