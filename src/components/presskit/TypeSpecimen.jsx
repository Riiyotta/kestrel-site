// T5 TypeSpecimen row: family label (32/32 #4D4D4D, regular sans) left, alphabet specimen right (3 lines).
// Label -> specimen gap 24 is sampled from the screenshot. Phone stacks label above the specimen (screenshot).
const ALPHABET = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'

const SPECIMEN = {
  // Cirka 96/96 | 77/77 | 58/58 | phone 40/36 (spec says Ginto on phone; kept in the serif here, see report)
  serif:
    'font-framer font-display text-h3-phone tracking-display-sub md:text-h1-md md:tracking-display-sub lg:text-h1-lg lg:tracking-display-sub xl:text-h1-xl xl:tracking-display-sub',
  // Ginto 96/100 | 77/77 | 58/62 | phone not given in spec (h3-phone 40/36 assumed)
  sans: 'font-sans text-h3-phone md:text-specimen-sans-md lg:text-h1-lg xl:text-specimen-sans-xl',
}

export default function TypeSpecimen({ family, variant }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <p className="shrink-0 font-sans text-specimen-label text-specimen-label">{family}</p>
      <p className={`min-w-0 break-all text-ink ${SPECIMEN[variant]}`}>{ALPHABET}</p>
    </div>
  )
}
