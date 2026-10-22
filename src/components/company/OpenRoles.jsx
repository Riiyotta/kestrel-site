import SectionHeading from '../ui/SectionHeading.jsx'

// OpenRoles – SPEC_PAGES_C C5 (/careers "join us", id open-roles).
//   Section padding 102 (102px 32px tablet, 102px 20px phone), gap 80: SectionHeading (H2 + soft sub) then the list.
//   Live widget = an Ashby job-board code component; its API call fails on live, so only the error fallback shows.
//   The rebuild renders the success state from local placeholder data (no network call), restyled into the site
//   tokens as the spec suggests (Cirka title, Ginto/Inter text) while keeping the component-source structure:
//   max-w 1200 centred; title "Open positions (N)" 24 bold, 24 below; jobs grouped by department A–Z, each group
//   margin-bottom 40 with an H3 18/600 (16 below) and a grid (gap 12) of job cards: link, block, padding 20, bg #FFF,
//   radius 12, 1px transparent border -> hover/focus border #5B3FFF (border-color 120ms); title 18/600 #5B3FFF,
//   6 below; meta 14 #555 "department • location • type • Remote/On-site". No filters.
//   Empty data -> the fallback line (12px #666 "could not load roles, view them at" + a link to the board).

function group(jobs) {
  const by = {}
  jobs.forEach((j) => {
    ;(by[j.department] ||= []).push(j)
  })
  return Object.keys(by)
    .sort()
    .map((d) => [d, by[d]])
}

export default function OpenRoles({ title, sub, jobs = [], boardHref = '#' }) {
  return (
    <section id="open-roles" data-section="open-roles" className="flex scroll-mt-24 flex-col items-center gap-20 bg-white px-5 py-[102px] md:px-8 lg:px-[102px]">
      <SectionHeading title={title} sub={sub} />
      <div className="mx-auto w-full max-w-[1200px]">
        {jobs.length === 0 ? (
          <p className="p-6 font-sans text-[12px] text-muted">
            Could not load open roles. View them on <a href={boardHref} className="underline">our jobs board</a>.
          </p>
        ) : (
          <>
            <h3 className="mb-6 font-sans text-[24px] font-bold leading-tight text-ink">Open positions ({jobs.length})</h3>
            {group(jobs).map(([dept, list]) => (
              <div key={dept} className="mb-10 last:mb-0">
                <h4 className="mb-4 font-sans text-[18px] font-semibold text-ink">{dept}</h4>
                <div className="grid gap-3">
                  {list.map((j) => (
                    <a
                      key={j.title}
                      href={boardHref}
                      className="block rounded-playbook border border-transparent bg-white p-5 transition-[border-color] duration-[120ms] hover:border-ashby-accent focus-visible:border-ashby-accent motion-reduce:transition-none"
                    >
                      <p className="mb-1.5 font-sans text-[18px] font-semibold text-ashby-accent">{j.title}</p>
                      <p className="font-sans text-[14px] text-ashby-meta">
                        {[j.department, j.location, j.type, j.remote ? 'Remote' : 'On-site'].join(' • ')}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
