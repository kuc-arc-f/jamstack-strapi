import React from 'react'
//import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/layout'
import TopHeadBox from '../../components/TopHeadBox'
import IndexRow from '../IndexRow';
import LibPagenate from '../../libs/LibPagenate'
//
function Page(data) {
  var items = data.blogs
  var paginateDisp = data.display
  var page = data.page
  var nextPage = parseInt(page) + parseInt(1)
//console.log("display=", data.display , nextPage)  
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
                    <Link href={`/page/${nextPage}`}><a className="btn btn-lg btn-outline-primary">
                    > </a></Link>
                </div>
              </div>
              ): 
              "" }              
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )  
}
//
export const getStaticProps = async context => {
  const page = context.params.id;
//console.log("page=", page)
  LibPagenate.init()
  var pageInfo=LibPagenate.get_page_start(page)
  var url = "http://localhost:1337/tasks?_sort=createdAt:DESC"
  url =url + `&_start=${pageInfo.start}&_limit=${pageInfo.limit}`
//  console.log(url)
  const res = await fetch(url);
  const blogs = await res.json();
  var display = LibPagenate.is_paging_display(blogs.length)
console.log("disp=" , display)
  return {
    props : {
      blogs: blogs, display: display, page: page
    }
  };
}
export async function getStaticPaths() {
  const res = await fetch(
    `http://localhost:1337/tasks?_sort=createdAt:DESC`,
  );
  const blogs = await res.json(); 
console.log( "len=", blogs.length ) 
  LibPagenate.init()
  var pageMax =LibPagenate.get_max_page(blogs.length)
console.log( "pageMax=", pageMax)
  pageMax = Math.ceil(pageMax)
  var paths = []
  for(var i= 1 ; i<= pageMax; i++ ){
    var item = {
      params : {id: String(i)} 
    }
    paths.push(item)
  }
// console.log( paths )
  return {
    paths: paths,
    fallback: false,
  }
}

export default Page
