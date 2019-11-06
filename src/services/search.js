import { prepareInput, arrayUnion } from '../utils/utils';

const getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const search = async (query) => {
    try {
        // obviously normally this is served through an API
        const response = await fetch(`../../flights.json`, getOptions);
        const json = await response.json();
        const q = prepareInput(query);

        // we allow search by flight number and destination airport
        const byFlightNumber = json.flights.filter((object) => prepareInput(object.flightNumber).includes(q));
        const byAirport = json.flights.filter((object) => prepareInput(object.airport).includes(q));

        // we unify the result
        return arrayUnion(byFlightNumber, byAirport);
    } catch (err) {
        console.error('Error searching for flights', err);
    }
};