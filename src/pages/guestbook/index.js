// Components
import React, { Component } from 'react';

import Helmet from 'react-helmet';

import 'gitalk/dist/gitalk.css';

import { getPath } from '../../api';
import Sidebar from '../../components/Sidebar';
import ShareBox from '../../components/ShareBox';
import SEO from '../../components/SEO';

import './index.scss';

// Prevent webpack window problem
const isBrowser = typeof window !== 'undefined';
const Gitalk = isBrowser ? require('gitalk') : undefined;

class Guestbook extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
  }

  componentDidMount() {
    // Gitalk
    const gitalk = new Gitalk({
      clientID: '18255f031b5e11edd98a',
      clientSecret: '2ff6331da9e53f9a91bcc991d38d550c85026714',
      repo: 'calpa.github.io',
      owner: 'calpa',
      admin: ['calpa'],
      distractionFreeMode: true,
    });
    gitalk.render('gitalk-container');
  }

  render() {

    const { totalCount, edges } = this.data.latestPosts;
    const url = getPath();

    const description = '留言簿';
    const image = 'https://i.imgur.com/kjt2x52.png';

    return (
      <div className="row post guestbook">
        <Helmet>
        <title>留言簿</title>
        </Helmet>

        <Sidebar
          totalCount={totalCount}
          posts={edges}
          post
        />
        <div className="col-lg-6 col-md-12 col-sm-12 order-10 d-flex flex-column content">
          <h2>留言簿</h2>
          <ShareBox url={url} />
          <div id="gitalk-container" className="col-12" />
        </div>
        
        <SEO
          url={getPath()}
          description={description}
          image={image}
          siteTitleAlt="Calpa's Blog"
          isPost={false}
        />
      </div>
    );
  }
}

export default Guestbook;

export const query = graphql `
  query GuestbookQuery {
    latestPosts: allContentfulMarkdown(limit: 6) {
      totalCount
      edges {
        node {
          title
          url
          createdDate
        }
      }
    }
  }
`;
