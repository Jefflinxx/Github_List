import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../user.css";

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
    <div className="userdata">
      <header>User:{params.username}</header>
      <div>
        <table>
          {userData.map((i) => {
            return (
              <div>
                <td className="content">
                  name:
                  <Link to={`/users/${params.username}/repos/${i.name}`}>
                    {i.name}
                  </Link>
                </td>
                <td>stargazers conut:{i.stars}</td>
              </div>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default User;
