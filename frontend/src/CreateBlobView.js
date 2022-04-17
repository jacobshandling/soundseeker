import React from 'react';

class CreateBlobView extends React.Component {

    render() {
        return(
            <section id="create-blob">
                <form id="create-blob-form">
                    <input id="blob-name" className="create-field" type="text" placeholder='new blob name' />
                    <input type="submit" className="create-field" onClick={this.props.onCreateBlob} value="Create" />
                </form>
            </section>
        )
    }

}

export default CreateBlobView;