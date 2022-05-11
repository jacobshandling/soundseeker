import React from 'react';

class CreateBlobView extends React.Component {

    renderSuiteOptions(userSuiteMap) {
        const suiteOptions = [];
        for (let key in userSuiteMap) {
            const userSuite = userSuiteMap[key];
            suiteOptions.push(
                    <label htmlFor={userSuite.name} key={userSuite.id}>
                        <input id={userSuite.id} className="select-checkbox" key={userSuite.id} type="checkbox" name="suite-options" value={userSuite.url} />
                    <p>{userSuite.name}</p></label>
                    
            )
        };
        return suiteOptions;
    }

    render() {
        const suiteOptions = this.renderSuiteOptions(this.props.userSuiteMap);
        return(
            <section id="create-blob" className="action-view">
                <div className="upload-form">
                    <input id="blob-name" className="form-field" type="text" placeholder='new blob name' autoFocus/>
                    <fieldset className="form-field" id="suite-options">
                        <legend>Suites to associate this clip with (at least 1):</legend> 
                        {suiteOptions}
                    </fieldset>
                    <input type="button" className="form-field" onClick={this.props.onCreateBlob} value="Create" />
                </div>
            </section>
        )
    }

}

export default CreateBlobView;