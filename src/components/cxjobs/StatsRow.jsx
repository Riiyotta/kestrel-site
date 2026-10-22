import { Fragment } from 'react'

// J3 StatsRow / "Brand Banner" (SPEC_PAGES_C T4): white panel, padding 24 (tablet 36px 48px, phone 28px 20px).
// Row gap 48 (tablet 28) of 3 equal stats split by 1x56 dividers rgba(0,0,0,.1); phone stacks (gap 24) with 1px rules.
// Stat column gap 6: number 600 56/56 -1.68 (tablet 34/34, phone 44/44), label 600 15/18 #18181B, desc 14/16.8 #71717A.
export default function StatsRow({ stats, className = '' }) {
  return (
    <section className={`flex flex-col gap-6 bg-white px-5 py-7 md:flex-row md:items-center md:gap-7 md:px-12 md:py-9 lg:gap-12 lg:p-6 ${className}`}>
      {stats.map((s, i) => (
        <Fragment key={s.label}>
          {i > 0 && <span aria-hidden="true" className="h-px w-full shrink-0 bg-card-border md:h-14 md:w-px" />}
          <div className="flex flex-1 flex-col gap-1.5 font-inter">
            <p className="text-jobs-stat-phone font-semibold text-ink md:text-jobs-stat-md lg:text-jobs-stat-xl">{s.value}</p>
            <p className="text-jobs-stat-label font-semibold text-jobs-stat-label">{s.label}</p>
            <p className="text-jobs-stat-desc text-jobs-stat-desc">{s.desc}</p>
          </div>
        </Fragment>
      ))}
    </section>
  )
}
