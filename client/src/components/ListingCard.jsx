/* eslint-disable react/prop-types */

import { FaBath, FaBed } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <div className="w-full sm:w-[330px] h-full border rounded-lg hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/listing/${listing._id}`}>
        <div className="h-[240px] w-full overflow-hidden">
          <img
            src={listing.imageURLs[0]}
            alt="listing cover"
            className="hover:scale-125 transition-scale duration-1000 h-[320px] sm:h-[240px] w-full object-cover overflow-hidden"
          />
        </div>
        <div className="flex flex-col p-4">
          <h1 className="truncate text-lg font-meidum">{listing.name}</h1>
          <div className="flex text-lg font-semibold">
            {listing.offer ? (
              <div className="flex gap-2">
                <p className="line-through font-light italic text-md">
                  ${listing.regularPrice.toLocaleString()}
                  {listing.type === "rent" && "/month"}
                </p>
                <p>
                  ${listing.discountPrice.toLocaleString()}
                  {listing.type === "rent" && "/month"}
                </p>
              </div>
            ) : (
              <p>
                ${listing.regularPrice.toLocaleString()}
                {listing.type === "rent" && "/month"}
              </p>
            )}
          </div>
          <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 my-2">
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
              <BsFillHouseDoorFill className="text-lg" />
              {listing.type === "rent" ? "for Rent" : "for Sale"}
            </li>
          </ul>
          <p className="truncate text-sm font-light">{listing.address}</p>
        </div>
      </Link>
    </div>
  );
}
