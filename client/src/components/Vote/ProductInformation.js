import { productInformationTabs } from "utils/constans";
import { renderStartNumber } from "utils/heplers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiRatings } from "apis/product";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import Modal from "react-modal";
import path from "utils/path";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Vote from "./Vote";
import VoteOptions from "./VoteOptions";
import Comment from "./Comment";

const ProductInformation = ({ totalRatings = 0, ratings, nameProduct, pid }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isVote, setIsVote] = useState(false);
  const { isAuthLogin } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleOnClick = () => {
    if (isAuthLogin) {
      setIsVote(true);
    } else {
      Swal.fire({
        text: "Đăng nhập để có thể bình luận",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Message",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
      return;
    }
  };
  const handleRatings = async ({ comment, score }) => {
    try {
      if (!comment || !score) {
        toast.error("Đánh giá sản phẩm thất bại");
        return;
      }
      await apiRatings({ comment, star: score, pid, updatedAt: Date.now() });
      toast.success("Đánh giá thành công");
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="w-full">
      {isVote && (
        <div onClick={() => setIsVote(false)}>
          <Modal
            overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center "
            isOpen={isVote}
            className={"absolute"}
          >
            <VoteOptions handleRatings={handleRatings} nameProduct={nameProduct}></VoteOptions>
          </Modal>
        </div>
      )}
      <div className="flex items-center gap-x-1 bottom-[-1px] ">
        {productInformationTabs.map((tab) => (
          <span
            key={tab.id}
            className={`uppercase cursor-pointer p-2 bg-gray-200 px-4 border ${
              activeTab === tab.id ? "bg-white border-b-0" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </span>
        ))}
      </div>

      <div className="w-full p-4 text-sm text-gray-600 border ">
        {productInformationTabs.some((tab) => tab.id === activeTab) &&
          productInformationTabs.find((tab) => tab.id === activeTab)?.content}
      </div>
      <div className=" mt-10 ">
        <div className="grid grid-cols-[400px_780px] gap-x-4 border p-5 rounded">
          <div className="flex items-center flex-col justify-center border border-red-500 rounded">
            <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
            <span className="flex">{renderStartNumber(totalRatings)}</span>
            <span className="text-sm text-gray-500">{ratings?.length} Reviewer</span>
          </div>
          <div className="flex flex-col w-full  gap-y-2">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el, index) => (
                <Vote
                  key={index + 1}
                  numberStar={el + 1}
                  ratingTotal={ratings?.length}
                  ratings={ratings?.filter((rating) => rating.star === el + 1)?.length}
                ></Vote>
              ))}
          </div>
        </div>
        <div className="flex items-center flex-col gap-y-2 py-4">
          <span className="text-sm">Bạn có muốn đánh giá sản phẩm ?</span>
          <Button
            onClick={() => {
              handleOnClick();
            }}
            className="max-w-[200px] rounded"
          >
            Vote now !!
          </Button>
        </div>
        <div className="mt-5">
          {ratings?.length > 0 &&
            ratings?.map((el) => (
              <Comment
                key={el?._id}
                star={el?.star}
                updatedAt={el?.updatedAt}
                content={el?.comment}
                name={el?.postedBy?.lastName}
              ></Comment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
