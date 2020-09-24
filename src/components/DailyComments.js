import React, { useEffect, useState } from "react";
import useSWR from "swr";
import LineChart from "../graphs/LineChart";
import { groupBy } from "lodash";
import { fetcher } from "../utils";

const url = "http://52.175.201.248:3000/facebook/facebook_comments/1";

const DailyComments = ({ user = 1 }) => {
  const { data: result, error } = useSWR(url, fetcher);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!error && result && result.list) {
      if (!error && result && result.list) {
        let temp = result.list.reduce((acc, comment) => {
          let date = comment.created_datetime.substring(0, 10);
          if (acc[date]) acc[date] += 1;
          else acc[date] = 1;
          return acc;
        }, {});
        let data = Object.entries(temp).map(([key, value]) => ({
          date: new Date(key),
          value,
        }));
        setData(data);
      }
    }
  }, [result]);
  console.log(data);

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;
  return (
    <div className="Chart">
      <h2>Comments Count</h2>
      <button>Refresh</button>
      {data.length && (
        <LineChart elementWidth={600} elementHeight={270} data={data} />
      )}
    </div>
  );
};

export default DailyComments;
