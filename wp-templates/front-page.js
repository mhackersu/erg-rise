import * as MENUS from 'constants/menus';

import { useQuery, gql } from '@apollo/client';
import { FaArrowRight } from 'react-icons/fa';
import styles from 'styles/pages/_Home.module.scss';
import {
  EntryHeader,
  Main,
  Button,
  Heading,
  CTA,
  NavigationMenu,
  SEO,
  Header,
  Footer,
  Posts,
  Testimonials,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';

const postsPerPage = 3;

export default function Component() {
  const { data, loading } = useQuery(Component.query, {
    variables: Component.variables(),
  });
  if (loading) {
    return null;
  }

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const mainBanner = {
    sourceUrl: '/static/rise_logo.png',
    mediaDetails: { width: 2048, height: 923 },
    altText: 'Rise ERG Banner Image',
  };
  
  const secondaryBanner = {
    sourceUrl: '/static/rise_banner.png',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Rise ERG Secondary Banner'
  }
  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />

      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main className={styles.home}>
        <EntryHeader image={mainBanner} />
        <EntryHeader image={secondaryBanner} />
        <div className="container">
          <section className="hero text-center">
            <Heading className={styles.heading} level="h1">
              WP Engine Rise ERG
            </Heading>
            <p className={styles.description}>
            The Rise mission Rise aims to provide a safe, inclusive environment for the advancement, advocacy, and education of BIPOC and allies by intentionally increasing awareness of the perspectives and experiences of those at WP Engine and in our communities.
            The Rise ERG seeks to unite employees through education opportunities and prioritizing diversity, equity, and inclusion at the forefront of WP Engine’s identity by inspiring active participation across the company.
            {' '}
            </p>
            <div className={styles.actions}>
              <Button styleType="primary" href="/contact">
                Join Us
              </Button>
            </div>
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/projects">
                  Explore Recipes <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Explore the latest recipes from the Rise ERG
              </span>
            </CTA>
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/about">
                  Explore BHM <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Black Histoy Month
              </span>
            </CTA>
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/asian-pacific-american-heritage-month">
                  Explore AAPI <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Asian and Pacific Islander Month
              </span>
            </CTA>
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/native-american-heritage-month">
                  Explore NAHM <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Native American Heritage Month
              </span>
            </CTA>
          </section>
          {/* <section className={styles.posts}>
            <Heading className={styles.heading} level="h2">
              Latest Posts
            </Heading>
            <Posts posts={data.posts?.nodes} id="posts-list" />
          </section> */}
          {/* <section className={styles.testimonials}>
            <Heading className={styles.heading} level="h2">
              Testimonials
            </Heading>
            <p className={styles.description}>
              Check out some of the stories from our ERG members.
            </p>
            <Testimonials testimonials={data?.testimonials?.nodes} />
          </section> */}
        </div>
      </Main>
      <Footer menuItems={footerMenu} />
    </>
  );
}

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    first: postsPerPage,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${Posts.fragments.entry}
  ${Testimonials.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $first: Int
  ) {
    posts(first: $first) {
      nodes {
        ...PostsItemFragment
      }
    }
    testimonials {
      nodes {
        ...TestimonialsFragment
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
