import Link from "next/link";

const LinkItem = ({name, href}:{name: string, href:string}) =>                
    <Link href={href} className="hover:bg-sky-50 hover:rounded-md hover:text-sky-950 p-1 transition-all">{name}</Link>


const Navigation = () => { 
    return (
        <div className="flex justify-between px-16 py-8 bg-sky-950 text-white">
            <Link href='/'><h1 className='text-xl font-bold'>Precision Proteomic Center Davos</h1></Link>
            <div className="space-x-6">
                <LinkItem href='/about' name="About us" />
                <LinkItem href='/research' name="Research" />
                <LinkItem href='/openPositions' name="Open position" />
            </div>
        </div>
        ) 
};

export default Navigation;