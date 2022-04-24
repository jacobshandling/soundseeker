import React from 'react';

class CreateSuiteView extends React.Component {

    render() {
        return(
            <section id="create-suite" className="action-view">
                <form id="create-suite-form">
                    <input id="suite-name" className="form-field" type="text" placeholder='new suite name' />
                    <input type="button" className="form-field" onClick={this.props.onCreateSuite} value="Create" />
                </form>
            </section>
        )
    }

}

export default CreateSuiteView;