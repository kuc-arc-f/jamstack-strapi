import React from 'react'

import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow';
//
function Page(data) {
//console.log(data.blogs)
  var items = data.blogs
  return (
    <Layout>
      <div className="body_main_wrap">
        <div className="container">test:
        <ul>
        {items.map((item, index) => {
          return (<IndexRow key={index}
                  id={item.id} title={item.title} />       
          )
        })}          
        </ul>
        </div>
      </div>
    </Layout>
    )
}
export const getStaticProps = async context => {
//  `http://localhost:1337/tasks?_sort=createdAt:DESC&_start=0&_limit=10`,
  const res = await fetch(
    `http://localhost:1337/ex-items?_sort=createdAt:DESC&_start=0&_limit=10`,
  );
  const blogs = await res.json();
//console.log(blogs)
  return {
    props : {
      blogs: blogs,
    }
  };
}
export default Page
