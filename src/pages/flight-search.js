
import { search } from '../services/search';

const getListItemHtml = (flight) => {
    return `<div class="result-item">
        <div class="column">
            <span class="flight-label">Destination</span>
            <span class="flight-value">${flight.airport}</span>
        </div>
        <div class="column">
            <span class="flight-label">Flight number</span>
            <span class="flight-value">${flight.flightNumber}</span>
        </div>
        <div class="column">
            <span class="flight-label">Expected departure</span>
            <span class="flight-value">${flight.expectedTime}</span>
        </div>
    </div>`;
};

const resetLoader = (loader) => {
    loader.style.display = 'none';
};

const Home = {
    render: async () => {
        let view = `
            <section class="section">
                <h1>Schiphol flight search</h1>
                <div class="rw-input" data-component="rw-input-element" data-realtime="true">
                    <label for="" class="rw-input-label">
                    </label>
                    <input id="search-input" class="rw-input-text" data-input="true" type="text" placeholder="Search by destination or flight number" />
                </div>
                <div id="loader"><span>Loading...</span></div>
                <ul id="result-list"></ul>
            </section>
        `;
        return view;
    },
    onRendered: async () => {
        const searchInput = document.getElementById('search-input');
        const resultList = document.getElementById('result-list');
        const loader = document.getElementById('loader');

        searchInput.addEventListener("keyup", async () => {
            if (searchInput.value.length > 2) {
                loader.style.display = 'flex';
                resultList.innerHTML = '';
                const searchResult = await search(searchInput.value);
                resetLoader(loader);
                searchResult.forEach((flight) => {
                    const listItemHtml = getListItemHtml(flight);
                    const li = document.createElement('li');
                    li.innerHTML = listItemHtml;
                    resultList.appendChild(li);
                });
            }
            if (searchInput.value.length === 0) {
                resetLoader(loader);
                resultList.innerHTML = '';
            }
        }, false);
    }
};

export default Home;