import Image from "next/image";
import { TwitterLogo, GithubLogo } from "../app/assets/icons";

export const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full bg-black/50 z-10 flex items-center p-2 rounded-b-lg">
      <Image
        src="/icon.png"
        alt="Saori Makishima"
        width="30"
        height="30"
        className="mr-4 rounded-full"
      />
      <div className="text-xl  text-white">Saori Makishima</div>
      <a
        href="https://twitter.com/saori_xbt"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto p-2"
      >
        <TwitterLogo color="white" size="24" />
      </a>
      <a
        href="https://github.com/saori-eth"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2"
      >
        <GithubLogo color="white" size="24" />
      </a>
    </div>
  );
};
