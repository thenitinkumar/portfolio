'use client'

import { useEffect } from 'react'

export function ClickSound() {
  useEffect(() => {
    let ctx: AudioContext | null = null

    function play() {
      try {
        if (!ctx) ctx = new AudioContext()
        const bufLen = Math.floor(ctx.sampleRate * 0.035)
        const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
        const data = buf.getChannelData(0)
        for (let i = 0; i < bufLen; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 8)
        }
        const src = ctx.createBufferSource()
        src.buffer = buf
        const filter = ctx.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.value = 1400
        filter.Q.value = 0.8
        const gain = ctx.createGain()
        gain.gain.value = 0.15
        src.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        src.start()
      } catch {}
    }

    function onClick(e: MouseEvent) {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"]')) play()
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
