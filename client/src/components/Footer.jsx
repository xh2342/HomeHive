export default function Footer() {
  return (
    <footer className="bg-white shadow border fixed px-0 mx-0 bottom-0 w-full">
      <div className="w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {`© 2023 Created by `}
          <a
            href="https://www.linkedin.com/in/xiao-huang-b4671427a/"
            className="hover:underline font-semibold"
          >
            {`Xiaofei Huang. `}
          </a>
          All Rights Reserved.
        </span>
        {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul> */}
      </div>
    </footer>
  );
}
