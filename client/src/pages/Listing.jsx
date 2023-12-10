import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // State to manage the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

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
        console.log(data);
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
          <div className={`relative h-56 overflow-hidden md:h-carousel`}>
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
    </div>
  );
}

export default Listing;
