import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import { Fragment } from "react";

export const revalidate = 60;

export default async function MemberPage({ params }: { params: { slug: string } }) {
  const member = await fetchQuery(api.team.getBySlug, { slug: params.slug });
  if (!member) notFound();

  const imageUrl = (member as any).imageUrl as string | null | undefined;
  const allNames = [member.name, ...(member.otherNames ?? [])];
  const publications = await fetchQuery(api.publications.getByAuthor, { names: allNames });
  const initials = member.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("");

  return (
    <div className="space-y-12">
      <a href="/team" className="text-sm text-gray-400 hover:text-sky-700 transition-colors inline-flex items-center gap-1">
        ← Back to team
      </a>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-10 items-start">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center"
            style={{ boxShadow: "0 4px 24px -4px rgba(15,23,42,0.12)" }}>
            <span className="text-slate-300 font-semibold select-none text-6xl">{initials}</span>
            {imageUrl && (
              <div className="absolute inset-0 bg-cover bg-center bg-top"
                style={{ backgroundImage: `url(${imageUrl})` }} />
            )}
          </div>
        </div>

        {/* Identity */}
        <div className="space-y-4 pt-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-sky-700 font-medium mb-2">
              {member.title}
            </p>
            <h1 className="text-4xl font-bold text-sky-950 leading-tight">
              {member.prefix ? `${member.prefix.trim()} ` : ""}{member.name}
            </h1>
          </div>

          <div className="flex flex-col gap-1.5 pt-2">
            <a href={`mailto:${member.email}`}
              className="inline-flex items-center gap-2 text-sm text-sky-700 hover:underline">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {member.email}
            </a>
            {member.telephone && (
              <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {member.telephone}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {(member as any).bio && (
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">About</h2>
          <p className="text-slate-700 leading-relaxed max-w-[65ch]">{(member as any).bio}</p>
        </div>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <div className="border-t border-gray-100 pt-10 space-y-8">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 font-medium">
            Publications ({publications.length})
          </h2>
          <div className="space-y-6">
            {publications.map((pub, i) => (
              <div key={i} className="space-y-1.5">
                <a href={pub.link} target="_blank" rel="noopener noreferrer"
                  className="font-semibold text-gray-900 hover:text-sky-700 transition-colors leading-snug block">
                  {pub.title}
                </a>
                <p className="text-sm text-gray-500">
                  {pub.authors.map((author, idx) => (
                    <Fragment key={author}>
                      {allNames.includes(author) ? <b className="text-gray-700">{author}</b> : author}
                      {idx < pub.authors.length - 1 && (idx === pub.authors.length - 2 ? " & " : ", ")}
                    </Fragment>
                  ))}
                </p>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                  {pub.journal} · {pub.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
