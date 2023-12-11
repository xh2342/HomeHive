/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [broker, setBroker] = useState(null);
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/get/${listing.userRef}`);
        const data = await res.json();
        setBroker(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [listing.userRef]);

  return (
    <div className="flex flex-col items-center my-10">
      {broker && (
        <div className="flex flex-col gap-3">
          <p className="block mx-auto">
            Contact <span className="font-semibold">{broker.username}</span> for
            <span className="capitalize font-semibold"> {listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={handleMessageChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg bg-white message-input"
          />
          <Link
            to={`mailto:${broker.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="border p-3 rounded-lg w-36 text-center hover:bg-slate-10 block mx-auto"
          >
            send message
          </Link>
        </div>
      )}
    </div>
  );
}
