class App {

    constructor() {
        this.key = document.getElementById("key");
        this.textbox = document.getElementById("textbox");
        this.btn = document.getElementById("btn");
        this.url = document.getElementById("textbox").value || "";
    }

    initEventListeners() {
        this.btn.onclick = () => {

            this.url = document.getElementById("textbox").value || "";
            console.log("Value: ", this.url);
            const authorizationHeader = this.createAuthorizationHeader();
            this.key = document.getElementById('key');
            this.fetchData(authorizationHeader);
            
        };

        this.key.onkeyup = () => {

            this.key = document.getElementById("key");
            console.log(this.key.value);
        };
    }


    createAuthorizationHeader() {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Authorization' : this.key.value
            }
        };

        return options;


    }

    fetchData(authorizationHeaders) {

        try {
            console.log("URL", this.url);
            console.log("HEADERS", authorizationHeaders);
            fetch(new Request(this.url, authorizationHeaders))
            .then(res => res.json() )
            .then(data => {
                console.log("Data: ", data);
                //console.log(data.data.children);
                handle(data.data.children)

            });
        } catch(error) {
            console.log(error);
        }

    }


    run() {
        console.log("App is running");
        console.log("initiating event listeners");
        this.initEventListeners();
        


    }


}