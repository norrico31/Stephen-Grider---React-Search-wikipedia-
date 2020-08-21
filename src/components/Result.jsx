import React from 'react'

export default ({ renderedResults }) => {
    return (
        <div className="item">
            <div className="right floated content">
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a className="ui button" href={`https://en.wikipedia.org?curid=${renderedResults.pageid}`} target="_blank">Go</a>
            </div>
            <div className="content">
                <div className="header">
                    <span dangerouslySetInnerHTML={{ __html: renderedResults.snippet }}></span>
                    {renderedResults.title}
                </div>
            </div>
        </div>
    )
}