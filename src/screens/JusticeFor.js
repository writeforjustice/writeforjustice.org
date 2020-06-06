import React from "react"
import { Helmet } from "react-helmet"

const mailtoApp = ({ body, emailAddresses, subject }) =>
  `mailto:${emailAddresses}?subject=${encodeURI(subject)}&body=${encodeURI(body)}`

const mailtoGmail = ({ body, emailAddresses, subject }) =>
  `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${emailAddresses}&su=${encodeURI(subject)}&body=${encodeURI(body)}`

const newlineToBr = str => str.split(`\n`).map((chunk, index) => (
  <span key={index}>
    {chunk}
    <br/>
  </span>
))

export default function JusticeFor(props) {
  const { emailGenerator, name, offenders } = props

  // Configure names and comma separated email addresses

  let offenderNames = ``
  let offenderEmailAddresses = ``

  offenders.forEach((offender, index) => {
    const { displayName, emailAddress } = offender

    if (offenders.length === 1 || index === offenders.length - 1) {
      offenderNames = `${offenderNames}${displayName}`
      offenderEmailAddresses = `${offenderEmailAddresses}${emailAddress}`
    }
    else if (index === offenders.length - 2) {
      offenderNames = `${offenderNames}${displayName}, and `
      offenderEmailAddresses = `${offenderEmailAddresses}${emailAddress}, `
    }
    else {
      offenderNames = `${offenderNames}${displayName}, `
      offenderEmailAddresses = `${offenderEmailAddresses}${emailAddress}, `
    }
  })

  // States that represent visitor progress

  const Progress = { Form: `Form`, Preview: `Preview` }
  const [progress, setProgress] = React.useState(Progress.Form)

  // Sender information updated as they fill out the form

  const [sender, setSender] = React.useState({ firstName: ``, location: `` })
  
  // Email is dynamically generated as sender provides personalized information

  const [email, setEmail] = React.useState(``)

  React.useEffect(() =>
    setEmail(emailGenerator({ senderFirstName: sender.firstName, senderLocation: sender.location }))
  , [emailGenerator, sender])

  const onSubmit = event => { event.preventDefault(); setProgress(Progress.Preview) }

  const onFirstNameChange = event => setSender({ ...sender, firstName: event.target.value })

  const onLocationChange = event => setSender({ ...sender, location: event.target.value })

  return (
    <div style={styles.container}>
      <Helmet>
          <title>Justice for {name}</title>
      </Helmet>
      <header style={styles.header}>
        <a
          href="https://blacklivesmatters.carrd.co/"
          style={styles.headerHashtag}
        >
          #blacklivesmatter
        </a>
      </header>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Justice for {name}
        </h1>
        <p style={styles.heroSubtitle}>
          Let {offenderNames} know that you demand justice for the murder of {name}.
        </p>
      </div>
      <div style={styles.divider} />
      {
        progress === Progress.Form ? (
          <div style={styles.formWrapper}>
            <p style={styles.formDescription}>
              <strong>Fill out the form</strong> below to prepare your personalized email template. <span style={styles.italic}>This website will never store or save your responses.</span>
            </p>
            <form
              onSubmit={onSubmit}
              style={styles.form}
            >
              <label
                htmlFor="firstName"
                style={styles.formLabel}
              >
                First Name:
              </label>
              <input
                aria-label="firstName"
                onChange={onFirstNameChange}
                placeholder="First Name"
                required
                style={styles.formInput}
                type="text"
              />
              <label
                htmlFor="location"
                style={styles.formLabel}
              >
                City, State (Optional):
              </label>
              <input
                aria-label="location"
                onChange={onLocationChange}
                placeholder="Ex: New York, NY"
                style={styles.formInput}
                type="text"
              />
              <div style={styles.formButtonGroup}>
                <button
                  style={styles.formButton}
                  type="submit"
                >
                  Prep My Email
                </button>
              </div>
            </form>
          </div>
        ) : null
      }
      {
        progress === Progress.Preview ? (
          <div style={styles.previewWrapper}>
            <div style={styles.preview}>
              <div style={styles.previewHeadingGroup}>
                <span style={styles.previewHeading}><strong>Subject:</strong> {email.subject}</span>
                <span style={styles.previewHeading}><strong>To:</strong> {offenderEmailAddresses}</span>
              </div>
              <div style={styles.previewBody}>
                {newlineToBr(email.body)}
              </div>
            </div>
            <div style={styles.previewSendGroup}>
              <a
                href={mailtoGmail({ emailAddresses: offenderEmailAddresses, subject: email.subject, body: email.body })}
                style={styles.previewSend}
              >
                Open In Gmail
              </a>
              <a
                href={mailtoApp({ emailAddresses: offenderEmailAddresses, subject: email.subject, body: email.body })}
                style={styles.previewSend}
              >
                Open In Default App
              </a>
            </div>
          </div>
        ) : null
      }
      <div style={styles.divider} />
      <div style={styles.footer}>
        <p style={styles.footerBlurb}>
          In solidarity with the BLM movement and those fighting for justice on the frontlines.
        </p>
        <p style={styles.footerBlurb}>
          This code is <a href="https://github.com/writeforjustice/writeforjustice.org">open source</a>.
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    boxSizing: `border-box`,
    width: `100%`,
    maxWidth: 640,
    margin: `0 auto`,
    padding: `0 24px`,
    fontFamily: `sans-serif`,
    color: `black`,
  },
  italic: {
    fontStyle: `italic`,
  },
  header: {
    display: `flex`,
    alignItems: `center`,
    height: 96,
  },
  headerHashtag: {
    fontWeight: `bold`,
    textDecoration: `none`,
    color: `black`,
  },
  hero: {},
  heroTitle: {
    margin: `0 0 24px`,
    fontFamily: `serif`,
    fontSize: 37,
    lineHeight: `40px`,
  },
  heroSubtitle: {
    margin: 0,
    lineHeight: `24px`,
  },
  divider: {
    height: 1,
    width: 64,
    margin: `24px 0`,
    backgroundColor: `lightgray`,
  },
  formWrapper: {},
  formDescription: {
    margin: `0 0 24px`,
    lineHeight: `24px`,
  },
  form: {
    display: `flex`,
    flexDirection: `column`,
  },
  formLabel: {
    marginBottom: 8,
    lineHeight: `24px`,
  },
  formInput: {
    height: 40,
    maxWidth: 320,
    marginBottom: 16,
    padding: `0 16px`,
    fontSize: `inherit`,
  },
  formButtonGroup: {
    alignSelf: `flex-start`,
    display: `flex`,
    alignItems: `center`,
  },
  formButton: {
    boxSizing: `border-box`,
    height: 40,
    margin: `16px 0`,
    padding: `0 16px`,
    border: `0.5px solid gray`,
    borderRadius: 2,
    backgroundColor: `whitesmoke`,
    fontSize: `inherit`,
  },
  previewWrapper: {
    display: `flex`,
    flexDirection: `column`,
  },
  preview: {
    marginBottom: 24,
    padding: 16,
    border: `1px solid lightgray`,
  },
  previewHeadingGroup: {
    display: `flex`,
    flexDirection: `column`,
    marginBottom: 16,
  },
  previewHeading: {
    lineHeight: `24px`,
  },
  previewBody: {
    lineHeight: `20px`,
  },
  previewSendGroup: {
    alignSelf: `flex-start`,
    display: `flex`,
    alignItems: `center`,
    flexWrap: `wrap`,
  },
  previewSend: {
    boxSizing: `border-box`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    height: 40,
    margin: `0 8px 8px 0`,
    padding: `0 16px`,
    border: `0.5px solid gray`,
    borderRadius: 2,
    textDecoration: `none`,
    backgroundColor: `whitesmoke`,
    color: `inherit`,
  },
  footer: {
    padding: `0 0 32px`,
  },
  footerBlurb: {
    fontSize: 12,
    lineHeight: `16px`,
    color: `gray`,
  },
}
