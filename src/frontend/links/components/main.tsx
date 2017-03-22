import React from 'react';
import Relay from 'react-relay';

import Link from './Link';
import CreateLinkMutation from "../mutations/CreateLinkMutation";

class Main extends React.Component<any, any>{
 
    /* props validation example
    static propTypes = {
        limit: React.PropTypes.number
    }

    static defaultProps = {
        limit: 4    
    }
    */

    setLimit = (e) => {
        var newLimit = Number(e.target.value);
        this.props.relay.setVariables({limit: newLimit});
        console.log('newLimit', newLimit);
        console.log('relay', this.props.relay);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        Relay.Store.update(
            new CreateLinkMutation({
                title: this.refs.newTitle.value,
                url: this.refs.newUrl.value,
                store: this.props.store
            })
        );

        this.refs.newTitle.value = "";
        this.refs.newUrl.value = "";
    }

	render(){
		var content = this.props.store.linkConnection.edges.map(edge => {
			return <Link key={edge.node.id} link={edge.node} />;
		});

		return (<div>
			<h3>Links</h3>
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Title" ref="newTitle" />
                <input type="text" placeholder="Url" ref="newUrl" />
                <button type="submit">Add</button>
            </form>
            <label htmlFor='pagination-limit'>Showing</label>
            <select id='pagination-limit' onChange={this.setLimit} 
                defaultValue={this.props.relay.variables.limit}>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
			<ul>
				{content}
			</ul>
			</div>);			        
	}
}

Main = Relay.createContainer(Main, {
    initialVariables: {
        limit: 20
    },
    fragments: {
       store: () => Relay.QL`
        fragment on Store{
            id,
            linkConnection(first: $limit){
                edges{
                    node{
                        id,
                        ${Link.getFragment('link')}                
                    }
                }
            }
        }
       `
    }
});

export default Main;
