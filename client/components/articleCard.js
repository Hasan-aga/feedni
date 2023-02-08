import {
  Card,
  Grid,
  Text,
  Button,
  Row,
  Spacer,
  Image,
} from "@nextui-org/react";
import { useEffect, useLayoutEffect, useState } from "react";
import CardButtons from "./cardButtons";

export default function ArticleCard({ article }) {
  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(article.publication_date)
  );

  const [imageLink, setImageLink] = useState();

  async function fetchArticleImage() {
    try {
      if (article.image_link === "default link") {
        console.log("get image");

        const response = await fetch(
          `/api/articles/image?articleid=${article.articleid}`
        );
        const result = await response.json();
        setImageLink(result.imageLink);
      }
    } catch (error) {
      console.error(`failed while getting image for article  ${error}`);
    }
  }

  useLayoutEffect(() => {
    setImageLink(
      "https://og.tailgraph.com/og?fontFamily=Roboto&title=Scraping%20my%20Twitter%20Social%20Graph%20with%20Python%20and%20Selenium&titleTailwind=font-bold%20bg-transparent%20text-7xl&titleFontFamily=Poppins&textTailwind=text-2xl%20mt-4&logoTailwind=h-8&bgUrl=https%3A%2F%2Fwallpaper.dog%2Flarge%2F20455104.jpg&footer=https%3A%2F%2Fwww.swyx.io&footerTailwind=text-teal-900&containerTailwind=border-2%20border-orange-200%20bg-transparent%20p-4"
    );
    fetchArticleImage();
  }, [article]);

  const [isRead, setIsRead] = useState(article.readid);
  return (
    <Grid.Container
      xs={12}
      gap={2}
      alignContent="center"
      alignItems="center"
      justify="center"
    >
      <Grid
        xs={6}
        css={{ opacity: `${isRead ? "0.5" : "1"}`, cursor: "pointer" }}
        onClick={() => window.open(article.link, "_blank")}
      >
        <Grid xs={3} css={{ padding: "0" }} alignItems="flex-start">
          <Image
            showSkeleton
            maxDelay={10000}
            css={{ borderRadius: "5px" }}
            src={
              article.image_link === "default link"
                ? imageLink
                : article.image_link
            }
            width="100%"
            alt="article image"
          />
        </Grid>
        <Spacer />
        <Card
          css={{
            padding: "$10",
          }}
        >
          <Card.Header css={{ padding: "0" }}>
            <Grid.Container gap={1} justify="space-between">
              <Grid xs={8} direction="column">
                <Text b css={{ padding: "$1" }}>
                  {article.title}
                </Text>
                <Text css={{ color: "$accents8", pb: "$1" }}>{date}</Text>
              </Grid>
              <Grid xs={4}>
                <CardButtons
                  css={{ padding: "$1" }}
                  articleID={article.articleid}
                  isBookmarked={article.bookmarkid}
                  isRead={isRead}
                  setIsRead={setIsRead}
                />
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Card.Body css={{ padding: "0px" }}>
            <Text
              color="#777"
              css={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                padding: "0",
              }}
            >
              {article.description.slice(0, 200) + "..."}
            </Text>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
