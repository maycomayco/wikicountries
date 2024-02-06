import { GREETINGS } from "@/lib/constants";

type Props = {
  emoji: string;
  selectedCountry: { isoCode: string };
};

export default function Greeting({ emoji, selectedCountry }: Props) {
  return <p>{`${GREETINGS[selectedCountry.isoCode]} ${emoji}`}</p>;
}
