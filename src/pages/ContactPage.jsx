import { MapPin } from 'lucide-react'
import { PageHeader, Section, SectionHeading } from '../components/Layout'
import { Disclaimer } from '../components/Disclaimer'
import { GroupAnnouncement, SocialRow } from '../components/CommunityChannels'
import { Reveal } from '../components/Reveal'
import { BRAND } from '../data/site'

export function ContactPage() {

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello where we actually are."
        body="There is no form here and no inbox to wait on. Every conversation happens on our socials — send a message or a follow and a steward will get back to you."
        meta={
          <>
            <span>{BRAND.location}</span>
            <span aria-hidden="true">·</span>
            <span>Replies on socials, not email</span>
          </>
        }
      />

      <Section labelledBy="contact-title">
        <div className="contact-layout">
          <Reveal className="stack stack--lg">
            <div>
              <h2 id="contact-title" style={{ fontSize: 'var(--fs-xl)' }}>
                Message us directly
              </h2>
              <p className="small muted" style={{ marginTop: 'var(--sp-2)' }}>
                Pick whichever platform you already use. Facebook is fastest for longer questions,
                Instagram and TikTok for quick hellos and session clips.
              </p>
            </div>

            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Find us online</h2>
              </div>
              <div className="panel__body">
                <SocialRow />
              </div>
            </div>
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Before you write</h2>
              </div>
              <div className="panel__body">
                <ul className="card__list">
                  {[
                    'Membership questions — FAQ first.',
                    'Mentorship intake — message any social.',
                    'Site issues — tell us, we fix fast.',
                  ].map((item) => (
                    <li key={item} className="card__list-item">
                      <span
                        style={{
                          width: '0.4rem',
                          height: '0.4rem',
                          borderRadius: '50%',
                          background: 'var(--c-primary)',
                          marginTop: '0.55rem',
                        }}
                        aria-hidden="true"
                      />
                      <span className="small">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal className="stack stack--lg" delay={0.1}>
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Where we are</h2>
              </div>
              <div className="panel__body">
                <div className="contact-item">
                  <span className="contact-item__icon" aria-hidden="true">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <p className="small strong">Where we are</p>
                    <p className="small muted">{BRAND.location}</p>
                    <p className="xs subtle">Sessions are held online. Office visits by appointment.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
              <div className="panel__body">
                <ul className="card__list">
                  {[
                    'Membership questions are usually answered in the FAQ on the membership page.',
'Mentorship applications run in cohorts. Say so in the message group and a steward will confirm the next intake.',
    'If you have found something wrong on the site, tell us. Correcting it is a priority.',
                  ].map((item) => (
                    <li key={item} className="card__list-item">
                      <span
                        style={{
                          width: '0.4rem',
                          height: '0.4rem',
                          borderRadius: '50%',
                          background: 'var(--c-primary)',
                          marginTop: '0.55rem',
                        }}
                        aria-hidden="true"
                      />
                      <span className="small">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tight tone="tint">
        <GroupAnnouncement />
        <div style={{ height: 'var(--sp-8)' }} aria-hidden="true" />
        <SectionHeading eyebrow="One more thing" title="We are not financial advisers." stack />
        <Reveal delay={0.1}>
          <Disclaimer />
        </Reveal>
        <p className="footnote">
          Market Stewards provides educational and community resources. We do not manage money, take
          deposits, execute trades on your behalf, or provide personalised investment advice. If
          you are unsure whether a decision is right for your situation, speak to a licensed
          professional who can consider your full circumstances.
        </p>
      </Section>
    </>
  )
}
