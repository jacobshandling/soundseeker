import React from 'react';

class CreateSuiteView extends React.Component {

    render() {
        return(
            <section id="create-suite" className="action-view">
                <div id="create-suite-form" className="form">
                    <input id="suite-name" className="form-field" type="text" placeholder='new suite name' autoFocus/>
                    <input type="button" className="form-field" onClick={this.props.onCreateSuite} value="Create" />
                </div>
            </section>
        )
    }

}

export default CreateSuiteView;