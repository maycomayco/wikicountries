import { GREETINGS } from '@/lib/constants'

type Props = {
  emoji: string
  selectedCountry: { isoCode: string }
}

export default function Greeting({ emoji, selectedCountry }: Props) {
  const greeting = GREETINGS[selectedCountry.isoCode]

  return <p className="text-lg text-neutral-700">{`${greeting} ${emoji}`}</p>
}
