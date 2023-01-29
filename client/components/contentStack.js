import { useState, useEffect } from "react";
import { Collapse } from "@nextui-org/react";
import Feed from "./feed";

function getFeedsFromCategories(categories) {
  console.log("Categories", categories);
  let totalFeeds = [];
  for (const [category, feeds] of Object.entries(categories)) {
    console.log(`cat ${category}, feed `, feeds);
    totalFeeds.push(...feeds);
  }
  return totalFeeds;
}
export default function ContentStack({ feeds }) {
  return (
    <>
      <Collapse.Group>
        {feeds &&
          getFeedsFromCategories(feeds).map((feed) => <Feed feed={feed} />)}
      </Collapse.Group>
    </>
  );
}
