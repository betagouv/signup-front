import React from 'react';
import { string } from 'prop-types';
import Link from 'next/link';
import Layout from '../components/Layout';

const propTypes = {
  id: string.isRequired,
  title: string.isRequired,
};

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

PostLink.propTypes = propTypes;

export default () => (
    <Layout>
      <h1>My Blog</h1>
       <ul>
         <PostLink id="id_1" title="title one" />
         <PostLink id="id_2" title="title two" />
         <PostLink id="id_3" title="title three" />
       </ul>
    </Layout>
);
