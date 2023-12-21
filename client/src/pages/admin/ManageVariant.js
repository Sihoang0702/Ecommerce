import { apiDeleteVariants, apiGetVariants } from "apis/product";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ManageUpdateVariants from "./ManageUpdateVariants";
const ManageVariant = () => {
  const { pid, title } = useParams();
  const [variants, setVariants] = useState([]);
  const [updateVariant, setUpdateVariant] = useState(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    async function fetchVariants() {
      try {
        const response = await apiGetVariants(pid);
        if (response.success) {
          setVariants(response.data);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }
    fetchVariants();
  }, [pid, update]);
  const handleDeleteVariant = async (pid, variantId) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm("Are you sure you want to delete")) return;
      await apiDeleteVariants(pid, variantId);
      setUpdate(!update);
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <div className="relative">
      {updateVariant && (
        <div className="absolute inset-0 bg-white min-h-screen">
          <ManageUpdateVariants
            data={updateVariant}
            oldThumbnail={updateVariant.thumbnail}
            setData={setUpdateVariant}
          ></ManageUpdateVariants>
        </div>
      )}
      <div className="p-3 h-[75px] font-semibold ">
        <h1 className="text-3xl">Variant of : {title || ""}</h1>
      </div>

      <table className="table-auto text-left w-full min-h-[50px] p-3">
        <thead className="font-bold bg-gray-700 text-white text-sm border border-white ">
          <tr>
            <th className="px-3 py-2">#</th>
            <th className="px-3 py-2">Thumbnail</th>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Price</th>
            <th className="px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {variants?.map((el, index) => (
            <tr className="border border-gray-500" key={el?._id}>
              <td className="px-2">{index + 1}</td>
              <td className="p-2">
                <img src={el?.thumbnail} className="w-20 h-20 my-auto object-cover" alt="" />
              </td>
              <td className="py-2 px-4">{el?.title || ""}</td>
              <td className="py-2 px-4">{el?.price || ""}</td>
              <td>
                <div className="flex items-center  justify-center gap-3 text-base mr-1 text-blue-500">
                  <button onClick={() => setUpdateVariant(el)}>Update</button>
                  <button onClick={() => handleDeleteVariant(el?.productId, el?._id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVariant;
