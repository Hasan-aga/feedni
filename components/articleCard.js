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

function getDescription(article) {
  if (!article.description) {
    return "No description 😓";
  }
  let { description } = article;
  if (description.charAt(0) === "<") {
    description = new DOMParser().parseFromString(description, "text/html").body
      .textContent;
  }
  return description.slice(0, 200);
}

export default function ArticleCard({ article, offset, feed }) {
  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(article.publication_date)
  );

  const [imageLink, setImageLink] = useState();

  async function fetchArticleImage() {
    try {
      if (article.image_link === "default link") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/image?articleid=${article.articleid}`
        );
        const result = await response.json();
        setImageLink(result.imageLink);
      }
    } catch (error) {
      console.error(`failed while getting image for article  ${error}`);
    }
  }

  useLayoutEffect(() => {
    fetchArticleImage();
  }, [article]);

  return (
    <Grid.Container
      lg={12}
      md={10}
      sm={8}
      xs={6}
      gap={2}
      alignContent="center"
      alignItems="center"
      justify="center"
    >
      <Grid
        xs={6}
        css={{
          opacity: `${article.readid ? "0.5" : "1"}`,
          cursor: "pointer",
        }}
        onClick={() => window.open(article.link, "_blank")}
      >
        <Grid xs={2} css={{ padding: "0" }} alignItems="flex-start">
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
        <Grid xs={10} css={{ padding: "0" }}>
          <Card
            css={{
              padding: "$10",
            }}
          >
            <Card.Header css={{ padding: "0" }}>
              <Grid xs={12} direction="column">
                <Grid.Container>
                  <Grid xs={10}>
                    <Text
                      h5
                      css={{
                        padding: "$1",
                        width: "100em",
                        textTransform: "capitalize",
                        letterSpacing: "1px",
                      }}
                    >
                      {article.title}
                    </Text>
                  </Grid>
                  <Grid xs={2} justify="flex-end">
                    <CardButtons
                      article={article}
                      css={{ padding: "$1" }}
                      offset={offset}
                      feed={feed}
                    />
                  </Grid>
                </Grid.Container>
                <Text css={{ color: "$accents8", pb: "$1" }}>{date}</Text>
              </Grid>
            </Card.Header>
            <Card.Body css={{ padding: "0px" }}>
              <Text
                color="$gray800"
                css={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  overflowWrap: "break-word",
                  whiteSpace: "nowrap",
                  padding: "0",
                }}
              >
                {getDescription(article)}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
    </Grid.Container>
  );
}