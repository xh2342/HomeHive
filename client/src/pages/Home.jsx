/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle moving to the previous slide
  const goToPreviousSlide = () => {
    const prevSlide =
      currentSlide === 0 ? listings.length - 1 : currentSlide - 1;
    setCurrentSlide(prevSlide);
  };

  // Function to handle moving to the next slide
  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % listings.length;
    setCurrentSlide(nextSlide);
  };

  // Function to handle moving to the selected slide
  const goToSlide = (slide) => {
    setCurrentSlide(slide);
  };

  useEffect(() => {
    setLoading(true);
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listing/getListings?limit=9");
        const data = await res.json();
        setListings(data);
        fetchOfferListings();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/getListings?offer=true&limit=3");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/getListings?type=rent&limit=3");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/getListings?type=sale&limit=3");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      {/* swiper */}
      {/* {!loading && listings && (
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          <div className={`relative h-56 overflow-auto md:h-carousel`}>
            {listings.map((listing, index) => (
              <div
                className={`transition-opacity duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 absolute top-0 left-0 w-full h-full"
                }`}
                data-carousel-item
                key={index}
              >
                <img
                  src={listing.imageURLs[0]}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {listings.map((_, index) => (
              <button
                key={index}
                type="button"
                className="w-3 h-3 rounded-full"
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index}`}
                data-carousel-slide-to={index}
                onClick={() => goToSlide(index)}
              >
                <GoDotFill
                  className={`text-xl ${
                    currentSlide === index && "text-white"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-non"
            data-carousel-prev
            onClick={goToPreviousSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-white rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
            onClick={goToNextSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-white rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      )} */}

      <div className="flex flex-col md:flex-row items-center">
        <div className="h-screen w-full md:w-1/2 overflow-hidden ">
          <img
            src="https://raw.githubusercontent.com/xh2342/HomeHive/main/client/public/cover2.jpg"
            alt="cover photo"
            className="h-full w-full object-cover"
          />
        </div>
        {/* introduction */}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Unlock Your Dream Home,
            <br />
            Just One Click Away!
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            {`Discover your perfect
          single-family home at HomeHive!`}{" "}
            <br />
            {` Simplifying your search for
          comfort and charm. Lets find your dream home together!`}
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          >
            Lets get started...
          </Link>
        </div>
      </div>

      {/* listing results for offer, sale and rent */}
      {/* <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            {offerListings && offerListings.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-slate-600">
                    Recent offers
                  </h2>
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/search?offer=true"}
                  >
                    Show more offers
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div> */}
    </div>
  );
}
