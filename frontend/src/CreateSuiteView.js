import React from 'react';

class CreateSuiteView extends React.Component {

    render() {
        return(
            <section className="action-view">
                <div className="form-group">
                    <input
                        id="suite-name"
                        className="form-control"
                        type="text"
                        placeholder='Enter suite name'
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.props.onCreateSuite}
                    >Create</button>
                </div>
            </section>
        )
    }

}

export default CreateSuiteView;
