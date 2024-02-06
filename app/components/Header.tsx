import Image from "next/image";
import { TwitterLogo, GithubLogo } from "../assets/icons";

export const Header = () => {
  return (
    <div className="flex items-center p-2 bg-black bg-opacity-25 backdrop-blur shadow-md rounded-b-md">
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
