import { MapPin, Mail } from 'lucide-react'
import { PageHeader, Section, SectionHeading } from '../components/Layout'
import { Disclaimer } from '../components/Disclaimer'
import { GroupAnnouncement, SocialRow } from '../components/CommunityChannels'
import { Reveal } from '../components/Reveal'
import { BRAND } from '../data/site'

const BEFORE_YOU_WRITE = [
  'Membership questions — FAQ first.',
  'Mentorship intake — message any social.',
  'Site issues — tell us, we fix fast.',
]

export function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello where we actually are."
        body="No form, no inbox. Every conversation happens on Facebook, Instagram, or TikTok — send a message and a steward replies."
        meta={
          <>
            <span>{BRAND.location}</span>
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
                Facebook is fastest for longer questions. Instagram and TikTok for quick hellos.
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
                <h2 className="panel__title">Contact us</h2>
              </div>
              <div className="panel__body">
                <ul className="card__list">
                  <li className="card__list-item">
                    <span className="contact-item__icon" aria-hidden="true">
                      <Mail size={16} />
                    </span>
                    <div>
                      <span className="small strong">CEO</span>
                      <span className="small muted" style={{ marginLeft: 'var(--sp-2)' }}>
                        morallosroberto96@gmail.com
                      </span>
                    </div>
                  </li>
                  <li className="card__list-item">
                    <span className="contact-item__icon" aria-hidden="true">
                      <Mail size={16} />
                    </span>
                    <div>
                      <span className="small strong">Member support</span>
                      <span className="small muted" style={{ marginLeft: 'var(--sp-2)' }}>
                        marketstewards@gmail.com
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Before you write</h2>
              </div>
              <div className="panel__body">
                <ul className="card__list">
                  {BEFORE_YOU_WRITE.map((item) => (
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
          Market Stewards provides educational resources only. We do not manage money or provide
          personalised investment advice.
        </p>
      </Section>
    </>
  )
}
