import { AiFillStar } from "react-icons/ai";
import { voteList } from "utils/constans";
import logo from "../../assets/logo.png";
import React, { useState } from "react";
import Button from "components/Button/Button";

const VoteOptions = ({ nameProduct, handleRatings }) => {
  const [chooseScore, setChooseScore] = useState(null);
  const [comment, setComment] = useState("");
  const [, setScore] = useState(null);

  return (
    <div
      className="bg-white w-[700px]  flex items-center justify-center flex-col gap-y-4 p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <img className="w-full max-w-[250px] object-cover" src={logo} alt="" />
      <h2 className=" text-center text-sm font-medium">Đánh giá sản phẩm : {nameProduct}</h2>
      <textarea
        className="form-textarea w-full resize-none h-[100px] placeholder:text-sm "
        placeholder="Type something..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p className="text-center my-5">Bạn có hài lòng với sản phẩm</p>
        <div className="flex items-center justify-center gap-x-4">
          {voteList.map((el) => (
            <div
              key={el.text}
              className="flex w-[100px] bg-gray-200 hover:bg-slate-300 cursor-pointer p-4 items-center flex-col rounded select-none"
              onClick={() => {
                setChooseScore(el.id);
                setScore(el.id);
              }}
            >
              {Number(chooseScore) && chooseScore >= el.id ? (
                <AiFillStar color="orange" />
              ) : (
                <AiFillStar color="gray" />
              )}
              <span className="text-sm">{el.text}</span>
            </div>
          ))}
        </div>
        <Button onClick={() => handleRatings({ comment, score: chooseScore })} className="rounded">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default VoteOptions;
