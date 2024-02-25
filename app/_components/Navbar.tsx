"use client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const formRef = useRef<HTMLFormElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    query.length === 0
      ? router.replace(pathName)
      : router.push(`?query=${query}`);
  };

  const getHeaderClasses = () => {
    return `font-medium text-white ${isSticky && "sticky top-0 w-full"}`;
  };

  useEffect(() => {
    const form = formRef.current;
    const query = searchParams.get("query");

    if (form === null || query === null) {
      return;
    }

    const input = form.elements.namedItem("search") as HTMLInputElement;
    input.value = query;
  });

  useEffect(() => {
    const handleScroll = () => {
      const blackHeader = headerRef.current as HTMLElement;
      const { bottom } = blackHeader.getBoundingClientRect();
      setIsSticky(bottom <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <header ref={headerRef} className="font-medium text-white black-header">
        <h1 className="bg-black p-4 text-4xl">George FE test</h1>
      </header>
      <header className={getHeaderClasses()}>
        <form
          ref={formRef}
          className="bg-stone-500 px-4 py-2 flex gap-4 items-center"
        >
          <label htmlFor="search" className="text-xl">
            Search
          </label>
          <input
            id="search"
            name="search"
            type="text"
            className="max-w-36 max-h-6 outline-none border border-black text-black border-2 indent-0.5"
            onChange={onSearchChange}
          />
        </form>
      </header>
    </>
  );
}
