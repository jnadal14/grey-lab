import type { MediaKey } from '@/lib/media'

export type Service = { id: string; title: string; body: string; image: MediaKey }

export const servicesIntro = {
  title: 'How can we help?',
  body: 'Let us fill the gaps and make your project run smoother than ever!',
}

// Wording and images exactly as on greylab.ca/work-with-us (capitalization only).
export const services: Service[] = [
  {
    id: 'showrunning',
    title: 'Event & Showrunning',
    body: 'Do you need help booking and putting together your next sold-out headlining show? Let our team handle all the details so you can show up and enjoy your moment hassle free.',
    image: 'svc-showrunning',
  },
  {
    id: 'media',
    title: 'Full Event Media Coverage',
    body: 'Let our skilled team of photographers and videographers come and work their magic. We will capture every special moment and return high quality deliverables at fast turnarounds you have never seen before.',
    image: 'svc-media',
  },
  {
    id: 'backline',
    title: 'Backline and Technical Work',
    body: 'Our skilled team of technical staff can provide and source gear for your event. Our Technical Directors, Sound Technicians, Lighting Technicians and Grips will flawlessly execute your vision.',
    image: 'svc-backline',
  },
  {
    id: 'management',
    title: 'Management & Booking',
    body: 'Are you an artist or a band who is looking for gigs? Do you need help managing your project and need an extra set of hands? We can handle all booking and admin work so you can focus on your creative vision.',
    image: 'svc-management',
  },
]
