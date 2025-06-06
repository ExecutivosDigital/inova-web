"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import { SendHorizontal } from "lucide-react";
const CommentFooter = () => {
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto"; // Reset the height to auto to adjust
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
  };

  return (
    <>
      <div className="flex w-full items-end gap-4 px-4">
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="relative flex gap-1">
              <textarea
                value={message}
                placeholder="Type your message..."
                className="bg-default-100 h-10 flex-1 rounded-xl p-1 px-3 pt-2 break-words"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(
                      e as unknown as React.FormEvent<HTMLFormElement>,
                    );
                  }
                }}
                style={{
                  minHeight: "40px",
                  maxHeight: "120px",
                  overflowY: "auto",
                  resize: "none",
                }}
              />

              <Button
                type="submit"
                className="bg-default-100 hover:bg-default-100 h-[42px] w-[42px] self-end rounded-full p-0"
              >
                <SendHorizontal className="text-primary h-8 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentFooter;
