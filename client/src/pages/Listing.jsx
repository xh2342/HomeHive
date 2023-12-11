import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FaBath, FaBed, FaChair, FaHome, FaParking } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  // State to manage the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  // Function to handle moving to the previous slide
  const goToPreviousSlide = () => {
    const prevSlide =
      currentSlide === 0 ? listing.imageURLs.length - 1 : currentSlide - 1;
    setCurrentSlide(prevSlide);
  };

  // Function to handle moving to the next slide
  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % listing.imageURLs.length;
    setCurrentSlide(nextSlide);
  };

  // Function to handle moving to the selected slide
  const goToSlide = (slide) => {
    setCurrentSlide(slide);
  };

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(true);
          return;
        }

        setLoading(false);
        setError(false);
        setListing(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Error getting listing</p>
      )}
      {listing && !loading && !error && (
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          <div className={`relative h-56 overflow-auto md:h-carousel`}>
            {listing.imageURLs.map((url, index) => (
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
                  src={url}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {listing.imageURLs.map((_, index) => (
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
      )}

      {listing && !loading && !error && (
        <div className="mt-10 w-1/2 mx-auto">
          {/* Title and address */}

          <div className="flex items-end gap-3 justify-between">
            <h1 className="text-2xl capitalize text-semibold">
              {listing.name}
            </h1>
            <h2
              className={`text-md capitalize text-slate-100 rounded-md px-2 ${
                listing.type === "rent" ? "bg-green-700" : "bg-red-700"
              }`}
            >
              {listing.type === "rent" ? "for rent" : "for sale"}
            </h2>
          </div>

          <div className="flex items-center gap-1 mt-2">
            <FaHome className="text-md" />
            <h3 className="text-sm capitalize">{listing.address}</h3>
          </div>

          {/* price and offer */}
          <div className="mt-3 flex gap-6 md:gap-12">
            <h3 className="text-sm">
              <span className="font-medium">Regular Price: </span>
              <span className="digit-separator font-light">
                {"$" +
                  listing.regularPrice.toLocaleString() +
                  (listing.type === "rent" ? "/month" : "")}
              </span>
            </h3>
            {listing.offer && (
              <h3 className="text-sm">
                <span className="font-medium">Offer Price: </span>
                <span className="digit-separator font-light">
                  {"$" +
                    listing.discountPrice.toLocaleString() +
                    (listing.type === "rent" ? "/month" : "")}
                </span>
              </h3>
            )}
          </div>

          {/* description */}

          <h3 className="text-lg font-medium capitalize mt-10">
            About the Property
          </h3>

          <p className="font-light text-md gap-5 text-justify mt-3 leading-5 whitespace-pre-wrap">
            {listing.description}
          </p>

          <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 my-5">
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaBed className="text-lg" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaBath className="text-lg" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaParking className="text-lg" />
              {listing.parking ? "Parking spot" : "No Parking"}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaChair className="text-lg" />
              {listing.furnished ? "Furnished" : "Unfurnished"}
            </li>
          </ul>
          {currentUser && listing.userRef !== currentUser._id && !contact && (
            <button
              onClick={() => setContact(true)}
              className="border p-3 rounded-md text-md capitalize my-10 mx-auto block"
            >
              contact broker
            </button>
          )}
          {contact && <Contact listing={listing} />}
        </div>
      )}
    </div>
  );
}

export default Listing;
