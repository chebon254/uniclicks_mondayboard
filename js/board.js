async function submitContactForm() {
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
    const message = document.getElementById('message').value;

    const query = `
    mutation {
        create_item (board_id: YOUR_CONTACT_BOARD_ID, item_name: "${name}", column_values: "{\\"company\\": \\"${company}\\", \\"contactMethod\\": \\"${contactMethod}\\", \\"message\\": \\"${message}\\"}") {
            id
        }
    }`;

    try {
        const response = await axios.post('https://api.monday.com/v2', {
            query: query
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'YOUR_API_TOKEN'
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



async function fetchEvents() {
    const query = `
    query {
        boards(ids: YOUR_EVENTS_BOARD_ID) {
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
        const response = await axios.post('https://api.monday.com/v2', {
            query: query
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'YOUR_API_TOKEN'
            }
        });

        const events = response.data.data.boards[0].items;
        const now = new Date();

        events.forEach(event => {
            const title = event.name;
            const image = event.column_values.find(col => col.id === 'image').text;
            const startDate = new Date(event.column_values.find(col => col.id === 'start_date').text);
            const endDate = new Date(event.column_values.find(col => col.id === 'end_date').text);

            const eventHtml = `
            <div>
                <img src="${image}" alt="${title}">
                <h2>${title}</h2>
                <p>Start Date: ${startDate.toDateString()}</p>
                <p>End Date: ${endDate.toDateString()}</p>
            </div>`;

            if (endDate >= now) {
                document.getElementById('upcomingEvents').innerHTML += eventHtml;
            } else {
                document.getElementById('pastEvents').innerHTML += eventHtml;
            }
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        alert('An error occurred while fetching events.');
    }
}

// Call the function when the document is loaded
document.addEventListener("DOMContentLoaded", function() {
    fetchEvents();
});
