import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const User = () => {
  const [userData, setUserData] = useState([]);
  let params = useParams();

  const userDataArray = [];
  const userURL = ` https://api.github.com/users/${params.username}/repos`;
  const search = async function (url) {
    const fetchData = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    let parseData = await fetchData.json();
    parseData.forEach((element) => {
      userDataArray.push({
        name: element.name,
        stars: element.stargazers_count,
      });
    });
    setUserData(userDataArray);
  };
  useEffect(() => {
    search(userURL);
  }, []);

  return (
    <div>
      <header>User:{params.username}</header>
      <div>
        <table>
          <div>
            <td>name:</td>
            <td>stargazers conut:</td>
          </div>
          {userData.map((i) => {
            return (
              <div>
                <td>
                  <Link to={`/users/${params.username}/repos/${i.name}`}>
                    {i.name}
                  </Link>
                </td>
                <td>{i.stars}</td>
              </div>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default User;
