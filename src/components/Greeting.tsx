import { GREETINGS } from "@/lib/constants";

type Props = {
  emoji: string;
  selectedCountry: { isoCode: string };
};

export default function Greeting({ emoji, selectedCountry }: Props) {
  return (
    <p className="text-lg text-neutral-700">{`${
      GREETINGS[selectedCountry.isoCode]
    } ${emoji}`}</p>
  );
}
