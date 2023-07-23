import React, { useEffect, useState } from "react";
import type { GoogleScholarAuthorParameters } from "serpapi";
import { getJson } from "serpapi";

const CHRISTOPH_GOOGLE_SCHOLAR_ID ='bkqHBhEAAAAJ'; 

const getGoogleApiResults = async () =>{   
  const params = {
    author_id: CHRISTOPH_GOOGLE_SCHOLAR_ID,
    api_key: "c0f425446a0fc60cabe34e88286dca97c1f23d590bc364bbcf91f25363967170"
  } satisfies GoogleScholarAuthorParameters;

  // Show result as JSON
  try {
    const response = await getJson("google_scholar_author", params);
    console.log(response["organic_results"]);
    return response;
  }
  catch(error){
    return null;  
  }
};

export const ResearchResult = async () => {
const fetchData = await getGoogleApiResults();
if (!fetchData) return (<div>Fetching data...</div>);
console.log({fetchData});
return (<div>Data fetched.</div>);
};






