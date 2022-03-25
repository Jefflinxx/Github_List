import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Repos = () => {
  const [repoData, setRepoData] = useState([]);
  let params = useParams();
  const repoDataArray = [];
  const userReposURL = `https://api.github.com/repos/${params.username}/${params.repo}`;
  console.log(params.username, params.repo);
  const search = async function (url) {
    const fetchData = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    let parseData = await fetchData.json();

    repoDataArray.push({
      fullName: parseData.full_name,
      description: parseData.description,
      stars: parseData.stargazers_count,
    });

    setRepoData(repoDataArray);
    //console.log(repoData[0].fullName);
  };
  useEffect(() => {
    //第一次載入時先清空array
    //repoDataArray.splice(0, repoDataArray.length);
    search(userReposURL);
  }, []);
  //console.log(repoDataArray[0].fullName);
  return (
    <div>
      {repoData.map((i) => {
        return (
          <div>
            <div>
              name:{" "}
              <a
                target="_blank"
                href={`https://github.com/${params.username}/${params.repo}`}
              >
                {i.fullName}
              </a>
            </div>
            <div>description:{i.description}</div>
            <div>stars:{i.stars}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Repos;
