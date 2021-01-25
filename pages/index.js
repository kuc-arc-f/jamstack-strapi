import React from 'react'
//import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow';
//
function Page(data) {
  var items = data.blogs
  var paginateDisp = data.display
//console.log("display=", data.display )
  return (
    <Layout>
      <TopHeadBox />
      <div className="body_main_wrap">
        <div className="container">
          <div className="body_wrap">
            <div id="post_items_box" className="row conte mt-2 mb-4">
              <div className="col-sm-12">
                <div id="div_news">
                  <h2 className="h4_td_title mt-2 mb-2" >Post</h2>
                </div>
              </div>
              {items.map((item, index) => {
//                console.log(item.id ,item.createdAt )
                return (<IndexRow key={index}
                        id={item.id} title={item.title}
                        date={item.createdAt} />       
                )
              })}
              <hr />   
              { paginateDisp ? (
              <div className="paginate_wrap">
                <div className="btn-group" role="group" aria-label="Basic example">
                  <Link href="/page/1"><a className="btn btn-lg btn-outline-primary">
                    1st</a></Link>
                    <Link href="/page/2"><a className="btn btn-lg btn-outline-primary">
                    > </a></Link>
                </div>
              </div>
              ):"" 
              }                       
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )  
}
//
export const getStaticProps = async context => {
// console.log( context )
    const res = await fetch(
      `http://localhost:1337/tasks?_sort=createdAt:DESC&_start=0&_limit=10`,
    );
    const blogs = await res.json();
    LibPagenate.init()
    var display = LibPagenate.is_paging_display(blogs.length)
//console.log(blogs.length)
    return {
      props : {
        blogs: blogs,display: display
      }
    };
}

export default Page
