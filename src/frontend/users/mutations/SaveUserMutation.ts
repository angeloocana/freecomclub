import Relay from 'react-relay';

class SaveUserMutation extends Relay.Mutation{

    getMutation(){
        console.log('SaveUserMutation getMutation');

        return Relay.QL`
            mutation {saveUser}
        `;
    }

    getVariables(){
        return this.props.user;
    }

    getFatQuery(){
        return Relay.QL`
            fragment on SaveUserPayload{
                userEdge,
                store { userConnection }
            }
        `; 
    }

    getConfigs(){
        return [{
            type: 'RANGE_ADD',
            parentName: 'store',
            parentID: this.props.store.id,
            connectionName: 'userConnection',
            edgeName: 'userEdge',
            rangeBehaviors: {
                '':'append'
            }
        }]; 
    }
}

export default SaveUserMutation;
