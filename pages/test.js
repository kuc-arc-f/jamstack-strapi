import React from 'react'

import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow';
//
function Page(data) {
console.log(data.blogs)
  var items = data.blogs
  return (
    <Layout>
      <div className="body_main_wrap">
        <div className="container">test:
        <ul>
        {items.map((item, index) => {
          return (<IndexRow key={index}
                  id={item.id} name={item.name} />       
          )
        })}          
        </ul>
        </div>
      </div>
    </Layout>
    )
}
export const getStaticProps = async context => {
//console.log( process.env.API_KEY )
  const res = await fetch(
    `http://localhost:1337/restaurants`,
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
