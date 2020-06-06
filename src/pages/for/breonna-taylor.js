import React from "react"

import JusticeFor from "../../screens/JusticeFor"
import { emailGenerator, name, offenders } from "../../templates/BreonnaTaylor"

export default () => (
  <JusticeFor
    emailGenerator={emailGenerator}
    name={name}
    offenders={offenders}
  />
)
