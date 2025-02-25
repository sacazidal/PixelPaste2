import Link from "next/link";
import ActionHeader from "./ActionHeader";
import Image from "next/image";

const Header = () => {
  return (
    <header className="py-4 mb-4">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 md:px-2">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground dark:bg-white bg-neutral-800">
              <Image
                src={"/PixelLauncher.webp"}
                alt="P"
                width={20}
                height={20}
                className="filter invert dark:invert-0"
                priority
              />
            </div>
            PixelPaste
          </Link>
        </div>
        <ActionHeader />
      </div>
    </header>
  );
};
export default Header;
