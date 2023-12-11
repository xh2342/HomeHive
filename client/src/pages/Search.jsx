import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* query parameters */}
      <div className="flex-col w-1/4 gap-10 py-5 px-10 border md:min-h-screen">
        <form className="flex items-center p-2 border rounded-lg w-full gap-2">
          <FaSearch />
          <input type="text" placeholder="keyword" className="" />
        </form>
        {/* type */}
        <div className="my-2 font-light">
          <h2 className="py-3">Type</h2>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="query-checkbox" id="all" />
              <label className="text-md font-thin">all</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="query-checkbox" id="sale" />
              <label className="text-md font-thin">sale</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="query-checkbox" id="rent" />
              <label className="text-md font-thin">rent</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="query-checkbox" />
              <label className="text-md font-thin">offer</label>
            </div>
          </div>
        </div>
        {/* amenities */}
        <div className="my-2 font-light">
          <h2 className="py-3">Amenities</h2>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="query-checkbox" id="all" />
              <label className="text-md font-thin">parking Lot</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="query-checkbox" id="sale" />
              <label className="text-md font-thin">furnished</label>
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
      </div>
      {/* listings */}
      <div></div>
    </div>
  );
}
