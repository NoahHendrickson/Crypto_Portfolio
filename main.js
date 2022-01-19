const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['ETH', 'DOT', 'SOL', 'ADA', 'AVAX'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgb(2, 142, 119)',
                'rgb(145, 255, 156)',
                'rgba(244, 246, 231, 1)',
                'rgb(250, 124, 8)',
                'rgba(132, 126, 115, 1)',
            ],
            borderColor: [
              'rgb(21, 22, 26)',
              'rgb(21, 22, 26)',
              'rgb(21, 22, 26)',
              'rgb(21, 22, 26)',
              'rgb(21, 22, 26)',
            ],
            borderWidth: 10
        }]
    },
    options: {
      lugins: {
        legend: {
            display: true,
            labels: {
                color: 'rgb(255, 99, 132)'
            }
        }
    }
    }
});

