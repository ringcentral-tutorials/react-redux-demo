import React from "react";
import {connect} from "react-redux";
import {logout} from "../redux/actions";
import {platform} from "../lib/sdk";

class Index extends React.Component {

    state = {user: null, error: null};

    /**
     * Here we can make an authorized request since this page is opened only when user is authorized
     * @return {Promise<void>}
     */
    async componentDidMount() {
        try {
            const user = (await platform.get('/account/~/extension/~')).json();
            this.setState({user});
        } catch (error) {
            this.setState({error});
        }
    }

    render() {

        const {error, user} = this.state;

        if (error) return (
            <div>Error: {error.toString()}</div>
        );

        if (!user) return (
            <div>Loading...</div>
        );

        return (
            <div>
                <h1>Logged in as {user.name}</h1>
                <button onClick={e => logout()}>Logout</button>
            </div>
        );

    }

}

export default connect(null, {logout})(Index);

