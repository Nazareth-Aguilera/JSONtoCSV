
(function() {

    console.log("Application starting");
    try {
        fetch('https://www.reddit.com/r/latinas.json')
        .then(res => res.json() )
        .then(data => {
            console.log("test 7");
            console.log(data.data.children);
            handle(data.data.children)
    
        });
    } catch(error) {
        console.log("Test 1", error);
    }
    
    
    console.log("---------------------------------------------");
    
    
    
    
    function handle(inputData) {
    
        const headers = Object.keys(inputData[0].data).toString();
        console.log(headers);
    
        const main = inputData.map(item => {
    
            return Object.values(item.data).toString();
    
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



})();

