import { FaGithub } from "react-icons/fa";

const Footer = () => {

  return (
    <footer className="bg-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between w-full">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xs leading-5 text-gray-400 mb-2 md:mb-0">
              © {new Date().getFullYear()} <b>36</b>. All rights
              reserved.
              <br />
              Made by Nischal Kotamraju.
              <br />
            </p>{" "}            
            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-emerald-100 text-emerald-800 ring-emerald-800/20 mt-2">
              v0.1
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/nischalkotamraju"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaGithub className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
