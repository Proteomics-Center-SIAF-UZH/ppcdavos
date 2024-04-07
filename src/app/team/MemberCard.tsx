import Link from "next/link"

export const MemberCard =
    ({ name, title, image = 'user.png', email, telephone }: { name: string, title: string, image?: string, email: string, telephone: string }) => {
        return (
            <Link href={'/about/philipp'}>
                <div className="bg-white mx-auto p-4 border border-gray-200 rounded-lg shadow hover:shadow-xl transition-shadow">
                    <div className="flex flex-col items-center pb-10">

                        <img className="image-fit mb-3 shadow-lg" src={`/images/members/${image}`} alt={image} />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
                        <span className="text-gray-500">{title}</span>

                        <div className="text-sm flex flex-col items-center pt-2">
                            <a href={`mailto: ${email}`}>{email}</a>
                            <span>{telephone}</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
