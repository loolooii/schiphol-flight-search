import Home from './pages/flight-search';

// our routes go here
const routes = {
    '/': Home
};
const router = async () => {

    // footer, navbar, etc. can be rendered here too

    // container to render main content of each page
    const content = null || document.getElementById('page_container');

    // if we have more routes than just "home", we need to make this more dynamic
    const page = routes['/'];
    // we wait for page to render
    content.innerHTML = await page.render();

    // here we know page was actually finished rendering, so we could do
    // for example our DOM manipulation
    await page.onRendered();
};

window.addEventListener('load', router);