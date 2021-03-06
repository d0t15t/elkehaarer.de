import React, { createRef, useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Box, Flex } from "theme-ui"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import ModalSlider from "~components/ModalSlider"
import styled, { theme } from "~theme"
import Tile from "~components/Tile"
import Image from "~components/Image"
import Layout from "~components/Layout"
import Modal from "~components/Modal"
import Slider from "~components/Slider"
import { TilesSmall, TilesMedium, TilesLarge } from "~layouts"
import { cleanString } from "~utils"

const Page = () => {
  const { page } = useStaticQuery(graphql`
    query homepageQuery {
      site {
        siteMetadata {
          title
        }
      }
      page: nodePage(drupal_internal__nid: { eq: 1 }) {
        title
        relationships {
          items: field_items {
            id
            color: field_color {
              color
            }
            body: field_body {
              value
            }
            image: field_image {
              alt
            }
            relationships {
              image: field_image {
                id
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, width: 800)
                  }
                }
              }
              modal: field_image {
                id
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, width: 800)
                  }
                }
              }
              cropped: field_image_cropped {
                id
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, width: 800)
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const items = page.relationships?.items || []

  const [slideIndex, setSlideIndex] = React.useState(0)

  const [modalStatus, setModalStatus] = React.useState(false)
  const [modalContent, setModalContent] = React.useState(null)

  const getTiles = () => {
    return items.map((item, key) => {
      const { cropped, image, modal } = item.relationships

      const tile = {
        color: item.color.color,
        cropped,
        image,
        alt: item.image.alt,
      }

      return [
        <Tile
          index={key}
          key={item.id}
          data={tile}
          setSlideIndex={setSlideIndex}
          setModalStatus={setModalStatus}
        />,
        item.id,
      ]
    })
  }

  const { breakpoints } = theme

  const tiles = getTiles()

  const TilesWithLayout = () => {
    const mqLg = useMediaQuery(`(min-width:${breakpoints.lg}px)`)
    const mqMd = useMediaQuery(`(min-width:${breakpoints.md}px)`)

    if (mqLg) return <TilesLarge tiles={tiles} />
    if (mqMd) return <TilesMedium tiles={tiles} />

    return <TilesSmall tiles={tiles} />
  }

  const seo = {
    title: page.title,
  }

  return (
    <Layout seo={seo} frontpage>
      {page.body?.value && (
        <div dangerouslySetInnerHTML={{ __html: page.body.value }} />
      )}
      <Box
        className="tiles-wrapper"
        css={`
          // opacity: 1;
          // transition: opacity 100ms;
          // opacity: ${modalStatus ? 0 : 1};
        `}
      >
        <TilesWithLayout />
      </Box>
      <Modal
        status={modalStatus}
        setStatus={setModalStatus}
        setModalContent={setModalContent}
      >
        <ModalSlider
          items={items}
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
        />
      </Modal>
    </Layout>
  )
}

export default Page
