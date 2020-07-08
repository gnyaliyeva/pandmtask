import React, { useState, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Axios from 'axios';
import { SEARCH_API } from './utils';

export const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true)
    Axios.get(SEARCH_API + `?q=${query}+in:login`)
    .then(res => {
      const options = res.data.map(user => (
        { 
            id: user.id,
            avatarUrl: user.avatar_url,
            login: user.login
        }
      ))
      setOptions(options)
      setIsLoading(false)
    })
  }

  return (
    <div className="col">
      <AsyncTypeahead
        id="user-search"
        placeholder="Search..."
        labelKey="login"
        isLoading={isLoading}
        minLength={3}
        onSearch={handleSearch}
        options={options}
      />
    </div>
  );
}


export const Detail = ({ match }) => {
  const userID = match.params.userID;
  const [user, setUser] = useState({})
  
  const handleDetail = () => {
    Axios.get(SEARCH_API + '/' + userID)
    .then(res => {
      const user = res.data;
        setUser(
          { 
            name: user.name,
            avatarUrl: user.avatar_url,
            followers: user.followers,
            following: user.following
          }
        )
    })
  }

  useEffect(() => {
    handleDetail()
  }, [handleDetail])


  return (
    <div className="col-4">
      <div className="card my-2 mx-2">
          <img src={user.avatarUrl} className="card-img-top" alt={user.name}/>
          <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <h5 className="card-title">Followers: {user.followers}</h5>
              <h5 className="card-title">Following: {user.following}</h5>
          </div>
      </div>
    </div>
  )
}