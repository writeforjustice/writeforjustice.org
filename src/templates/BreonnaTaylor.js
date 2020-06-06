export const name = `Breonna Taylor`

export const offenders = [
  { displayName: `Greg Fischer, the mayor of Louisville,`, emailAddress: `greg.fischer@louisvilleky.gov` },
]

export const emailGenerator = props => {
const { senderFirstName, senderLocation } = props

let senderLocationTag = ``
if (typeof senderLocation !== `undefined`) senderLocationTag = ` from ${senderLocation}`

const subject = `Justice for Breonna Taylor`

const body =
`Mayor Fischer,

My name is ${senderFirstName}. I’m emailing you today in utter disgust at the brutal actions of the three Louisville Metro Police officers who murdered Breonna Taylor in her apartment on March 13. Like countless others across the country, I am calling for the prosecution of Sergeant Jonathan Mattingly, Brett Hankison, and Myles Cosgrove to the fullest extent of the law. The police must be held to a higher standard and justice must be served. It is imperative that you and your administration unequivocally condemn the actions of these men and take full responsibility for the actions of the officers under your watch.

Black Lives Matter.

Regards,
${senderFirstName}${senderLocationTag}
`

return { body, subject }
}
