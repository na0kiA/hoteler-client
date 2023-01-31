import { createReview } from "lib/reviews";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { PostReviewParams, ReviewEditParams } from "types/types";

const PostReviewForm = ({ id }: any) => {
  const [invalidTitle, setInvalidTitle] = useState("");
  const [invalidContent, setInvalidContent] = useState("");
  const [invalidRating, setInvalidRating] = useState("");
  const router = useRouter();
  const [editReviewRating, setEditReviewRating] = useState<number>(0);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      five_star_rate: 0,
    },
  });
  const { dirtyFields } = useFormState({
    control,
  });

  const onSubmit = async (data: PostReviewParams) => {
    try {
      const res = await createReview(id, data);
      if (res.status === 200) {
        router.reload();
      }
    } catch (error: any) {
      console.log(error);
      setInvalidTitle(error.response.data.title);
      setInvalidContent(error.response.data.content);
      setInvalidRating(error.response.data.five_star_rate);
    }
  };

  const handleRating = (rate: number) => {
    setEditReviewRating(rate);
    setValue("five_star_rate", rate);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-sm">タイトル</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-sm md:w-2/3"
          {...register("title", {
            required: "必須項目です",
          })}
        />
        {errors.title && errors.title.message}
      </div>
      {invalidTitle && (
        <p className="text-red-600 text-sm md:text-sm mt-2">{invalidTitle}</p>
      )}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-sm">内容</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full max-h-full text-xs md:w-2/3"
          {...register("content", {
            required: "内容は10文字以上入力してください",
          })}
        ></textarea>
        {errors.title && errors.title.message}
      </div>
      {invalidContent && (
        <p className="text-red-600 text-sm md:text-sm mt-2">{invalidContent}</p>
      )}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-sm">5つ星評価</span>
        </label>
        <span>
          <Rating
            initialValue={editReviewRating}
            transition
            size={25}
            allowTitleTag={false}
            onClick={handleRating}
          />
          <span className="align-middle text-lg">({editReviewRating})</span>
        </span>
        {errors.title && errors.title.message}
      </div>
      {invalidRating && (
        <p className="text-red-600 text-sm md:text-sm mt-2">{invalidRating}</p>
      )}
      <button
        className="btn btn-primary btn-wide m-auto mt-3 text-base"
        type="submit"
        onClick={(e) => {
          setInvalidTitle("");
          setInvalidContent("");
          setInvalidRating("");
        }}
        disabled={!(dirtyFields.title && dirtyFields.content)}
      >
        口コミを投稿
      </button>
    </form>
  );
};

export default PostReviewForm;
