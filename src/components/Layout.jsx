import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeContext } from "gatsby-plugin-theme-switcher"
import { useLocation } from "@reach/router"
import Header from "~components/Header"
import Menu from "./Menu"
import Switcher from "./Switcher"
import { Box } from "~components/base"
import styled, { theme as myTheme, themeGet } from "~theme"
import SEO from "./Seo"

import "~theme/init.css"
import "normalize.css"
import "./layout.css"
import "~theme/styles.sass"

const { breakpoints, colors, space, fontSizes } = myTheme

const Layout = ({ children, frontpage, seo, modalStatus }) => {
  const location = useLocation()
  const { theme, switchTheme } = useContext(ThemeContext)
  const curTheme = location.pathname === "/" ? "theme-default" : "theme-yellow"

  useEffect(() => {
    switchTheme(curTheme)
  }, [curTheme])
  // if (typeof document !== "undefined") {
  // }

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <SEO seo={seo} />
      <Box
        className="body-wrapper"
        css={`font-size ${fontSizes.body};


        `}
      >
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <Menu frontpage={frontpage} />

        <Box
          p={[3, 4]}
          pt={[0, 0]}
          as="main"
          className={clsx({ content: true, frontpage })}
          css={`
            position: relative;
            top: 70px;

            @media (min-width: ${breakpoints.md}px) {
              top: 100px;
              width: 50%;
              padding-bottom: 100px;

              &.frontpage {
                width: 100%;
              }
            }

            @media (min-width: ${breakpoints.lg}px) {
              top: 120px;
            }
          `}
        >
          {/* <Box
            as="main"
            css={`
              height: 100%;
              padding-bottom: 50px;

              @media (min-width: ${breakpoints.md}px) {
                width: 50%;
              }
            `}
          > */}
          {children}
          {/* </Box> */}
        </Box>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
