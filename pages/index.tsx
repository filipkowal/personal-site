import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import BlogPosts from '@/components/blogPosts';
import React from 'react';
import ContentService from '@/services/ContentService';
import { transformContent } from '@/helpers/contentHelpers';
import { IContentViewModel } from '@/viewModels/contentViewModel';
import { motion } from 'framer-motion';

interface IHomeProps {
  content: IContentViewModel[]
}

export const getStaticProps: GetStaticProps = async ({preview}) => {
  console.log(`Loading home page content, preview mode is ${!!preview}`);

  const contentService = new ContentService(preview ?? false);
  const allContent = await contentService.getAllContent();
  const articles = transformContent(allContent.sort((a,b) => (b.date.value ?? new Date()).getTime()-(a.date.value ?? new Date()).getTime()).slice(0,4));

  const props = {
    content: articles
  }

  return { props };
}

const Home: React.FC<IHomeProps> = ({ content }) => {
  return (
    <motion.div className="wrapper"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
      <Head>
        <title>Ondrabus</title>
        <meta property="og:title" content="Ondrabus" />
        <meta property="og:image" content="/img/website.jpg" />
      </Head>
      <Header className=""></Header>

      <main>
        <section className="teaser">
            <p>Hi, I'm Ondrej. <span></span></p>
        </section>

        
        <section className="content banner">
          <div>
            <a href="https://youtube.com/c/ondrabus">
                <img src="/img/youtube-banner.png" alt="Live on YouTube every Thursday 3PM BST" />
            </a>
          </div>
        </section>

        <BlogPosts content={content} />

        <section className="content">
          <p>
            <Link href="/blog" as="/blog">
                <a title="More published content">See more...</a>
            </Link>
          </p>
        </section>

      </main>

      <Footer></Footer>
      
      <div className="fullscreen-bg">
        <div className="video">
            <i></i>
            <video loop muted autoPlay poster="/img/web.jpg">
                <source src="/img/background.mp4" type="video/mp4" />
            </video>
        </div>
      </div>
      <script src="/js/typing.js"></script>
      <script src="/js/scroll.js"></script>
    </motion.div>
  )
}

export default Home;
