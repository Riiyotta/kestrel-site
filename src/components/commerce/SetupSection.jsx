import RichText from '../ui/RichText.jsx'
import { BODY_SCALE, GINTO, H2_SCALE } from '../ui/type.js'

// SetupSection – SPEC_PAGES_A T3.4 ("VARIANT of P1 ProseSection"): setup steps + static FAQ on /integrations.
// Uses P1 typography (H2 Cirka 75/72 -> 58 -> 48/50 -> 40/40, H3 Ginto 32/32 −1.28, body RichText "prose" 20/26
// #808080 -> 18/23.4 -> 16/20.8) but not the ProseSection shell: the content runs the full 1200 width inside a
// wrapper padded 120px 64px 0 (P1 is 1040 wide with 60/80 padding), so the shell is composed here.
// Vertical rhythm, measured off recon/pages/integrations-library/integrations-1440.png (spec gives only the outer
// padding, "steps gap 40" and "FAQ padding-top 32"):
//   H2 -> intro 16; intro -> steps 48; steps 40 apart (H3 -> p 12); steps -> support paragraphs 48, those 16 apart;
//   support -> FAQ block 48 + its padding-top 32 (= 80 on the PNG); FAQ H2 -> questions 40, Q/A 40 apart
//   (H3 -> answer 12, answer paragraphs 20 = RichText gap); 169 below the last answer. The spec's table puts the
//   section end at 6350, but the footer CTA heading sits at 6776 on the PNG (1657 on the T4 PNG, 3371 on pricing,
//   all with the identical footer), which puts the footer start at ≈6471, i.e. 169 below the last answer.
// Side padding below 1440 follows T3.1 (32 @1000/1280, 20 phone) – not stated for T3.4. Static, no motion.

const H3 = `${GINTO} text-title-32 text-ink`

export default function SetupSection({ setup, className = '' }) {
  return (
    <section data-ui="setup-section" className={`px-5 pb-[169px] pt-[120px] md:px-8 xl:px-16 ${className}`}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className={`text-left text-ink ${H2_SCALE}`}>{setup.title}</h2>
          <p className={`${BODY_SCALE} text-muted-3`}>{setup.intro}</p>
        </div>
        <div className="flex flex-col gap-10">
          {setup.steps.map((s) => (
            <div key={s.title} className="flex flex-col gap-3">
              <h3 className={H3}>{s.title}</h3>
              <p className={`${BODY_SCALE} text-muted-3`}>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {setup.support.map((p, i) => (
            <p key={i} className={`${BODY_SCALE} text-muted-3`}>
              {p}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-10 pt-8">
          <h2 className={`text-left text-ink ${H2_SCALE}`}>{setup.faqTitle}</h2>
          {setup.faq.map((item) => (
            <div key={item.q} className="flex flex-col gap-3">
              <h3 className={H3}>{item.q}</h3>
              <RichText blocks={item.blocks} variant="prose" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
