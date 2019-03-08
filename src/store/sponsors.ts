import { example } from './sponsor/example'
import { siosTechnology } from './sponsor/sios-technology'
import { neutrino } from './sponsor/neutrino'
import { microsoft } from './sponsor/microsoft'

interface SponsorVisualControl {
	readonly maxWidth?: number
	readonly margin?: string
}
export interface SponsorImage {
	readonly url: string
	readonly width: number
	readonly height: number
	readonly visualControl?: SponsorVisualControl
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

const s: Sponsors = [siosTechnology, neutrino, microsoft]

export const sponsors: Sponsors = [...s, ...[example]]
