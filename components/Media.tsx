import Image, { type ImageProps } from 'next/image'
import { getMedia, type MediaKey } from '@/lib/media'

type Props = Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'> & {
  id: MediaKey
  alt: string
}

/**
 * An image from content/media.json. Pass `fill` to cover a positioned parent,
 * otherwise it renders at the master's aspect ratio. Always set `sizes` so the
 * loader can choose the right file.
 */
export default function Media({ id, alt, fill, placeholder, ...rest }: Props) {
  const m = getMedia(id)
  const blur = placeholder ?? (m.blur ? 'blur' : 'empty')
  return (
    <Image
      src={m.src}
      alt={alt}
      {...(fill ? { fill } : { width: m.width, height: m.height })}
      placeholder={blur}
      blurDataURL={m.blur}
      {...rest}
    />
  )
}
