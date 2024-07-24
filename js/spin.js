            // const title = event.name;
            // const location = event.location;
            // const image = event.column_values.find(col => col.id === 'image').text;
            // const startDate = new Date(event.column_values.find(col => col.id === 'start_date').text);
            // const endDate = new Date(event.column_values.find(col => col.id === 'end_date').text);

            // const eventHtml = `
            // <div class="swiper-slide events-swiper__slide">
            //     <div class="events-swiper__img">
            //         <img src="${image}" alt="${title}">
            //     </div>
            //     <div class="events-swiper__city">
            //         <h2>${title}</h2>
            //     </div>
            //     <div class="events-swiper__caption">
            //         <p>${location}</p>
            //     </div>
            //     <div class='events-swiper__date'>
            //         <p>${startDate.toDateString()} - ${endDate.toDateString()}</p>
            //     </div>
            // </div>`;

            const MONDAY_API_URL = 'https://api.monday.com/v2';
            const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM2NzAzMjk1NywiYWFpIjoxMSwidWlkIjo2MTY3MjM3MSwiaWFkIjoiMjAyNC0wNi0wM1QxMToxMDoxNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjM3NjY4MjAsInJnbiI6ImV1YzEifQ.lwt_o5BXX5aEvgzu7zcbTXBfCRYQNT8XoUvRSB5rs8o';
            
            // Submit Contact Form to Monday.com
            async function submitContactForm() {
                const name = document.getElementById('cname').value;
                const company = document.getElementById('company').value;
                const communicationType = document.querySelector('input[name="communication_type"]:checked').value;
                const communicationId = document.getElementById('communication_id').value;
                const message = document.getElementById('message').value;
            
                const query = `
                mutation {
                    create_item (board_id: 1574325540, item_name: "${name}", column_values: "{\\"company\\": \\"${company}\\", \\"communication_type\\": \\"${communicationType}\\", \\"communication_id\\": \\"${communicationId}\\", \\"message\\": \\"${message}\\"}") {
                        id
                    }
                }`;
            
                try {
                    const response = await axios.post(MONDAY_API_URL, { query: query }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': API_TOKEN
                        }
                    });
            
                    if (response.data) {
                        alert('Form submitted successfully!');
                    } else {
                        alert('Failed to submit form.');
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('An error occurred while submitting the form.');
                }
            }
            
            // Fetch and Display Events from Monday.com
            async function fetchEvents() {
                const query = `
                query {
                    boards(ids: 1574326188) {
                        items {
                            name
                            column_values {
                                id
                                text
                            }
                        }
                    }
                }`;
            
                try {
                    const response = await axios.post(MONDAY_API_URL, { query: query }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': API_TOKEN
                        }
                    });
            
                    console.log('Events response:', response.data);
            
                    const events = response.data?.data?.boards?.[0]?.items;
                    if (!events) {
                        throw new Error('No events found');
                    }
            
                    const now = new Date();
            
                    events.forEach(event => {
                        const title = event.name;
                        const location = event.location;
                        const image = event.column_values.find(col => col.id === 'image').text;
                        const startDate = new Date(event.column_values.find(col => col.id === 'start_date').text);
                        const endDate = new Date(event.column_values.find(col => col.id === 'end_date').text);

                        const eventHtml = `
                        <div class="swiper-slide events-swiper__slide">
                            <div class="events-swiper__img">
                                <img src="${image}" alt="${title}">
                            </div>
                            <div class="events-swiper__city">
                                <h2>${title}</h2>
                            </div>
                            <div class="events-swiper__caption">
                                <p>${location}</p>
                            </div>
                            <div class='events-swiper__date'>
                                <p>${startDate.toDateString()} - ${endDate.toDateString()}</p>
                            </div>
                        </div>`;
            
                        if (endDate >= now) {
                            document.getElementById('cupcomingEvents').innerHTML += eventHtml;
                        } else {
                            document.getElementById('cpastEvents').innerHTML += eventHtml;
                        }
                    });
                } catch (error) {
                    console.error('Error fetching events:', error);
                    alert('An error occurred while fetching events.');
                }
            }
            
            // Fetch and Display Offers from Monday.com
            async function fetchOffers() {
                const query = `
                query {
                    boards(ids: 1574354393) {
                        items {
                            name
                            column_values {
                                id
                                text
                            }
                        }
                    }
                }`;
            
                try {
                    const response = await axios.post(MONDAY_API_URL, { query: query }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': API_TOKEN
                        }
                    });
            
                    console.log('Offers response:', response.data);
            
                    const offers = response.data?.data?.boards?.[0]?.items;
                    if (!offers) {
                        throw new Error('No offers found');
                    }
            
                    const tbody = document.querySelector('#offer-table tbody');
            
                    tbody.innerHTML = ''; // Clear existing content
            
                    offers.forEach(offer => {
                        const name = offer.name;
                        const monthlyClicks = offer.column_values.find(col => col.id === 'monthly_clicks')?.text || '';
                        const monthlyPayouts = offer.column_values.find(col => col.id === 'monthly_payouts')?.text || '';
            
                        const rowHtml = `
                        <tr>
                            <td>${name}</td>
                            <td>${monthlyClicks}</td>
                            <td>${monthlyPayouts}</td>
                        </tr>`;
            
                        tbody.innerHTML += rowHtml;
                    });
                } catch (error) {
                    console.error('Error fetching offers:', error);
                    alert('An error occurred while fetching offers.');
                }
            }
            
            // Initialize on DOM Content Loaded
            document.addEventListener("DOMContentLoaded", function() {
                fetchEvents();
                fetchOffers();
            });
            