import { Card, Grid, Image, Spacer, Text } from "@nextui-org/react";
import { useLayoutEffect, useRef, useState } from "react";

function parseHtmlEntities(str) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<!doctype html><body>${str}`,
    "text/html"
  );
  return dom.body.textContent;
}

export default function ArticleCard({ children, article, clickHandler }) {
  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(article.publication_date)
  );

  const [imageLink, setImageLink] = useState();
  const imageRef = useRef();

  async function fetchArticleImage() {
    try {
      if (article.image_link === "default link") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/image?articleid=${article.articleid}`
        );
        if (!response.ok) {
          //case no image found
          setImageLink("/feedni-default-img.jpg");
          return;
        }
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
      xs={12}
      gap={2}
      alignContent="center"
      alignItems="center"
      justify="center"
    >
      <Grid sm={6} xs={8} css={{ cursor: "pointer" }} onClick={clickHandler}>
        <Grid xs={2} css={{ padding: "0" }} alignItems="flex-start">
          <Image
            ref={imageRef}
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
            onError={() => (imageRef.current.src = "/feedni-default-img.jpg")}
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
                      {parseHtmlEntities(article.title)}
                    </Text>
                  </Grid>
                  <Grid xs={2} justify="flex-end">
                    {children}
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
                {article.description}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
    </Grid.Container>
  );
}
