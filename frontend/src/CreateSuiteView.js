import React from 'react';

class CreateSuiteView extends React.Component {

    render() {
        return(
            <section id="create-suite">
                <form id="create-suite-form">
                    <input id="suite-name" className="create-field" type="text" placeholder='new suite name' />
                    <input type="submit" className="create-field" onClick={this.props.onCreateSuite} value="Create" />
                </form>
            </section>
        )
    }

}

export default CreateSuiteView;