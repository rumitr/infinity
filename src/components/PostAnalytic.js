import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Table, Tag, Space } from "antd";
import { fetcher } from "../utils";
import { format } from "date-fns";

const api = `http://52.175.201.248:3000/facebook/facebook_post/1`;

const PostAnalytic = ({ user = 1 }) => {
  const { data: result, error } = useSWR(api, fetcher);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Post",
      dataIndex: "post",
      key: "post",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Date Time",
      dataIndex: "created_datetime",
      key: "created_date",
      render: (date) => format(new Date(date), "d-MM-yyyy h:mm:ss"),
    },
    {
      title: "Likes",
      dataIndex: "post_likes",
      key: "post_likes",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
    },
    {
      title: "Shares",
      dataIndex: "share_count",
      key: "share_count",
    },
  ];

  useEffect(() => {
    if (result && result.list) {
      setData(result.list);
    } else setData([]);
  }, [result]);

  if (error) return <div>failed to load</div>;
  if (!result) return <div>loading...</div>;

  return (
    <>
      <h2>Post Analytics</h2>
      <Table
        pagination={{ pageSize: 4 }}
        size="small"
        dataSource={data}
        columns={columns}
      />
    </>
  );
};

export default PostAnalytic;
