import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

/* The single piece of motion on this page. IntersectionObserver, no scroll
   listener, and it collapses to fully visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Section headings stack vertically rather than sitting in a side rail. */
function SectionHead({
  title,
  body,
}: {
  title: string
  body: string
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="display display-lg">{title}</h2>
      <p className="lede mt-6">{body}</p>
    </div>
  )
}

const SERVICES = [
  {
    name: 'Check-up and clean',
    length: '50 minutes',
    price: '£95 to £145',
    detail:
      'Examination, scale and polish, and a written note on anything worth watching. Most patients are in and out within the hour.',
  },
  {
    name: 'Dental implants',
    length: 'Two or three visits',
    price: '£1,950 to £2,400',
    detail:
      'Titanium fixtures placed under local anaesthetic, with the crown fitted once the site has healed. The assessment includes a CT scan and a written cost breakdown.',
  },
  {
    name: 'White fillings',
    length: 'One or two visits',
    price: '£140 to £210',
    detail:
      'Composite resin placed in layers and cured under a rubber dam. Tooth-coloured, so a front filling is hard to spot.',
  },
  {
    name: 'Root canal treatment',
    length: 'Two or three visits',
    price: '£620 to £880',
    detail:
      'For teeth worth saving. The root is cleaned, disinfected and sealed, then finished with a crown so the tooth holds up under normal biting.',
  },
  {
    name: 'Emergency appointments',
    length: '15 to 30 minutes',
    price: '£70 per visit',
    detail:
      'Same-day slots kept back every weekday for pain, swelling or a broken tooth. Ring before nine and most people are seen that morning.',
  },
  {
    name: 'Children from three years',
    length: '20 to 30 minutes',
    price: 'Free on the NHS list',
    detail:
      'Short first visits that end with the child sitting in the chair on their own. Fluoride varnish twice a year is part of the check-up.',
  },
]

const TEAM = [
  {
    name: 'Dr Marnie Okonkwo',
    role: 'Principal dentist, BDS',
    bio: 'Qualified in 2004. Works on restorative dentistry and takes on the implant cases.',
    seed: 'clearwater-dentist-okonkwo-portrait',
  },
  {
    name: 'Dr Callum Breakey',
    role: 'Associate dentist',
    bio: 'Joined in 2013. Looks after nervous patients and handles the root canals.',
    seed: 'clearwater-dentist-breakey-portrait',
  },
  {
    name: 'Hanna Petrova, RDH',
    role: 'Dental hygienist',
    bio: 'Runs direct-access hygiene appointments for gum treatment and periodontal maintenance.',
    seed: 'clearwater-hygienist-petrova-portrait',
  },
  {
    name: 'Dr Yusuf Adeyemi',
    role: 'Implant dentist',
    bio: 'Places and restores implants, with two implant clinics a week at the practice.',
    seed: 'clearwater-implant-dentist-adeyemi-portrait',
  },
]

const FAQS = [
  {
    q: 'Do you take new patients?',
    a: 'Yes. Ring reception on 0141 496 2218 and ask for a new patient appointment. The first visit runs longer than a routine check-up because it includes a full mouth examination and, where needed, small X-rays.',
  },
  {
    q: 'How much does a check-up cost?',
    a: 'Examination on its own is £68. Examination with a scale and polish is between £95 and £145, depending on how much build-up there is. You get the exact figure before treatment starts.',
  },
  {
    q: 'What if I am nervous about the dentist?',
    a: 'Say so when you book and the appointment is lengthened. Treatment can be split into short stages with breaks, and numbing gel goes on first. A number of our nervous patients have been seeing Callum for years.',
  },
  {
    q: 'Can I register with NHS dentistry?',
    a: 'We hold an NHS list for children and for adults who were already registered with us under the previous contract terms. Ask reception what is open, because it depends on vacancies.',
  },
  {
    q: 'How quickly can I get an emergency appointment?',
    a: 'We keep slots back every weekday morning and afternoon for pain, swelling or a broken tooth. Ring before nine and most people are seen the same day.',
  },
  {
    q: 'Is there parking?',
    a: 'Six free spaces behind the building, plus two on Thorn Street under a one-hour limit. The number 24 bus stops two doors down on Kelvinhaugh Street.',
  },
]

const HOURS = [
  { day: 'Monday to Thursday', open: '8:00 to 18:00' },
  { day: 'Friday', open: '8:00 to 16:30' },
  { day: 'Saturday and Sunday', open: 'Closed' },
]

const NAV = [
  ['Services', '#services'],
  ['Dentists', '#team'],
  ['Questions', '#faq'],
  ['Contact', '#contact'],
]

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const uid = useId()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-canvas)]"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* NAV - one line at desktop, 72px tall                              */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/95 backdrop-blur-sm">
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <a
            href="#top"
            className="font-display text-[1.0625rem] font-bold tracking-[-0.03em] text-[var(--color-ink)]"
          >
            Clearwater Clinic
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[0.875rem] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-ink)]"
              >
                {label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn btn-primary hidden md:inline-flex">
            Request appointment
          </a>

          <button
            type="button"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-[var(--color-line)] text-[var(--color-ink)] md:hidden"
          >
            <span className="flex w-4 flex-col gap-[4px]">
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? 'translate-y-[2.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? '-translate-y-[2.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="border-t border-[var(--color-hairline)] md:hidden">
            <nav className="shell flex flex-col py-4">
              {NAV.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Request appointment
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- */}
        {/* HERO - left aligned text block beside a photograph              */}
        {/* -------------------------------------------------------------- */}
        <section id="top" className="shell pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="micro mb-6">General dental practice, Glasgow</p>
              <h1 className="display display-xl">
                Dental care
                <br />
                on Kelvinhaugh Street.
              </h1>
              <p className="lede mt-7">
                Check-ups, fillings, implants and emergency appointments. Six
                parking spaces behind the building, and someone answers the
                phone.
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a href="#contact" className="btn btn-primary sm:w-auto">
                  Request appointment
                </a>
                <a href="#services" className="btn btn-secondary sm:w-auto">
                  See services
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <div className="frame aspect-3/2 w-full">
                  <img
                    src="https://picsum.photos/seed/clearwater-dental-reception-room/1200/800"
                    alt="Reception room at Clearwater Clinic, with seating and a window facing the street"
                    loading="eager"
                    width={1200}
                    height={800}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* SERVICES - full width two-column rows, heading stacked above    */}
        {/* -------------------------------------------------------------- */}
        <section
          id="services"
          className="border-t border-[var(--color-hairline)] py-20 md:py-28"
        >
          <div className="shell">
            <Reveal>
              <SectionHead
                title="What we do"
                body="Prices are per tooth or per appointment, and they are confirmed in writing before treatment starts. A consultation for a treatment plan is free."
              />
            </Reveal>

            <ul className="mt-14 divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)]">
              {SERVICES.map((s, i) => (
                <Reveal key={s.name} delay={i * 60}>
                  <li className="grid gap-x-14 gap-y-3 py-7 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-4">
                      <h3 className="font-display text-[1.1875rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                        {s.name}
                      </h3>
                      <p className="mt-2 text-[0.8125rem] text-[var(--color-mute)]">
                        {s.length}
                      </p>
                      <p className="mt-3 text-[0.9375rem] font-semibold text-[var(--color-accent)]">
                        {s.price}
                      </p>
                    </div>
                    <div className="md:col-span-8">
                      <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                        {s.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* TEAM - 2x2 roster cards, portrait beside the name, not a column  */}
        {/* -------------------------------------------------------------- */}
        <section id="team" className="border-t border-[var(--color-hairline)] py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <SectionHead
                title="The clinicians"
                body="Four people, all of whom you will meet in person at your first visit. Registration and indemnity numbers are available at the desk on request."
              />
            </Reveal>

            <ul className="mt-14 grid gap-6 lg:grid-cols-2">
              {TEAM.map((m, i) => (
                <Reveal key={m.name} delay={i * 70}>
                  <li className="grid h-full grid-cols-[104px_1fr] gap-5 border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 sm:grid-cols-[148px_1fr] sm:gap-6 sm:p-5">
                    <div className="frame aspect-4/5 w-full">
                      <img
                        src={`https://picsum.photos/seed/${m.seed}/480/600`}
                        alt={`Portrait of ${m.name}, ${m.role.toLowerCase()} at Clearwater Clinic`}
                        loading="lazy"
                        width={480}
                        height={600}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                        {m.name}
                      </h3>
                      <p className="mt-1.5 text-[0.8125rem] font-semibold text-[var(--color-accent)]">
                        {m.role}
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                        {m.bio}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* FAQ - heading in a side rail, accordion on the right            */}
        {/* -------------------------------------------------------------- */}
        <section id="faq" className="border-t border-[var(--color-hairline)] py-20 md:py-28">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="display display-lg">Questions we get asked</h2>
                <p className="lede mt-6">
                  If yours is not on this list, reception will put you through to
                  whoever can answer it properly.
                </p>
              </div>

              <div className="lg:col-span-8">
                <ul className="divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)]">
                  {FAQS.map((f, i) => {
                    const btnId = `${uid}-btn-${i}`
                    const panelId = `${uid}-panel-${i}`
                    const isOpen = openFaq === i
                    return (
                      <li key={f.q}>
                        <h3>
                          <button
                            type="button"
                            id={btnId}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => setOpenFaq(isOpen ? null : i)}
                            className="flex w-full items-start justify-between gap-6 py-5 text-left"
                          >
                            <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-[var(--color-ink)]">
                              {f.q}
                            </span>
                            <span
                              aria-hidden="true"
                              className="relative mt-2 block h-3 w-3 shrink-0"
                            >
                              <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-[var(--color-accent)]" />
                              <span
                                className={`absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-[var(--color-accent)] transition-transform duration-200 ${
                                  isOpen ? 'scale-y-0' : ''
                                }`}
                              />
                            </span>
                          </button>
                        </h3>
                        {isOpen ? (
                          <div
                            id={panelId}
                            role="region"
                            aria-labelledby={btnId}
                            className="pb-6"
                          >
                            <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                              {f.a}
                            </p>
                          </div>
                        ) : (
                          <div id={panelId} hidden />
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* CONTACT - three column detail strip, then the request form      */}
        {/* -------------------------------------------------------------- */}
        <section
          id="contact"
          className="border-t border-[var(--color-hairline)] py-20 md:py-28"
        >
          <div className="shell">
            <Reveal>
              <SectionHead
                title="Contact and opening hours"
                body="Ring reception for anything urgent. For appointments, the form below reaches the same inbox and is answered within one working day."
              />
            </Reveal>

            <dl className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                  Address
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                  24 Kelvinhaugh Street
                  <br />
                  Glasgow G3 8PX
                </dd>
              </div>

              <div>
                <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                  Telephone
                </dt>
                <dd className="mt-2 text-[0.9375rem] text-[var(--color-ink)]">
                  <a
                    href="tel:+441414962218"
                    className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent)]"
                  >
                    0141 496 2218
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                  Email
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                  <a
                    href="mailto:reception@clearwaterclinic.example"
                    className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent)]"
                  >
                    reception@clearwaterclinic.example
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                  Opening hours
                </dt>
                <dd className="mt-2">
                  <ul className="grid gap-1.5">
                    {HOURS.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-baseline justify-between gap-4 text-[0.875rem]"
                      >
                        <span className="text-[var(--color-body)]">{h.day}</span>
                        <span className="shrink-0 font-semibold text-[var(--color-ink)]">
                          {h.open}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <Reveal className="mt-16" delay={80}>
              <div className="border border-[var(--color-hairline)] bg-[var(--color-surface)] p-6 md:p-10">
                {sent ? (
                  <div role="status">
                    <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-[var(--color-accent-deep)]">
                      Request received
                    </h3>
                    <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                      Thank you. Reception will ring to confirm a time. If your
                      tooth is hurting now, phone 0141 496 2218 instead so we can
                      see you sooner.
                    </p>
                    <button
                      type="button"
                      className="btn btn-secondary mt-7"
                      onClick={() => setSent(false)}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                      Request an appointment
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-[var(--color-mute)]">
                      All three fields are required.
                    </p>

                    <form
                      className="mt-7 grid gap-5"
                      noValidate
                      onSubmit={(e) => {
                        e.preventDefault()
                        const data = new FormData(e.currentTarget)
                        const next: Record<string, string> = {}
                        if (!String(data.get('name') ?? '').trim())
                          next.name = 'Enter the name we should ask for.'
                        if (!String(data.get('phone') ?? '').trim())
                          next.phone = 'Enter a phone number we can reach you on.'
                        if (!String(data.get('reason') ?? '').trim())
                          next.reason = 'Tell us briefly what needs looking at.'
                        setErrors(next)
                        if (Object.keys(next).length === 0) setSent(true)
                      }}
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <label
                            htmlFor={`${uid}-name`}
                            className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                          >
                            Full name
                          </label>
                          <input
                            id={`${uid}-name`}
                            name="name"
                            type="text"
                            autoComplete="name"
                            aria-invalid={errors.name ? 'true' : undefined}
                            aria-describedby={
                              errors.name
                                ? `${uid}-name-err`
                                : `${uid}-name-hint`
                            }
                            className="field"
                          />
                          {errors.name ? (
                            <p
                              id={`${uid}-name-err`}
                              className="text-[0.8125rem] font-semibold text-[#9b2c22]"
                            >
                              {errors.name}
                            </p>
                          ) : (
                            <p
                              id={`${uid}-name-hint`}
                              className="text-[0.8125rem] text-[var(--color-mute)]"
                            >
                              Whoever we should ask for.
                            </p>
                          )}
                        </div>

                        <div className="grid gap-2">
                          <label
                            htmlFor={`${uid}-phone`}
                            className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                          >
                            Phone number
                          </label>
                          <input
                            id={`${uid}-phone`}
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            aria-invalid={errors.phone ? 'true' : undefined}
                            aria-describedby={
                              errors.phone
                                ? `${uid}-phone-err`
                                : `${uid}-phone-hint`
                            }
                            className="field"
                          />
                          {errors.phone ? (
                            <p
                              id={`${uid}-phone-err`}
                              className="text-[0.8125rem] font-semibold text-[#9b2c22]"
                            >
                              {errors.phone}
                            </p>
                          ) : (
                            <p
                              id={`${uid}-phone-hint`}
                              className="text-[0.8125rem] text-[var(--color-mute)]"
                            >
                              Used only to arrange the appointment.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <label
                          htmlFor={`${uid}-reason`}
                          className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                        >
                          What needs looking at
                        </label>
                        <textarea
                          id={`${uid}-reason`}
                          name="reason"
                          rows={4}
                          aria-invalid={errors.reason ? 'true' : undefined}
                          aria-describedby={
                            errors.reason
                              ? `${uid}-reason-err`
                              : `${uid}-reason-hint`
                          }
                          className="field"
                        />
                        {errors.reason ? (
                          <p
                            id={`${uid}-reason-err`}
                            className="text-[0.8125rem] font-semibold text-[#9b2c22]"
                          >
                            {errors.reason}
                          </p>
                        ) : (
                          <p
                            id={`${uid}-reason-hint`}
                            className="text-[0.8125rem] text-[var(--color-mute)]"
                          >
                            A sentence is enough. Please say if it is urgent.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <button type="submit" className="btn btn-primary">
                          Send request
                        </button>
                        <p className="text-[0.8125rem] text-[var(--color-mute)]">
                          Answered within one working day.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                           */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-surface)] py-12">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="font-display text-[1.0625rem] font-bold tracking-[-0.03em] text-[var(--color-ink)]">
                Clearwater Clinic
              </p>
              <p className="mt-2 max-w-[46ch] text-[0.875rem] leading-relaxed text-[var(--color-body)]">
                Registered dental practice at 24 Kelvinhaugh Street, Glasgow G3
                8PX. Care registered with the General Dental Council.
              </p>
            </div>

            <nav className="md:col-span-3" aria-label="Footer">
              <h2 className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                On this page
              </h2>
              <ul className="mt-3 grid gap-2">
                {NAV.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[0.875rem] text-[var(--color-body)] transition-colors hover:text-[var(--color-ink)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-3">
              <h2 className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                Out of hours
              </h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--color-body)]">
                NHS 24 on 111 for urgent dental advice when the practice is
                closed.
              </p>
            </div>
          </div>

          <p className="mt-10 border-t border-[var(--color-hairline)] pt-6 text-[0.8125rem] leading-relaxed text-[var(--color-mute)]">
            Prices shown are guide figures for private patients and change from
            time to time. Nothing on this page is medical advice.
          </p>
        </div>
      </footer>
    </>
  )
}