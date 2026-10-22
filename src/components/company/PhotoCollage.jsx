// PhotoCollage – SPEC_PAGES_C A2 (/about): one large photo + two smaller overlapping photos, all cover, radius 16,
// no shadow/border. Static (no load or scroll animation measured).
//   Section: column, centred, padding 138 (>=1200) / 104 (810–1199) / 66.63 (phone).
//   Positions are relative to the main photo's top-left:
//     >=1200: main 885x590; left 214x297 at (−107, +371); right 280x262 at (+693, +34)
//     810–1199: main 557x371; left 197x273 at (−74, +208); right 197x184 at (+464, +7)
//     phone: main 316x211; left 112x155 at (−25, +116); right 112x105 at (+225, −19)
// Photos are stock placeholders (IMAGE_CREDITS.md); a tint gradient shows while they load.

function Photo({ photo, className }) {
  return (
    <div className={`overflow-hidden rounded-card bg-gradient-to-br from-tint-lavender via-card-gray to-tint-yellow ${className}`}>
      {photo?.src ? <img src={photo.src} alt={photo.alt || ''} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : null}
    </div>
  )
}

export default function PhotoCollage({ photos }) {
  return (
    <section data-section="photo-collage" className="flex flex-col items-center p-[66.63px] md:p-[104px] lg:p-[138px]">
      <div className="relative h-[211px] w-[316px] shrink-0 md:h-[371px] md:w-[557px] lg:h-[590px] lg:w-[885px]">
        <Photo photo={photos.main} className="h-full w-full" />
        <Photo
          photo={photos.left}
          className="absolute left-[-25px] top-[116px] h-[155px] w-[112px] md:left-[-74px] md:top-[208px] md:h-[273px] md:w-[197px] lg:left-[-107px] lg:top-[371px] lg:h-[297px] lg:w-[214px]"
        />
        <Photo
          photo={photos.right}
          className="absolute left-[225px] top-[-19px] h-[105px] w-[112px] md:left-[464px] md:top-[7px] md:h-[184px] md:w-[197px] lg:left-[693px] lg:top-[34px] lg:h-[262px] lg:w-[280px]"
        />
      </div>
    </section>
  )
}
