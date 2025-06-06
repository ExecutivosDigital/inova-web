import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icon } from "@iconify/react";
import { Check } from "lucide-react";
import CommentFooter from "./comment-footer";

const Comments = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="mb-0 flex-none border-none px-2 py-3.5">
        <div className="flex items-center gap-2">
          <Icon
            icon="heroicons:chat-bubble-bottom-center"
            className="text-default-500 h-4 w-4"
          />
          <div className="text-default-800 text-base font-medium">
            totalComments
            <span className="ml-1 capitalize">content</span>
          </div>
        </div>
      </div>
      <div className="flex-1 pb-0">
        <div className="before:bg-default-300 relative -translate-y-1/2 text-center before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-full">
          <span className="bg-card relative px-3">Today</span>
        </div>
        {/* jodi comments thake */}
        <div className={className}>
          <ScrollArea className="h-full">
            <div className="space-y-3.5 px-5">
              <div className="flex gap-2">
                <div className="flex-none">
                  <Avatar>
                    <AvatarImage src="/public/images/avatar/avatar-1.jpg" />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-default-900 text-sm font-medium capitalize">
                      comment.name
                    </div>
                    <div className="text-default-400 text-xs">comment.date</div>
                    <div className="text-default-400 text-xs">
                      <Check className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="text-default-600 mt-1 font-medium">
                    comment.text
                  </div>
                </div>
              </div>
              {/* <div>
                  <div className="flex items-center gap-2 hover:bg-default-50 rounded-md group py-3 px-2">
                    <div>
                      <span className="h-10 w-10 rounded-full bg-default-50 group-hover:bg-default-100 block"></span>
                    </div>
                    <div className="text-sm font-medium text-default-500">
                      Don’t let it go unsaid! Post a comment to start a
                      discussion. @Mention someone to notify them.
                    </div>
                  </div>
                </div> */}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex-none">
        <CommentFooter />
      </div>
    </div>
  );
};

export default Comments;
