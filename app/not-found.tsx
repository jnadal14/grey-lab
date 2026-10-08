import Button from '@/components/Button'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-mega">Wrong stage</h1>
      <p className="mt-6 max-w-md text-lg text-fog">This page isn&apos;t on the bill. Head back and catch the next show.</p>
      <div className="mt-10"><Button href="/">Back home</Button></div>
    </section>
  )
}
