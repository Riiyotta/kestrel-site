import { BODY_TEXT } from './DocSection.jsx'
import { DownloadRow } from './DownloadTile.jsx'

// T5 AssetPreview ("Diagram"): padding-top 40, column gap 10: label (20/26) -> preview (aspect 1116.8x578, radius 0;
// light = white + 1px #CCC overlay border, dark = #1A1A1A) -> row of 4 DownloadTiles.
export default function AssetPreview({ label, dark = false, svg, children }) {
  return (
    <div className="flex flex-col gap-2.5 pt-10">
      <p className={BODY_TEXT}>{label}</p>
      <div
        className={`relative flex aspect-[1116.8/578] w-full items-center justify-center ${
          dark ? 'bg-ink-900' : 'bg-white after:pointer-events-none after:absolute after:inset-0 after:border after:border-preview-border'
        }`}
      >
        {children}
      </div>
      <DownloadRow svg={svg} />
    </div>
  )
}

// Icon grid item: square preview (550.4x549; white or #1A1A1A tile), caption 14/18, 4 tiles (131.6 wide @1440).
export function IconPreview({ caption, dark = false, svg, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className={`relative flex aspect-[550.4/549] w-full items-center justify-center ${dark ? 'bg-ink-900' : 'bg-white'}`}>{children}</div>
      <p className="font-sans text-small text-ink">{caption}</p>
      <DownloadRow svg={svg} />
    </div>
  )
}
