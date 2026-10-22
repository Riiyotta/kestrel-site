// T5 DownloadTile: 76 tall, padding 30px 60px, bg #E6E6E6, radius 0, label = file format, 16/16 #474747 centred.
// Hover: bg #B0B0B0, label #000, scale 1.1. Timing not frame-sampled on live; spec suggests ~200ms ease-out.
export default function DownloadTile({ format, href = '#' }) {
  const isFile = href !== '#'
  return (
    <a
      href={href}
      download={isFile || undefined}
      data-motion="download-tile-hover"
      className="relative flex h-[76px] items-center justify-center bg-dl-tile px-[60px] py-[30px] font-sans text-dl-label text-dl-tile-label transition-[transform,background-color,color] duration-200 ease-out hover:z-10 hover:scale-110 hover:bg-dl-tile-hover hover:text-ink motion-reduce:transition-none"
    >
      {format}
    </a>
  )
}

const FORMATS = ['JPG', 'PNG', 'SVG', 'EPS']

// Row of 4 tiles, gap 8 (2 per row @390). Only the SVG exists in this build (public/assets/presskit); others link to "#".
export function DownloadRow({ svg }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {FORMATS.map((f) => (
        <DownloadTile key={f} format={f} href={f === 'SVG' && svg ? svg : '#'} />
      ))}
    </div>
  )
}
