import React from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTweet } from "../store/Slices/tweetSlice";
import { cleanUpComments, createAComment, getVideoComments } from "../store/Slices/commentSlice";

function TweetAndComment({ tweet, comment, videoId }) {
    const { register, handleSubmit, setValue } = useForm();
    const dispatch = useDispatch();

    const sendContent = async(data) => {
        if (data) {
            if (tweet) {
                dispatch(createTweet(data));
            } else if (comment) {
                await dispatch( createAComment({ content: data.content, videoId }));
                dispatch(cleanUpComments());
                dispatch(getVideoComments({ videoId }));
            }
            setValue("content", "");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(sendContent)}
                className="sm:p-5 p-3 w-full relative"
            >
                <textarea
                    placeholder={`${tweet ? "Write a tweet" : "Add a Comment"}`}
                    className="p-2 text-sm pr-16 focus:border-white text-white border border-slate-500 bg-richblack-800 outline-none w-full"
                    {...register("content", { required: true })}
                    rows={2}
                />
                <Button
                    type="submit"
                    className="bg-purple px-2 py-1 text-black hover:scale-110 transition-all ease-in absolute sm:bottom-8 sm:right-8 bottom-8 right-4 text-xs sm:text-base"
                >
                    Send
                </Button>
            </form>
        </>
    );
}

export default TweetAndComment;
