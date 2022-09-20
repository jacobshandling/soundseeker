import React from 'react';

class CreateBlobView extends React.Component {

    renderSuiteOptions(userSuiteMap) {
        const suiteOptions = [];
        for (let key in userSuiteMap) {
            const userSuite = userSuiteMap[key];
            suiteOptions.push(
                    <label htmlFor={userSuite.name} key={userSuite.id}>
                        <input
                            id={userSuite.id}
                            className="select-checkbox"
                            key={userSuite.id}
                            type="checkbox"
                            name="suite-options"
                            value={userSuite.id}
                        />
                    <p>{userSuite.name}</p></label>

            )
        };
        return suiteOptions;
    }

    render() {
        const suiteOptions = this.renderSuiteOptions(this.props.userSuiteMap);
        return(
            <section className="action-view">
                <div className="form-group">
                    <input
                        id="blob-name"
                        className="form-control"
                        type="text"
                        placeholder='Enter blob name'
                        autoFocus
                    />
                </div>
                <fieldset className="form-group association-options" id="new-suite-associations">
                    <label htmlFor="new-suite-associations">Suites to associate this Blob with (at least 1):</label>
                    {suiteOptions}
                </fieldset>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={this.props.onCreateBlob}>Create</button>
                </div>
            </section>
        )
    }

}

export default CreateBlobView;
