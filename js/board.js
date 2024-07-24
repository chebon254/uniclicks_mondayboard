const MONDAY_API_URL = 'https://api.monday.com/v2';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM2NzAzMjk1NywiYWFpIjoxMSwidWlkIjo2MTY3MjM3MSwiaWFkIjoiMjAyNC0wNi0wM1QxMToxMDoxNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjM3NjY4MjAsInJnbiI6ImV1YzEifQ.lwt_o5BXX5aEvgzu7zcbTXBfCRYQNT8XoUvRSB5rs8o'; // Replace with your actual API token

const BOARD_IDS = {
    EVENTS: 1574326188,
    OFFERS: 1574355285,
    CONTACT: 1574325540
};

async function fetchBoardItems(boardId) {
    const query = `
            query {
                boards(ids: ${boardId}) {
                    items_page {
                        items {
                            name
                             column_values {
                                id
                                text
                                value
                            }
                        }
                    }
                }
            }`;

    try {
        const response = await axios.post(MONDAY_API_URL, { query }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_TOKEN
            }
        });

        return response.data.data.boards[0].items_page.items;
    } catch (error) {
        console.error(`Error fetching board ${boardId} items:`, error);
        return null;
    }
}

function updateOfferTable(offers) {
    const tableBody = document.querySelector('#offer-table tbody');
    tableBody.innerHTML = '';  // Clear existing rows

    offers.forEach(offer => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${offer.title}</td>
                    <td>${offer.monthlyClicks}</td>
                    <td>${offer.monthlyPayouts}</td>
                `;
        tableBody.appendChild(row);
    });
}

function createEventHTML(event) {
    return `
                <div class="swiper-slide events-swiper__slide">
                    <div class="events-swiper__img">
                        <img src="${event.image}" alt="${event.title}">
                    </div>
                    <div class="events-swiper__city">
                        <h2>${event.title}</h2>
                    </div>
                    <div class="events-swiper__caption">
                        <p>${event.location}</p>
                    </div>
                    <div class='events-swiper__date'>
                        <p>${event.startDate.toDateString()} - ${event.endDate.toDateString()}</p>
                    </div>
                </div>
            `;
}

function updateEvents(upcomingEvents, pastEvents) {
    const upcomingEventsContainer = document.getElementById('cupcomingEvents');
    const pastEventsContainer = document.getElementById('cpastEvents');

    upcomingEventsContainer.innerHTML = upcomingEvents.map(createEventHTML).join('');
    pastEventsContainer.innerHTML = pastEvents.map(createEventHTML).join('');

    // Reinitialize Swiper if you're using it
    // new Swiper('.events-swiper', { ... });
}

async function processEvents(events) {
    if (!events) return { upcomingEvents: [], pastEvents: [] };

    const now = new Date();
    const upcomingEvents = [];
    const pastEvents = [];

    events.forEach(event => {
        const title = event.name;
        const location = event.column_values.find(col => col.id === 'location__1')?.text || '';
        const image = JSON.parse(event.column_values.find(col => col.id === 'files__1')?.value || '[]')[0]?.public_url || '';
        const startDate = new Date(event.column_values.find(col => col.id === 'date__1')?.text || '');
        const endDate = new Date(event.column_values.find(col => col.id === 'date2__1')?.text || '');

        const eventData = { title, location, image, startDate, endDate };

        if (endDate >= now) {
            upcomingEvents.push(eventData);
        } else {
            pastEvents.push(eventData);
        }
    });

    return { upcomingEvents, pastEvents };
}

async function processOffers(offers) {
    if (!offers) return [];

    return offers.map(offer => ({
        title: offer.name,
        monthlyClicks: offer.column_values.find(col => col.id === 'numbers__1')?.text || '',
        monthlyPayouts: offer.column_values.find(col => col.id === 'numbers5__1')?.text || '',
    }));
}

async function submitContactForm(event) {
    event.preventDefault();  // Prevent default form submission

    const name = document.getElementById('cname').value;
    const company = document.getElementById('company').value;
    const communicationType = document.querySelector('input[name="communication_type"]:checked').value;
    const communicationId = document.getElementById('communication_id').value;
    const message = document.getElementById('message-input').value;

    const mutation = `
                mutation {
                    create_item (
                        board_id: ${BOARD_IDS.CONTACT},
                        item_name: "${name}",
                        column_values: "{
                            \\"text__1\\": \\"${company}\\",
                            \\"text2__1\\": \\"${communicationType}\\",
                            \\"text24__1\\": \\"${communicationId}\\",
                            \\"text_1__1\\": \\"${message}\\"
                        }"
                    ) {
                        id
                    }
                }
            `;

    try {
        const response = await axios.post(MONDAY_API_URL, { query: mutation }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_TOKEN
            }
        });

        console.log('Contact form submitted:', response.data);
        document.getElementById('formMessage').textContent = 'Thank you for your submission!';
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error submitting contact form:', error);
        document.getElementById('formMessage').textContent = 'An error occurred. Please try again.';
    }
}

async function main() {
    // Fetch board items
    const eventsItems = await fetchBoardItems(BOARD_IDS.EVENTS);
    const offersItems = await fetchBoardItems(BOARD_IDS.OFFERS);

    // Process data
    const { upcomingEvents, pastEvents } = await processEvents(eventsItems);
    const processedOffers = await processOffers(offersItems);

    // Update the website with the fetched data
    updateOfferTable(processedOffers);
    updateEvents(upcomingEvents, pastEvents);
}

// Call main when the document is loaded
document.addEventListener('DOMContentLoaded', main);

// Add event listener to the form
document.getElementById('contactForm').addEventListener('submit', submitContactForm);
