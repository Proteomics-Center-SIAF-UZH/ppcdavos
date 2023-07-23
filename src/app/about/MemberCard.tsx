export const MemberCard = 
    ({name, title, image = 'user.png', email, telephone}:{name: string, title: string, image?:string, email: string, telephone: string}) => {
        return (
            <div className="bg-white mx-auto p-4 border border-gray-200 rounded-lg shadow hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`/images/members/${image}`} alt={image}/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
                    <span className="text-gray-500">{title}</span>

                    <div className="text-sm flex flex-col items-center pt-2">
                        <a href={`mailto: ${email}`}>{email}</a>
                        <span>{telephone}</span>
                    </div>
                </div>
            </div>
        )   
}
