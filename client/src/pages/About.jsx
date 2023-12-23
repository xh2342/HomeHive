export default function About() {
  return (
    <div className="flex flex-col items-center md:flex-row">
      <div className="w-full h-screen md:w-1/2 overflow-hidden items-center justify-center flex-1">
        <img
          src="https://raw.githubusercontent.com/xh2342/HomeHive/main/client/public/about-page-cover.avif"
          alt="cover image"
          className="w-full h-full overflow-hidden max-w-full max-h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="mx-36">
          <h1 className="text-3xl font-bold mb-4 text-slate-800">
            About Home Hive
          </h1>
          <p className="mb-4 text-slate-700">
            {`Welcome to our dedicated platform for single-family homes! At Home Hive, we're passionate about helping individuals and families find
        their perfect abode. Our mission is to simplify your home search journey
        by providing a curated collection of single-family properties tailored
        to your needs. `}
          </p>
          <p className="mb-4 text-slate-700">
            {`With a user-friendly interface and detailed property
        listings, we strive to make your experience seamless and enjoyable.
        Whether you're a first-time homebuyer, seeking a larger space, or
        downsizing, we're here to guide you every step of the way. Discover the
        comfort, charm, and potential of single-family living with HomeHive.`}
          </p>
        </div>
      </div>
    </div>
  );
}
