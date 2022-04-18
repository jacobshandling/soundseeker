import React from 'react';

class CreateBlobView extends React.Component {

    renderSuiteOptions(userSuiteMap) {
        const suiteOptions = [];
        for (let key in userSuiteMap) {
            const userSuite = userSuiteMap[key];
            suiteOptions.push(
                    <label htmlFor={userSuite.name} key={userSuite.id}>
                        <input id={userSuite.id} className="suite-select-checkbox" key={userSuite.id} type="checkbox" name="suite-options" value={userSuite.url} />
                    <p>{userSuite.name}</p></label>
                    
            )
        };
        return suiteOptions;
    }

    render() {
        const suiteOptions = this.renderSuiteOptions(this.props.userSuiteMap);
        return(
            <section id="create-blob">
                <form id="create-blob-form">
                    <input id="blob-name" className="upload-field" type="text" placeholder='new blob name' />
                    <fieldset className="upload-field" id="suite-options">
                        <legend>Suite(s) to associate this clip with (at least 1):</legend> 
                        {suiteOptions}
                    </fieldset>
                    <input type="submit" className="create-field" onClick={this.props.onCreateBlob} value="Create" />
                </form>
            </section>
        )
    }

}

export default CreateBlobView;