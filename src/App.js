import React from 'react';
import { SEARCH_API } from './utils';
import { Search } from './Pages';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            users: [],
        }
    }

    componentDidMount() {
        Axios.get(SEARCH_API)
        .then((res) => {
            const users = res.data.map(user => (
                { 
                    id: user.id,
                    avatarUrl: user.avatar_url,
                    login: user.login
                }
            ))
            this.setState({ users, loading: false })
        });
    }

    render() {
        const { state } = this;
        let cards = (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        );

        if (!state.loading) {
            cards = (state.users).map(user => (
                <div className="col-4" key={user.id}>
                    <div className="card my-2 mx-2">
                        <Link to={`/detail/${user.id}`} >
                            <img src={user.avatarUrl} className="card-img-top" alt={user.login}/>
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{user.id} - {user.login}</h5>
                            <a href={user.avatarUrl} className="btn btn-primary">Login</a>
                        </div>
                    </div>
                </div>
            ))
        } 

        return (
            <div className="container-fluid">
                <div className="row">
                    <Search/>
                </div>
                <div className="row">
                    {cards}
                </div>
            </div>
        )
    }
}

export default App;