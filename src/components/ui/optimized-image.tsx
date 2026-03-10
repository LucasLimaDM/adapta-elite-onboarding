import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  webpSrc?: string
  containerClassName?: string
}

export function OptimizedImage({
  src,
  fallbackSrc,
  webpSrc,
  alt,
  className,
  containerClassName,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={error && fallbackSrc ? fallbackSrc : src}
          alt={alt || ''}
          className={cn(
            'w-full h-auto object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          decoding="async"
          {...props}
        />
      </picture>
      {!loaded && (
        <div
          className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
