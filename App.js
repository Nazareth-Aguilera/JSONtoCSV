class App {

    constructor() {

        this.file = document.getElementById("myFile");
        this.btn = document.getElementById("btn");
        this.data = null;

    }

    initEventListeners() {

        this.file.addEventListener("change", (event) => {

            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {

                const fileContent = event.target.result;
                console.log(fileContent);
                this.data = JSON.parse(fileContent);
                console.log(this.data);


            };

            reader.readAsText(file);


        });


        this.btn.onclick = () => {
            let csv = this.createCSVFile();
            this.startCSVDownload(csv);
            
        };


    }


    createCSVFile() {

        const headers = Object.keys(this.data.data[0]).toString();
        console.log(headers);

        const main = this.data.data.map(item => {

            return Object.values(item).toString();

        });

        const csv = [headers, ...main].join('\n');
        console.log(csv);

        return csv;

    }

    startCSVDownload(input) {

        console.log("start downloading");

        const blob = new Blob([input], { type: 'application/csv' } );
    
        const url= URL.createObjectURL(blob);
    
    
    
        const a = document.createElement('a');
        const today = new Date();
        const fullDateString = today.toDateString();
        a.download = `${fullDateString}.csv`;
        a.href = url;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

    }




    run() {
        console.log("App is running");
        console.log("initiating event listeners");
        this.initEventListeners();
        


    }


}