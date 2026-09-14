import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function MemberPage({ params }: { params: { slug: string } }) {
  const member = await fetchQuery(api.team.getBySlug, { slug: params.slug });

  if (!member) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <a href="/team" className="text-sm text-sky-700 hover:underline">
        ← Back to team
      </a>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-36 h-36 rounded-full object-cover shadow"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-4xl font-semibold shadow">
              {member.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("")}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {member.prefix ? `${member.prefix.trim()} ` : ""}{member.name}
          </h1>
          <p className="text-lg text-gray-500">{member.title}</p>

          <div className="pt-2 space-y-1 text-sm">
            <p>
              <a href={`mailto:${member.email}`} className="text-sky-700 hover:underline">
                {member.email}
              </a>
            </p>
            {member.telephone && (
              <p className="text-gray-600">{member.telephone}</p>
            )}
          </div>
        </div>
      </div>

      {member.bio && (
        <div className="prose prose-slate max-w-none border-t pt-6">
          <p className="text-gray-700 leading-relaxed">{member.bio}</p>
        </div>
      )}
    </div>
  );
}
