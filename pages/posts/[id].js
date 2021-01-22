import React from 'react'
import Link from 'next/link';

import marked from  'marked'

import Layout from '../../components/layout'
//import LibCommon from '../libs/LibCommon'
//
const BlogId = ({blog}) => {
//console.log(blog)
  var content = marked(blog.description)
//  var content = ""
  return (
  <Layout>
    <div className="container">
      <Link href="/" >
        <a className="btn btn-outline-primary mt-2">Back</a>
      </Link>
      <hr className="mt-2 mb-2" />
      <div className="show_head_wrap">
          <i className="fas fa-home"></i> >
          {blog.name}
      </div>
      <hr />            
      <h1>{blog.name}</h1>
      Date: {blog.created_at}
      <hr />
      <div dangerouslySetInnerHTML={{__html: `${content}`}}></div>
    </div>
    <style>{`
      div#post_item > p > img{
        max-width : 100%;
        height : auto;
      }
      div#post_item > hr {
        height: 1px;
        background-color: #000;
        border: none;
      }
      .show_head_wrap{ font-size: 1.4rem; }
      `}</style>      
  </Layout>  
  );
};
//
export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:1337/restaurants' );
  const repos = await res.json();
  const paths = repos.map(repo => `/posts/${repo.id}`); 
  return {paths, fallback: false};
};
export const getStaticProps = async context => {
  const id = context.params.id;
// console.log(id)
  const res = await fetch(
    `http://localhost:1337/restaurants/${id}`,
  );
  const blog = await res.json();
console.log(blog)
  return {
    props : {
      blog: blog,
    }
  };
};

export default BlogId;
