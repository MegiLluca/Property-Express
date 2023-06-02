class HeadImports extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <title>Property-Express</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link href="css/style.css" rel="stylesheet">
    
        <script src="node_modules/jquery/dist/jquery.min.js"></script>
        <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        
        <script src="js/header.js"></script>
        <script src="index.js"></script>
        `;
    }
}
customElements.define('head-imports', HeadImports);