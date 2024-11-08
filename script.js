let sp500Chart;

    // Fetch data and initialize the chart
    fetch("sp500_data.json")
        .then(response => response.json())
        .then(data => {
            initializeChart(data);
        })
        .catch(error => console.error('Error loading data:', error));

    // Function to initialize the chart
    function initializeChart(data) {
        const ctx = document.getElementById('sp500Chart').getContext('2d');

        // Initial data and labels for the full range
        const labels = data.map(item => item.Date);
        const closingPrices = data.map(item => item.Close);

        sp500Chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Closing Prices',
                        data: closingPrices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Closing Price ($)'
                        }
                    }
                }
            }
        });
        document.getElementById('submit-date').addEventListener('click', () => filterDataByDate(data));

        // Set up event listeners for date pickers
        document.getElementById('start-date').addEventListener('change', () => filterDataByDate(data));
        document.getElementById('end-date').addEventListener('change', () => filterDataByDate(data));
    }

    // Function to filter and update the chart based on selected dates
    function filterDataByDate(data) {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        // Filter data based on selected date range
        const filteredData = data.filter(item => {
            const itemDate = new Date(item.Date);
            const isAfterStart = startDate ? itemDate >= new Date(startDate) : true;
            const isBeforeEnd = endDate ? itemDate <= new Date(endDate) : true;
            return isAfterStart && isBeforeEnd;
        });

        // Update chart data and labels
        const labels = filteredData.map(item => item.Date);
        const closingPrices = filteredData.map(item => item.Close);

        sp500Chart.data.labels = labels;
        sp500Chart.data.datasets[0].data = closingPrices;
        sp500Chart.update();
    }