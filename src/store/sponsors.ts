import { example } from './sponsor/example'
import { siosTechnology } from './sponsor/sios-technology'
import { neutrino } from './sponsor/neutrino'
import { microsoft } from './sponsor/microsoft'
import { cryptobowl } from './sponsor/cryptobowl'
import { narinarita1980 } from './sponsor/narinarita1980'

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
export type SponsorTier = 10 | 20 | 30 | 50
export interface Supporter<T extends SponsorTier> {
	readonly id: string
	readonly start_date: Date
	readonly expiry_date: Date
	readonly name: string
	readonly link: string
	readonly image: SponsorImage
	readonly tier: T
	readonly unlisted?: boolean
}
export interface PersonalSponsor extends Supporter<50> {}
export interface Sponsor extends Supporter<Exclude<SponsorTier, 50>> {
	readonly messages: SponsorMessages
}
export type Sponsors = ReadonlyArray<Sponsor | PersonalSponsor>

const s: Sponsors = [
	siosTechnology,
	neutrino,
	microsoft,
	cryptobowl,
	narinarita1980
]

export const sponsors: Sponsors = [...s, ...[example]]
