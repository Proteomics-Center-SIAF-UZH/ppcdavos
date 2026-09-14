import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import { Fragment } from "react";

export const revalidate = 60;

export default async function MemberPage({ params }: { params: { slug: string } }) {
  const member = await fetchQuery(api.team.getBySlug, { slug: params.slug });
  if (!member) notFound();

  const allNames = [member.name, ...(member.otherNames ?? [])];
  const publications = await fetchQuery(api.publications.getByAuthor, { names: allNames });

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
        <div className="border-t pt-6">
          <p className="text-gray-700 leading-relaxed">{member.bio}</p>
        </div>
      )}

      {publications.length > 0 && (
        <div className="border-t pt-6 space-y-6">
          <h2 className="text-xl font-semibold">Publications</h2>
          <div className="space-y-6">
            {publications.map((pub, i) => (
              <div key={i} className="border-b pb-4 space-y-1">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-blue-900"
                >
                  {pub.title}
                </a>
                <p className="text-sm text-gray-600">
                  {pub.authors.map((author, idx) => (
                    <Fragment key={author}>
                      {allNames.includes(author) ? <b>{author}</b> : author}
                      {idx < pub.authors.length - 1 && (idx === pub.authors.length - 2 ? " & " : ", ")}
                    </Fragment>
                  ))}
                </p>
                <p className="text-sm text-gray-400">{pub.journal} · {pub.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
