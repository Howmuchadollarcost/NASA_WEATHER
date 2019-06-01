
//Data from https://data.giss.nasa.gov/gistemp/


chartIt();


async function chartIt() {
    var ctx = document.getElementById('chart').getContext('2d');
    //Call the getData function before charting it
    const getChartData = await getData();
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: getChartData.years,
            datasets: [{
                label: 'Global Average Temprature',
                fill:false,
                data: getChartData.temps,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth:1
            }]
        },
        options: {}
    });


}


async function getData() {
    //get data from file and parse it as text
    const response = await fetch('./GLBdata.csv');
    const data = await response.text();

    //arrays to store the datas
    const years = [];
    const temps = [];

    // split the file by new line and cut out the first line
    const table = data.split('\n').slice(1);

    //Loop through the rows and split the data my commas 
    table.forEach(row => {
        const column = row.split(',');

        //insert the datas to the arrays
        const year = column[0];
        years.push(year)
        const temp = column[1];
        temps.push(parseFloat(temp) + 14);
    })

    //return arrays
    return {years, temps};
}