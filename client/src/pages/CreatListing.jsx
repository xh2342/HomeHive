import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreatListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      // add new urls to the form data
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(urls),
          });
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
          console.log(error);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing.");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} % done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create A Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        {/* parameters */}
        <div className="flex flex-col gap-4 mx-auto flex-1">
          {/* name */}
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            required
          />

          {/* description */}
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />

          {/* address */}
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          {/* checkboxes */}
          <div className="flex flex-wrap gap-6">
            <div className="gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>

            {/* numberic inputs */}
            <div className="flex flex-wrap gap-6">
              {/* number of bedrooms */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min={0}
                  max={20}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>Beds</p>
              </div>

              {/* number of bathrooms */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min={0}
                  max={20}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>Baths</p>
              </div>

              {/* regular price */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>

              {/* discounted price */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* images */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {formData.imageURLs.length > 0 &&
            formData.imageURLs.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center rounded-lg"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-40 h-40 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="border p-3 rounded-lg hover:opacity-75 uppercase text-red-700"
                >
                  delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
