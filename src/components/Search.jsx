import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Result from './Result'

export default () => {
    const [term, setTerm] = useState('tokyo ravens')
    const [results, setResults] = useState([])

    useEffect(() => {
        const searchArticles = async () => {
            const { data: { query: { search } } } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            })
            setResults(search)
        }

        if (term && !results.length) {
            searchArticles()
        } else {
            const timeoutId = setTimeout(() => {
                if (term) {
                    searchArticles()
                }
            }, 800)
    
            return () => {
                clearTimeout(timeoutId)
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term])

    const result = results.map(result => (
        <Result renderedResults={result} key={result.pageid} />
    ))

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label htmlFor="">Enter Search Term</label>
                    <input type="text" className="input" value={term} onChange={e => setTerm(e.target.value)}/>
                </div>
            </div>
            <div className="ui celled list">
                {result}
            </div>
        </div>
    )
}