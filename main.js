


console.log("Application starting");
try {
    fetch('https://www.reddit.com/r/latinas.json')
    .then(res => res.json() )
    .then(data => handle(data));
} catch(error) {
    console.log(error);
}




function handle(inputData) {

    const headers = Object.keys(inputData.data[0]).toString();
    console.log(headers);

    const main = inputData.data.map(item => {

        return Object.values(item).toString();

    });

    console.log(main);

    const csv = [headers, ...main].join('\n');
    console.log(csv);

    startCSVDownload(csv);



}


function startCSVDownload(input) {

    const blob = new Blob([input], { type: 'application/csv' } );

    const url= URL.createObjectURL(blob);


    document.getElementById('btn').addEventListener('click', () => {

        const a = document.createElement('a');
        a.download = 'test-csv.csv';
        a.href = url;
        a.style.display = 'none';
    
        document.body.appendChild(a);
    
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

    });




}