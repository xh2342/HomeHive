import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //   synchronize changes in url to the side bar
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/getListings?${searchQuery}`);
        const data = await res.json();

        setLoading(false);
        setListings(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* query parameters */}
      <div className="flex-col w-1/4 gap-10 py-5 px-10 border md:min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border rounded-lg w-full gap-2">
            <FaSearch className="mx-2" />
            <input
              id="searchTerm"
              type="text"
              placeholder="keyword"
              className="p-3 bg-transparent focus:outline-none"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          {/* type */}
          <div className="my-2 font-light">
            <h2 className="py-3">Type</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="query-checkbox"
                  id="all"
                  onChange={handleChange}
                  checked={sidebarData.type === "all"}
                />
                <label className="text-md font-thin">all</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="query-checkbox"
                  id="sale"
                  onChange={handleChange}
                  checked={sidebarData.type === "sale"}
                />
                <label className="text-md font-thin">sale</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="query-checkbox"
                  id="rent"
                  onChange={handleChange}
                  checked={sidebarData.type === "rent"}
                />
                <label className="text-md font-thin">rent</label>
              </div>
            </div>
            {/* filters */}
            <div className="my-2 font-light">
              <h2 className="py-3">Filters</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    id="offer"
                    type="checkbox"
                    className="query-checkbox"
                    onChange={handleChange}
                    checked={sidebarData.offer}
                  />
                  <label className="text-md font-thin">offer</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="query-checkbox"
                    id="parking"
                    onChange={handleChange}
                    checked={sidebarData.parking}
                  />
                  <label className="text-md font-thin">parking Lot</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="query-checkbox"
                    id="furnished"
                    onChange={handleChange}
                    checked={sidebarData.furnished}
                  />
                  <label className="text-md font-thin">furnished</label>
                </div>
              </div>
            </div>
          </div>
          {/* sort */}
          <div className="my-2 font-light">
            <h2 className="py-3">Sort</h2>
            <select
              className="border p-2 rounded-lg hover:bg-slate-100 text-sm"
              defaultValue={"created_at_desc"}
              id="sort_order"
              onChange={handleChange}
            >
              <option value="regularPrice_asc" className="">
                Price: low to high
              </option>
              <option value="regularPrice_desc">Price: high to low</option>
              <option value="createdAt_desc">Date: old to new</option>
              <option value="createdAt_desc">Date: new to old</option>
            </select>
          </div>
          {/* submit button */}
          <div className="items-center">
            <button className="border py-2 px-6 rounded-lg hover:bg-slate-100 search-button mt-10 font-light mx-auto block">
              search
            </button>
          </div>
        </form>
      </div>
      {/* listings */}
      <div className="flex flex-col items-center flex-1">
        <span className="py-5 text-lg font-light capitalize">
          resulting listings
        </span>
      </div>
    </div>
  );
}
