
import { search } from '../services/search';

const getListItemHtml = (flight) => {
    return `<div class="search-result-item">
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

const resetPlaceholder = (placeholder, nrOfResults) => {
    if (typeof nrOfResults !== 'undefined' && nrOfResults === 0) {
        placeholder.innerHTML = 'No flights found';
    } else {
        placeholder.style.display = 'none';
    }
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
                <div id="placeholder"></div>
                <ul id="search-result-list"></ul>
            </section>
        `;
        return view;
    },
    onRendered: async () => {
        const searchInput = document.getElementById('search-input');
        const resultList = document.getElementById('search-result-list');
        const placeholder = document.getElementById('placeholder');

        searchInput.addEventListener("keyup", async () => {
            if (searchInput.value.length > 2) {
                placeholder.style.display = 'flex';
                resultList.innerHTML = '';
                const searchResult = await search(searchInput.value);
                resetPlaceholder(placeholder, searchResult.length);
                searchResult.forEach((flight) => {
                    const listItemHtml = getListItemHtml(flight);
                    const li = document.createElement('li');
                    li.innerHTML = listItemHtml;
                    resultList.appendChild(li);
                });
            }
            if (searchInput.value.length === 0) {
                resetPlaceholder(placeholder);
                resultList.innerHTML = '';
            }
        }, false);
    }
};

export default Home;