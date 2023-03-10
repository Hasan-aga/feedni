import { Grid, Tooltip } from "@nextui-org/react";
import Bookmark from "./icons/bookmark";
import Checkmark from "./icons/checkmark";
import useError from "@/hooks/useError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useMarkAsRead from "@/hooks/useMarkAsRead";

export default function CardButtons({ article, offset, feed }) {
  const queryClient = useQueryClient();

  const markReadMutation = useMarkAsRead(article, offset, feed);

  async function bookmarkArticle(articleID) {
    var requestOptions = {
      method: article.bookmarkid ? "DELETE" : "POST",
      redirect: "follow",
      cerendtials: "include",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/bookmarks?articleid=${articleID}`,
      requestOptions
    );

    if (!response.ok) {
      const result = await response.text();
      throw new Error(result);
    }
    return response.json();
  }

  // add remove to/from bookmarks
  const bookmarkMutation = useMutation({
    mutationFn: () => {
      return bookmarkArticle(article.articleid);
    },
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["articles"], offset, feed });
    },
  });

  return (
    <Grid xs={12} justify="flex-end">
      <Tooltip
        content={article.bookmarkid ? "Remove bookmark" : "Bookmark"}
        rounded
        color="primary"
      >
        <Bookmark
          fill={article.bookmarkid}
          handler={(e) => {
            e.stopPropagation();
            bookmarkMutation.mutate(e);
          }}
        />
      </Tooltip>
      <Tooltip
        content={article.readid ? "Mark as unread" : "Mark as read"}
        rounded
        color="primary"
      >
        <Checkmark
          handler={(e) => {
            e.stopPropagation();
            markReadMutation.mutate();
          }}
        />
      </Tooltip>
    </Grid>
  );
}
