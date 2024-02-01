"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { type Country } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import qs from "query-string";

type Props = {
  countries: Country[];
};

export default function SelectCountry({ countries }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramCountry = searchParams.get("country");
  const selectedCountry = paramCountry
    ? countries.find((c) => c.isoCode === paramCountry)
    : undefined;

  const handleOnChange = (country: Country) => {
    handleQueryParams(country.isoCode);
  };

  const handleQueryParams = (isoCode: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "country",
      value: isoCode,
    });

    router.push(newUrl, { scroll: false });
  };

  // TODO: order countries by name
  return (
    <div className="top-16 w-72">
      <Listbox value={selectedCountry} onChange={handleOnChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-red-500">
              {selectedCountry?.name || "-- Selecciona un pais --"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {countries.map((country) => (
                <Listbox.Option
                  key={country.isoCode}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={country}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {country.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
