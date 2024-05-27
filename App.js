import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const industries = {
    'Refineries & Marketing': '#ff6f61',
    'Computers - Software & Consulting': '#6b5b95',
    'Private Sector Bank': '#88b04b',
    'NBFC': '#d65076',
    'Diversified FMCG': '#45b8ac',
};

const App = () => {
    const [symbol, setSymbol] = useState('');
    const [industry, setIndustry] = useState('');
    const [subscribedSymbols, setSubscribedSymbols] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTableData(prevTableData =>
                prevTableData.map(row => ({
                    ...row,
                    openPrice: getRandomValue(row.openPrice),
                    highPrice: getRandomValue(row.highPrice),
                    lowPrice: getRandomValue(row.lowPrice),
                    closePrice: getRandomValue(row.closePrice),
                    volume: getRandomInt(row.volume),
                }))
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSymbolChange = (e) => {
        setSymbol(e.target.value.toUpperCase());
    };

    const handleIndustryChange = (e) => {
        const capitalizedIndustry = e.target.value
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
        setIndustry(capitalizedIndustry);
    };

    const subscribeSymbol = () => {
        if (!/^[A-Z]+$/.test(symbol)) {
            alert('Symbol must be in uppercase letters only.');
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(industry)) {
            alert('Industry must contain only letters.');
            return;
        }

        if (subscribedSymbols.includes(symbol)) {
            alert('Symbol is already subscribed.');
            return;
        }

        const newEntry = {
            id: uuidv4(),
            symbol,
            industry,
            openPrice: getRandomValue(),
            highPrice: getRandomValue(),
            lowPrice: getRandomValue(),
            closePrice: getRandomValue(),
            volume: getRandomInt(),
        };

        setSubscribedSymbols([...subscribedSymbols, symbol]);
        setTableData([...tableData, newEntry]);
        setSymbol('');
        setIndustry('');
    };

    const getRandomValue = (base = 1000) => (base + Math.random() * 50).toFixed(2);
    const getRandomInt = (base = 1000) => Math.floor(base + Math.random() * 50);

    const sortTable = () => {
        setTableData([...tableData].sort((a, b) => a.symbol.localeCompare(b.symbol)));
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="cards-container">
                <div className="card">Card TL</div>
                <div className="card">Card BL</div>
                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Symbol"
                        value={symbol}
                        onChange={handleSymbolChange}
                    />
                    <input
                        type="text"
                        placeholder="Industry"
                        value={industry}
                        onChange={handleIndustryChange}
                    />
                    <button onClick={subscribeSymbol}>Add</button>
                    <p>Subscribed Symbols: {subscribedSymbols.join(', ')}</p>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={sortTable}>Symbols</th>
                                <th>Open Price</th>
                                <th>High Price</th>
                                <th>Low Price</th>
                                <th>Close Price</th>
                                <th>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id}>
                                    <td>
                                        {row.symbol}
                                        <br />
                                        <span style={{ color: industries[row.industry] }}>
                                            {row.industry}
                                        </span>
                                    </td>
                                    <td>{row.openPrice}</td>
                                    <td>{row.highPrice}</td>
                                    <td>{row.lowPrice}</td>
                                    <td>{row.closePrice}</td>
                                    <td>{row.volume}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card">Card TR</div>
                <div className="card">Card MR</div>
                <div className="card">Card BR</div>
            </div>
        </div>
    );
};

export default App;
