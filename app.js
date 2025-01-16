class App extends React.Component {
    state = {
        users: [],
        assets: [],
        newUser: '',
        newAsset: '',
        assignedUser: ''
    };

    handleUserChange = (e) => {
        this.setState({ newUser: e.target.value });
    };

    handleAssetChange = (e) => {
        this.setState({ newAsset: e.target.value });
    };

    handleAssignChange = (e) => {
        this.setState({ assignedUser: e.target.value });
    };

    addUser = () => {
        this.setState((prevState) => ({
            users: [...prevState.users, prevState.newUser],
            newUser: ''
        }));
    };

    addAsset = () => {
        this.setState((prevState) => ({
            assets: [...prevState.assets, { name: prevState.newAsset, user: prevState.assignedUser }],
            newAsset: '',
            assignedUser: ''
        }));
    };

    exportToExcel = () => {
        // Implement export to Excel functionality here
        alert('Export to Excel functionality to be implemented');
    };

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Inventory Management</h1>
                </header>
                <div>
                    <h2>Users</h2>
                    <input type="text" value={this.state.newUser} onChange={this.handleUserChange} placeholder="Add User" />
                    <button onClick={this.addUser}>Add User</button>
                    <ul>
                        {this.state.users.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>Assets</h2>
                    <input type="text" value={this.state.newAsset} onChange={this.handleAssetChange} placeholder="Add Asset" />
                    <select value={this.state.assignedUser} onChange={this.handleAssignChange}>
                        <option value="">Assign to User</option>
                        {this.state.users.map((user, index) => (
                            <option key={index} value={user}>{user}</option>
                        ))}
                    </select>
                    <button onClick={this.addAsset}>Add Asset</button>
                    <ul>
                        {this.state.assets.map((asset, index) => (
                            <li key={index}>{asset.name} - {asset.user}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={this.exportToExcel}>Export to Excel</button>
            </div>
        );
    }

    /**
     * Sends an email using the backend service.
     *
     * This function sends a POST request to the backend service to send an email
     * with the specified recipient, subject, and body.
     *
     * @function
     * @name sendEmail
     * @returns {void}
     */
    sendEmail = () => {
        fetch('https://your-backend-service/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: 'recipient@example.com',
                subject: 'Test Email',
                body: 'This is a test email sent from the Inventory App.'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Email sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
