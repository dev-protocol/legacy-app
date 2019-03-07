import { siosTechnology } from './sponsor/sios-technology'
import { example } from './sponsor/example'

interface SponsorImage {
	readonly url: string
	readonly width: number
	readonly height: number
}
export type MessageLocale = 'en' | 'ja'
export interface SponsorMessage {
	readonly locale: MessageLocale
	readonly text: string
}
export type SponsorMessages = ReadonlyArray<SponsorMessage>
export type SponsorTier = 10 | 20 | 30
export interface Sponsor {
	readonly id: string
	readonly start_date: Date
	readonly expiry_date: Date
	readonly name: string
	readonly messages: SponsorMessages
	readonly link: string
	readonly image: SponsorImage
	readonly tier: SponsorTier
	readonly unlisted?: boolean
}
export type Sponsors = ReadonlyArray<Sponsor>

const s: Sponsors = [siosTechnology]

export const sponsors: Sponsors = [...s, ...[example]]
