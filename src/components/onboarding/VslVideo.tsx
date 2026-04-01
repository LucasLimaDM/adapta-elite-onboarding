import { useEffect, useRef } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const VIDEO_ID = 'dfxXZWHXkvo'

interface VslVideoProps {
  isCompleted: boolean
  onComplete: () => void
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function VslVideo({ isCompleted, onComplete }: VslVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current) return
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: { rel: 0, modestbranding: 1, controls: 1 },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              intervalRef.current = setInterval(() => {
                const player = playerRef.current
                if (!player) return
                const duration = player.getDuration()
                const current = player.getCurrentTime()
                if (duration > 0 && current / duration >= 0.98) {
                  onCompleteRef.current()
                  if (intervalRef.current) clearInterval(intervalRef.current)
                }
              }, 2000)
            } else {
              if (intervalRef.current) clearInterval(intervalRef.current)
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      playerRef.current?.destroy?.()
    }
  }, [])

  return (
    <div className="w-full max-w-[600px] mx-auto rounded-2xl overflow-hidden shadow-elevation border border-[#333333] bg-[#0C0C0D] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <AspectRatio ratio={16 / 9}>
        <div ref={containerRef} className="w-full h-full" />
      </AspectRatio>
    </div>
  )
}
