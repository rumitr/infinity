import React, { useEffect, useState } from "react";
import useSWR from "swr";
import BarChart from "../graphs/BarChart";
import { groupBy } from "lodash";
import { fetcher } from "../utils";

const url = "http://52.175.201.248:3000/facebook/facebook_comments/1";

const CommentsCount = ({ user = 1 }) => {
  const { data: result, error } = useSWR(url, fetcher);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!error && result && result.list) {
      const postComment = groupBy(result.list, "post_id");
      console.log(postComment, "result");
      let commentsCount = Object.values(postComment).map(
        (comments) => comments.length
      );
      setData(commentsCount);
    }
  }, [result]);

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;
  return (
    <div className="Chart">
      <h2>Comments Count</h2>
      <button>Refresh</button>
      <BarChart width={600} height={400} data={data} />
    </div>
  );
};

export default CommentsCount;
