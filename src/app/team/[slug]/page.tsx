import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import { Fragment } from "react";

export const revalidate = 60;

export default async function MemberPage({ params }: { params: { slug: string } }) {
  const member = await fetchQuery(api.team.getBySlug, { slug: params.slug });
  if (!member) notFound();

  const imageUrl = (member as any).imageUrl as string | null | undefined;
  const imageSource = (member as any).imageSource as string | undefined;
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
          {imageSource && (
            <p className="text-xs text-gray-400 italic mt-1.5 text-right">© {imageSource}</p>
          )}
        </div>

        {/* Identity */}
        <div className="space-y-4 pt-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-sky-700 font-medium mb-2">
              {member.isVisiting ? `Visiting ${member.title}` : member.title}
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
            {(member as any).linkedin && (
              <a href={(member as any).linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-sky-700 hover:underline">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            )}
            {(member as any).orcid && (
              <a href={(member as any).orcid} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-sky-700 hover:underline">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.934-1.444 3.934-3.722 0-1.95-1.247-3.722-3.897-3.722h-2.334z"/>
                </svg>
                ORCID
              </a>
            )}
            {(member as any).googleScholar && (
              <a href={(member as any).googleScholar} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-sky-700 hover:underline">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z"/>
                </svg>
                Google Scholar
              </a>
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
